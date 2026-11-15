// Renders the black-and-white views and exports the Blender .glb files from index.html.
//   npm i playwright && npx playwright install chromium
//   node tools/render.js
// Optional env: PX (image size, default 4096), OUT_RENDERS, OUT_BLENDER (output folders).
// Afterwards run tools/postprocess.py to thicken the lines and build the wide sheets.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const os = require('os');
const ROOT = path.resolve(__dirname, '..');
const REN = process.env.OUT_RENDERS || path.join(ROOT, 'renders'), GLB = process.env.OUT_BLENDER || path.join(ROOT, 'blender');
const PX = +(process.env.PX || 4096);
fs.mkdirSync(REN, { recursive:true }); fs.mkdirSync(GLB, { recursive:true });
// The page keeps its scene private, so work on a temp copy with one line added that exposes it.
const ANCHOR = '  let last = performance.now();';
const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!src.includes(ANCHOR)) throw new Error('index.html changed: hook anchor not found');
const PAGE = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'specter-')), 'render.html');
fs.writeFileSync(PAGE, src.replace(ANCHOR, '  window.__r = { T, root, scene, renderer, lineMats, fillMat, dotMat, beam, order };\n' + ANCHOR));
const d2r = Math.PI/180, yaw = a => [-Math.cos(a*d2r), 0, Math.sin(a*d2r)];
const VIEWS = { front:[[0,0,1],[0,1,0]], side:[[-Math.cos(18*d2r)*Math.cos(8*d2r), Math.sin(8*d2r), Math.sin(18*d2r)*Math.cos(8*d2r)],[0,1,0]],
  top:[[0,Math.cos(18*d2r),Math.sin(18*d2r)],[1,0,0]], iso:[[1,0.8,1.2],[0,1,0]], isoback:[[-1,0.8,-1.2],[0,1,0]], profile:[yaw(10),[0,1,0]] };
(async()=>{
  const b = await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const open = async () => { const p = await b.newPage({viewport:{width:1200,height:800}}); p.on('pageerror',e=>console.log('PAGEERR',e.message));
    await p.goto('file://'+PAGE); await p.waitForTimeout(1500); return p; };
  const state = async (p, mech, dep, face, mount) => { await p.click(mount ? '#hm-1' : '#hm-0'); await p.click(mech ? '#mc-1' : '#mc-0'); await p.click(face || '#fc-f');
    await p.$eval('#dep',(e,v)=>{e.value=v;e.dispatchEvent(new Event('input'))},dep); await p.waitForTimeout(300); };
  const p = await open();
  const shot = (view, half) => p.evaluate(({dir, up, half, PX}) => {
    const { T, root, scene, renderer, lineMats, fillMat, dotMat, beam } = window.__r;
    beam.visible = false;
    root.updateMatrixWorld(true);
    const cam = new T.OrthographicCamera(-1,1,1,-1,0.1,400);
    cam.position.set(dir[0],dir[1],dir[2]).normalize().multiplyScalar(100); cam.up.set(up[0],up[1],up[2]); cam.lookAt(0,0,0); cam.updateMatrixWorld(true);
    const inv = cam.matrixWorldInverse.copy(cam.matrixWorld).invert(), v = new T.Vector3();
    let x0=1e9,x1=-1e9,y0=1e9,y1=-1e9;
    root.traverse(o => { if (!o.geometry) return; for (let a=o; a; a=a.parent) if (!a.visible) return;
      const pos = o.geometry.attributes.position;
      for (let i=0;i<pos.count;i++){ v.fromBufferAttribute(pos,i).applyMatrix4(o.matrixWorld).applyMatrix4(inv);
        x0=Math.min(x0,v.x);x1=Math.max(x1,v.x);y0=Math.min(y0,v.y);y1=Math.max(y1,v.y); } });
    if (!half) return { half:Math.max(x1-x0,y1-y0)/0.9/2 };
    const cx=(x0+x1)/2, cy=(y0+y1)/2;
    cam.left=cx-half; cam.right=cx+half; cam.top=cy+half; cam.bottom=cy-half; cam.updateProjectionMatrix();
    for (const k in lineMats) lineMats[k].color.set('#000'); dotMat.color.set('#000'); dotMat.size = Math.max(2, PX/820); fillMat.color.set('#fff');
    renderer.setPixelRatio(1); renderer.setSize(PX,PX,false); renderer.setClearColor(0xffffff);
    renderer.render(scene, cam);
    return renderer.domElement.toDataURL('image/png');
  }, {dir:VIEWS[view][0], up:VIEWS[view][1], half, PX});
  const save = async (name, view, half) => { const d = await shot(view, half); fs.writeFileSync(`${REN}/${name}.png`, Buffer.from(d.split(',')[1],'base64')); };
  await state(p, 0, 0);
  for (const [n,v] of [['closed-front','iso'],['closed-back','isoback']]) await save(n, v, (await shot(v)).half);
  for (const [mech, tag] of [[0,'carriage'],[1,'petal']]) {
    for (const [mount, sfx] of [[0,''],[1,'-stalk']]) {   // boom-tip horns, then tile-stalk horns
      await state(p, mech, 100, null, mount);
      let half = 0; for (const v of ['front','side','top','iso']) half = Math.max(half, (await shot(v)).half);
      for (const v of ['front','side','top','iso']) await save(`${tag}${sfx}-${v}`, v, half);
    }
    const faces = [['concave','#fc-c'],['flat','#fc-f'],['convex','#fc-x']]; let half = 0;
    for (const [,id] of faces) { await state(p, mech, 100, id); half = Math.max(half, (await shot('profile')).half); }
    for (const [n,id] of faces) { await state(p, mech, 100, id); await save(`${tag}-face-${n}`, 'profile', half); }
  }
  await p.close();
  // ---- glTF export: solid meshes only, one named material per part ----
  for (const [name, mech, dep, mount] of [['specter-closed',0,0,0],['specter-carriage',0,100,0],['specter-petal',1,100,0],['specter-carriage-stalk',0,100,1],['specter-petal-stalk',1,100,1]]) {
    const q = await open(); await state(q, mech, dep, null, mount);
    await q.addScriptTag({ url:'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/GLTFExporter.js' });
    const b64 = await q.evaluate(() => new Promise(res => {
      const { T, root } = window.__r; root.updateMatrixWorld(true);
      const mats = {}, mat = k => mats[k] || (mats[k] = new T.MeshStandardMaterial({ name:k, color:0xbfc5cc, metalness:0.5, roughness:0.55, side:(k==='vib'||k==='harm') ? T.DoubleSide : T.FrontSide }));
      const geos = new Map();
      root.traverse(o => {
        if (o.isMesh) { o.material = mat(o.userData.key || 'core');
          if (!geos.has(o.geometry)) { const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(); g.computeVertexNormals(); geos.set(o.geometry, g); }
          o.geometry = geos.get(o.geometry); }
        else if (o.isLine || o.isPoints) o.visible = false;
      });
      root.name = 'SP3-CTR';
      new THREE.GLTFExporter().parse(root, buf => { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); res(btoa(s)); }, { binary:true, onlyVisible:true });
    }));
    fs.writeFileSync(`${GLB}/${name}.glb`, Buffer.from(b64,'base64')); await q.close();
  }
  await b.close();
})();
