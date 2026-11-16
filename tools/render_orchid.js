// Renders the Webbed Orchid (hinged peel, port-web horns) into renders/orchid-<LW>/ and exports it to Blender.
//   npm i playwright && npx playwright install chromium
//   node tools/render_orchid.js
// Optional env: LW (line weight in pixels, default 3), PX (image size, default 2048; the exploded view is twice as
// wide), OUT (output folder), ONLY=views|gif|exploded|blend to redo just that part.
// The GIFs (stowed, unfold, open, fold, looping: orchid-loop.gif in iso, -concave from the side with the concave face,
// -front head-on; GIFS=loop,front picks some) take FPS (default 50, the most a GIF plays reliably),
// GPX (its size, default 800) and GLW (its line weight, default 2); it needs Python with Pillow.
// Afterwards run `python3 tools/postprocess.py renders/orchid-3 --no-thicken` to build the wide sheets.
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path'); const os = require('os');
const ROOT = path.resolve(__dirname, '..');
const LW = +(process.env.LW || 3);
const OUT = process.env.OUT || path.join(ROOT, 'renders', `orchid-${LW}`);
const PX = +(process.env.PX || 2048);
fs.mkdirSync(OUT, { recursive:true });
// The page keeps its scene private, so work on a temp copy with one line added that exposes it.
const ANCHOR = '  let last = performance.now();';
const src = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
if (!src.includes(ANCHOR)) throw new Error('index.html changed: hook anchor not found');
const PAGE = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'specter-')), 'render.html');
// Also load three.js's wide-line classes, so the exploded view can draw its lines thick instead of 1 px.
const CONTROLS = '<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>';
if (!src.includes(CONTROLS)) throw new Error('index.html changed: three.js script tag not found');
const FAT = ['LineSegmentsGeometry', 'LineMaterial', 'LineSegments2']
  .map(n => `<script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/lines/${n}.js"></script>`).join('');
fs.writeFileSync(PAGE, src.replace(CONTROLS, CONTROLS + FAT)
  .replace(ANCHOR, '  window.__r = { T, root, scene, renderer, lineMats, fillMat, dotMat, beam };\n'
    + '  window.__pose = v => { t = goal = v; pose(v); };\n' + ANCHOR));   // any deployment, not just the slider steps
const d2r = Math.PI/180, yaw = a => [-Math.cos(a*d2r), 0, Math.sin(a*d2r)];
// rz: turn a vector about the array axis (z). Turning the camera and its up together spins the petals in place.
const rz = ([x,y,z], a) => [x*Math.cos(a*d2r) - y*Math.sin(a*d2r), x*Math.sin(a*d2r) + y*Math.cos(a*d2r), z];
const VIEWS = { front:[[0,0,1],[0,1,0]], side:[[-Math.cos(18*d2r)*Math.cos(8*d2r), Math.sin(8*d2r), Math.sin(18*d2r)*Math.cos(8*d2r)],[0,1,0]],
  top:[[0,Math.cos(18*d2r),Math.sin(18*d2r)],[1,0,0]], iso:[[1,0.8,1.2],[0,1,0]], isoroll:[rz([1,0,1.4],45),rz([0,1,0],45)], isoback:[[-1,0.8,-1.2],[0,1,0]], profile:[yaw(10),[0,1,0]] };

// Exploded view. Pieces in order along the axis, each with the gap (in model units) left before it. The array stays
// whole: tiles, horns and wires as they are when open.
const ORDER = [['cap',0],['ref',1.3],['spine',1],['bank',1],['core',1],['dsp',1],['mast',1],['array',1.9]];
// One note per leader: piece, part key to point at within it (or null), name, then what it is and what it does
// (written as printed: lowercase, but GHz and proper names keep their capitals), and how the leader runs.
// Plain: straight down to the row of notes under the axis. 'left': out sideways from the part, then down to the row;
// 'left-below': out sideways a little further, then down to a note just under the run. 'bracket-up': a bracket under the piece, teeth up, then down to the row.
// 'bracket': a bracket the full height of the piece on its right, the note beside it.
const NOTES = [
  ['cap', null, 'aft tile', 'the link home'],
  ['ref', null, 'inertial mass', 'vibration reference'],
  ['spine', null, 'tail boom', 'isolates the mass from the core'],
  ['bank', null, 'capacitor bank', 'stores the charge for one hit'],
  ['core', null, 'AEPEC', 'power source'],
  ['dsp', null, 'processor column', 'beamforming and signal analysis'],
  ['mast', null, 'keystone boom', 'joins core to front tile'],
  ['horns', 'harm', 'vibrometry horn', '10 GHz receive', 'left'],
  ['horns', 'vib', 'spectrometry horn', '20 GHz receive', 'left-below'],
  ['tiles', null, 'phased-array tiles', 'transmit; actuators shape the face', 'bracket'],
];
// Runs in the page. Sorts the scene into pieces, slides each along z so it clears the one before, renders, then adds
// the notes on a 2D canvas, each centred on its leader: straight down from the parts on the axis, L-shaped from the array.
const EXPLODE = ({ dir, up, W, LW, ORDER, NOTES }) => {
  const { T, root, scene, renderer, lineMats, fillMat, dotMat, beam } = window.__r, V = T.Vector3;
  beam.visible = false; root.updateMatrixWorld(true);
  const keyOf = o => { let k = null; o.traverse(c => { if (!k && c.userData.key) k = c.userData.key; }); return k; };
  const shown = o => { for (let a = o; a; a = a.parent) if (!a.visible) return false; return true; };
  const cam = new T.OrthographicCamera(-1,1,1,-1,0.1,400);
  cam.position.set(dir[0],dir[1],dir[2]).normalize().multiplyScalar(100); cam.up.set(up[0],up[1],up[2]); cam.lookAt(0,0,0); cam.updateMatrixWorld(true);
  const inv = cam.matrixWorld.clone().invert(), toCam = q => q.clone().applyMatrix4(inv);
  const kz = toCam(new V(0,0,1)).x - toCam(new V(0,0,0)).x;   // screen x per unit of z

  const P = {}, horns = [], skipped = [];
  root.children.forEach(o => {
    if (!o.visible || o === beam) return;
    const k = keyOf(o), put = n => (P[n] = P[n] || []).push(o);
    if (k === 'web' || k === 'cable') put('array');   // wires and cables travel with the array
    else if (k === 'aft') put(o.children.length > 2 ? 'cap' : 'ref');          // the cap tile carries an inset outline
    else if (k === 'rad') put('spine');
    else if (k === 'cap') put('bank');
    else if (k === 'frame' || k === 'tiles' || k === 'act') put('array');
    else if (k === 'core') put('core');
    else if (k === 'dsp') put('dsp');
    else if (k === 'hinge') put('mast');
    else if (k === 'vib' || k === 'harm') { put('array'); horns.push(o); }
    else skipped.push(k);
  });

  const v = new V();
  const ext = objs => {
    const e = { x0:1e9, x1:-1e9, y0:1e9, y1:-1e9, lo:null };
    objs.forEach(o => { o.updateMatrixWorld(true); o.traverse(m => {
      if (!m.geometry || m.isPoints || m.userData.wide || !shown(m)) return;   // wide lines are measured by their parts
      const pos = m.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++){
        const c = toCam(v.fromBufferAttribute(pos, i).applyMatrix4(m.matrixWorld));
        e.x0 = Math.min(e.x0, c.x); e.x1 = Math.max(e.x1, c.x); e.y1 = Math.max(e.y1, c.y);
        if (c.y < e.y0){ e.y0 = c.y; e.lo = c; }
      }
    }); });
    return e;
  };
  let right = null;
  ORDER.forEach(([n, gap]) => {
    if (!P[n]) return;
    const e = ext(P[n]), d = right === null ? 0 : right + gap - e.x0;
    P[n].forEach(o => { o.position.z += d/kz; }); right = e.x1 + d;
  });
  root.updateMatrixWorld(true);

  // frame: everything, with a generous margin; W wide and as tall as the drawing needs
  const F = ext([].concat(...ORDER.map(([n]) => P[n] || []))), mg = 0.25, s = W/(F.x1 - F.x0 + 2*mg);
  const Hm = Math.round((F.y1 - F.y0 + 2*mg)*s);
  cam.left = F.x0 - mg; cam.right = F.x1 + mg; cam.top = F.y1 + mg; cam.bottom = cam.top - Hm/s; cam.updateProjectionMatrix();
  for (const k in lineMats) lineMats[k].color.set('#000'); dotMat.color.set('#000'); fillMat.color.set('#fff');
  // dashed centre line along the axis, drawn in the scene so the parts hide it where it passes through them. It starts a
  // little behind the aft cap and stops two dashes short of halfway to the bracket on the right of the array.
  const zAt = cx => (cx - toCam(new V(0,0,0)).x)/kz, gapU = Math.round(W/55)/s;
  const axis = new T.Line(new T.BufferGeometry().setFromPoints([new V(0,0,zAt(F.x0 - 0.15)), new V(0,0,zAt(ext(P.array).x1 + gapU/2 - 0.3))]),
    new T.LineDashedMaterial({ color:0x000000, dashSize:0.1, gapSize:0.05 }));
  axis.computeLineDistances(); root.add(axis);

  window.__fat(LW, W, Hm);
  renderer.setPixelRatio(1); renderer.setSize(W, Hm, false); renderer.setClearColor(0xffffff);
  renderer.render(scene, cam);
  const toPx = c => [(c.x - cam.left)*s, (cam.top - c.y)*s];

  // what each leader points at: the piece, or for the horns one that hangs clear of the tiles (the outermost
  // horn and the topmost of the other kind), by its body, the part that hangs out behind
  const target = (n, key) => {
    if (n === 'horns') {
      const hs = horns.filter(o => keyOf(o) === key);
      const h = key === 'vib' ? hs.reduce((a, b) => ext([b]).y1 > ext([a]).y1 ? b : a) : hs.reduce((a, b) => ext([b]).x0 < ext([a]).x0 ? b : a);
      return [h.children[0].children[0]];
    }
    return n === 'tiles' ? P.array.filter(o => keyOf(o) === 'frame') : P[n] || [];
  };
  const FAM = 'Helvetica, Arial, sans-serif', F1 = Math.round(W/165), F2 = Math.round(W/220), LH = Math.round(F2*1.65);
  // note width, gap between notes, clearance off the part, page padding, drop from the lowest part on the axis to the row
  const TW = Math.round(W*0.075), GX = F1*3, CL = Math.round(W/55), PAD = Math.round(W/30), DROP = F1*4;
  const cv = document.createElement('canvas'), g = cv.getContext('2d');
  g.font = `${F2}px ${FAM}`;
  const wrap = (t, font) => { g.font = font; const out = []; let line = '';
    t.split(' ').forEach(w => { const tr = line ? line + ' ' + w : w; if (line && g.measureText(tr).width > TW){ out.push(line); line = w; } else line = tr; });
    out.push(line);
    const n = out.length;   // never leave one word alone on the last line: pull one down from the line above
    if (n > 1 && !out[n - 1].includes(' ')){ const ws = out[n - 2].split(' '); if (ws.length > 2){ out[n - 1] = ws.pop() + ' ' + out[n - 1]; out[n - 2] = ws.join(' '); } }
    return out; };
  const NF = `600 ${F1}px ${FAM}`, BF = `${F2}px ${FAM}`, NL = Math.round(F1*1.3);   // name font, body font, name line height
  const notes = NOTES.map(([n, key, name, body, how]) => {
    const e = ext(target(n, key)), names = wrap(name, NF), lines = wrap(body, BF), [x0, y1] = toPx({ x:e.x0, y:e.y1 }), [x1, y0] = toPx({ x:e.x1, y:e.y0 });
    // edge: how far right the piece reaches within a band of rows (drawing pixels), for a leader that leaves it sideways
    const edge = (ya, yb) => { let m = -1e9; target(n, key).forEach(o => o.traverse(q => { if (!q.geometry || q.isPoints || q.userData.wide || !shown(q)) return;
      const pos = q.geometry.attributes.position; for (let i = 0; i < pos.count; i++){ const [px, py] = toPx(toCam(v.fromBufferAttribute(pos, i).applyMatrix4(q.matrixWorld)));
        if (py >= ya && py <= yb) m = Math.max(m, px); } })); return m; };
    return { how:how || 'down', x0, x1, edge, top:y1, bot:y0, mid:(y0 + y1)/2, names, lines, nh:names.length*NL + Math.round(F1*0.6),
      h:names.length*NL + Math.round(F1*0.6) + lines.length*LH };
  });
  // one row for every note that hangs below, just under the lowest part on the axis
  const TE = F1;   // bracket teeth
  const row = Math.max(...notes.filter(o => o.how === 'down' || o.how === 'bracket-up').map(o => o.bot)) + CL + DROP;
  const legs = [];   // polylines, in drawing pixels
  notes.forEach(nt => {
    const cx = (nt.x0 + nt.x1)/2;
    if (nt.how === 'down'){ nt.cx = cx; nt.y = row; legs.push([[cx, nt.bot + CL], [cx, row - F1*0.9]]); return; }
    if (nt.how === 'bracket-up'){ const by = nt.bot + CL; nt.cx = cx; nt.y = row;
      legs.push([[nt.x0, by - TE], [nt.x0, by], [nt.x1, by], [nt.x1, by - TE]], [[cx, by], [cx, row - F1*0.9]]); return; }
    if (nt.how === 'bracket'){ const bx = nt.x1 + CL, ex = bx + GX, ay = toPx(toCam(new V(0,0,0)))[1];   // tick and note on the axis
      legs.push([[bx - TE, nt.top], [bx, nt.top], [bx, nt.bot], [bx - TE, nt.bot]], [[bx, ay], [ex, ay]]);
      nt.cx = ex + F1*0.6 + TW/2; nt.y = ay - nt.h/2; return; }
    const sy = nt.how === 'right' ? row - GX*2 : nt.mid, sx = nt.how === 'right' ? nt.edge(sy - GX, sy + GX) + CL : nt.x0 - CL;
    nt.cx = nt.how === 'right' ? nt.x1 + GX + TW/2 : nt.x0 - GX - TW/2;
    if (nt.how === 'left-below'){ nt.cx -= GX; nt.y = sy + GX*1.5; legs.push([[sx, sy], [nt.cx, sy], [nt.cx, nt.y - F1*0.9]]); }
    else { nt.y = row; legs.push([[sx, sy], [nt.cx, sy], [nt.cx, row - F1*0.9]]); }
  });
  // page: the drawing padded all round, grown wherever a note reaches past it
  const L = Math.min(0, ...notes.map(o => o.cx - TW/2)) - PAD, R = Math.max(W, ...notes.map(o => o.cx + TW/2)) + PAD;
  const Tp = Math.min(0, ...notes.map(o => o.y)) - PAD, Bt = Math.max(Hm, ...notes.map(o => o.y + o.h)) + PAD;
  const ox = -L, oy = -Tp;
  cv.width = Math.ceil(R - L); cv.height = Math.ceil(Bt - Tp);
  g.fillStyle = '#fff'; g.fillRect(0, 0, cv.width, cv.height); g.drawImage(renderer.domElement, ox, oy);
  g.fillStyle = g.strokeStyle = '#000'; g.lineWidth = LW; g.textAlign = 'center';
  const px = q => Math.round(q) + 0.5;
  legs.forEach(pts => { g.beginPath(); pts.forEach(([x, y], i) => g[i ? 'lineTo' : 'moveTo'](px(x + ox), px(y + oy))); g.stroke(); });
  notes.forEach(nt => {
    g.font = NF; nt.names.forEach((l, i) => g.fillText(l, nt.cx + ox, nt.y + oy + F1 + i*NL));
    g.font = BF; nt.lines.forEach((l, i) => g.fillText(l, nt.cx + ox, nt.y + oy + nt.nh + (i + 0.75)*LH));
  });
  return { png:cv.toDataURL('image/png'), skipped };
};

(async()=>{
  const b = await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
  const p = await b.newPage({viewport:{width:1200,height:800}}); p.on('pageerror',e=>console.log('PAGEERR',e.message));
  await p.goto('file://'+PAGE); await p.waitForTimeout(1500);
  // WebGL draws every line 1 px wide, and 1 px lines break up when an image is shown smaller than it is. For each
  // render, __fat swaps every visible line for a wide line of LW pixels (real geometry, antialiased, one even shade
  // along its length) and draws the dots LW wide; __unfat puts the thin lines back.
  await p.evaluate(() => {
    const { T, scene, dotMat } = window.__r;
    const shown = o => { for (let a = o; a; a = a.parent) if (!a.visible) return false; return true; };
    let made = [], hid = [];
    window.__fat = (LW, w, h) => {
      const res = new T.Vector2(w, h), thin = [];
      scene.traverse(o => { if ((o.isLine || o.isLineSegments) && !o.userData.wide && shown(o)) thin.push(o); });
      thin.forEach(o => {
        const pos = o.geometry.attributes.position, pts = [], at = i => [pos.getX(i), pos.getY(i), pos.getZ(i)];
        if (o.isLineSegments) for (let i = 0; i < pos.count; i++) pts.push(...at(i));
        else for (let i = 0; i + 1 < pos.count; i++) pts.push(...at(i), ...at(i + 1));
        const m = new THREE.LineMaterial({ color:0x000000, linewidth:LW, resolution:res });
        const f = new THREE.LineSegments2(new THREE.LineSegmentsGeometry().setPositions(pts), m);
        if (o.material.isLineDashedMaterial){   // r128 turns dashes on by define
          m.defines.USE_DASH = ''; m.dashSize = o.material.dashSize; m.gapSize = o.material.gapSize; m.needsUpdate = true; f.computeLineDistances();
        }
        f.userData.wide = true; f.position.copy(o.position); f.quaternion.copy(o.quaternion); f.scale.copy(o.scale);
        o.parent.add(f); o.visible = false; made.push(f); hid.push(o);
      });
      dotMat.size = LW;
    };
    window.__unfat = () => {
      made.forEach(f => { f.parent.remove(f); f.geometry.dispose(); f.material.dispose(); }); hid.forEach(o => { o.visible = true; });
      made = []; hid = [];
    };
  });
  const state = async (dep, face) => { await p.click(face || '#fc-f');
    await p.$eval('#dep',(e,v)=>{e.value=v;e.dispatchEvent(new Event('input'))},dep); await p.waitForTimeout(300); };
  // half: half-width of the orthographic frame. Without it, returns the half-width that fits the model with a margin.
  const shot = (view, half, px = PX, lw = LW) => p.evaluate(({dir, up, half, PX, LW}) => {
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
    if (!half) return { half:Math.max(x1-x0,y1-y0)/0.9/2, cx:(x0+x1)/2, cy:(y0+y1)/2, x0, x1, y0, y1 };
    const cx = half.cx !== undefined ? half.cx : (x0+x1)/2, cy = half.cy !== undefined ? half.cy : (y0+y1)/2, h = half.half;
    cam.left=cx-h; cam.right=cx+h; cam.top=cy+h; cam.bottom=cy-h; cam.updateProjectionMatrix();
    for (const k in lineMats) lineMats[k].color.set('#000'); dotMat.color.set('#000'); fillMat.color.set('#fff');
    renderer.setPixelRatio(1); renderer.setSize(PX,PX,false); renderer.setClearColor(0xffffff);
    window.__fat(LW, PX, PX); renderer.render(scene, cam); const png = renderer.domElement.toDataURL('image/png'); window.__unfat();
    return png;
  }, {dir:VIEWS[view][0], up:VIEWS[view][1], half, PX:px, LW:lw});
  const save = async (name, view, frame) => { const d = await shot(view, frame); fs.writeFileSync(`${OUT}/${name}.png`, Buffer.from(d.split(',')[1],'base64')); console.log(name); };

  const ONLY = process.env.ONLY;
  if (!ONLY || ONLY === 'views') {
  // stowed, front and back, each framed on its own
  await state(0);
  for (const [n, v] of [['front','iso'],['back','isoback']]) await save(`orchid-closed-${n}`, v, await shot(v));

  // unfold sequence, iso, one frame for all so the scale and centre hold still from step to step
  const STEPS = [0, 25, 50, 75, 100]; let seq = { half:0 };
  for (const s of STEPS) { await state(s); const f = await shot('iso'); if (f.half > seq.half) seq = f; }
  for (const s of STEPS) { await state(s); await save(`orchid-unfold-${String(s).padStart(3,'0')}`, 'iso', seq); }

  // fully open, four views at one scale
  await state(100);
  // the iso still is turned 45 degrees about the array axis from the iso of the unfold sequence
  const OPEN = [['front','front'],['side','side'],['top','top'],['iso','isoroll']];
  let half = 0; for (const [,v] of OPEN) half = Math.max(half, (await shot(v)).half);
  for (const [n,v] of OPEN) await save(`orchid-${n}`, v, { half });

  // array face: concave, flat, convex, in profile at one scale
  const faces = [['concave','#fc-c'],['flat','#fc-f'],['convex','#fc-x']]; half = 0;
  for (const [,id] of faces) { await state(100, id); half = Math.max(half, (await shot('profile')).half); }
  for (const [n,id] of faces) { await state(100, id); await save(`orchid-face-${n}`, 'profile', { half }); }
  }

  // looping GIF: stowed, unfold, open, fold. Each frame is rendered at twice the size and scaled down for smooth edges;
  // tools/make_gif.py holds the two end states and maps every frame to one grey palette, so nothing flickers.
  if (!ONLY || ONLY === 'gif') {
    const FPS = +(process.env.FPS || 50), GPX = +(process.env.GPX || 800), GLW = +(process.env.GLW || 2), SS = 2;
    const N = Math.round(2.7*FPS);   // the unfold takes 2.7 s, as on the page
    const ease = i => (1 - Math.cos(Math.PI*i/N))/2;   // starts and stops gently, so the holds don't jolt
    const GIFS = [['orchid-loop', 'iso', '#fc-f'], ['orchid-loop-concave', 'profile', '#fc-c'], ['orchid-loop-front', 'front', '#fc-f']]
      .filter(([n]) => !process.env.GIFS || process.env.GIFS.split(',').includes(n.replace('orchid-', '')));
    for (const [name, view, face] of GIFS) {
      await state(0, face);
      let bb = null;   // one frame for the whole loop: the union of every pose
      for (let i = 0; i <= 40; i++){ await p.evaluate(v => window.__pose(v), i/40); const f = await shot(view);
        bb = bb ? { x0:Math.min(bb.x0, f.x0), x1:Math.max(bb.x1, f.x1), y0:Math.min(bb.y0, f.y0), y1:Math.max(bb.y1, f.y1) } : f; }
      const frame = { half:Math.max(bb.x1 - bb.x0, bb.y1 - bb.y0)/0.92/2, cx:(bb.x0 + bb.x1)/2, cy:(bb.y0 + bb.y1)/2 };
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'orchid-gif-'));
      for (let i = 0; i <= N; i++){
        await p.evaluate(v => window.__pose(v), ease(i));
        const d = await shot(view, frame, GPX*SS, GLW*SS);
        fs.writeFileSync(path.join(dir, `f${String(i).padStart(4, '0')}.png`), Buffer.from(d.split(',')[1], 'base64'));
      }
      require('child_process').execFileSync('python3', [path.join(__dirname, 'make_gif.py'), dir, path.join(OUT, `${name}.gif`), String(FPS), '3', String(SS)], { stdio:'inherit' });
      fs.rmSync(dir, { recursive:true, force:true });
    }
  }

  // exploded view: the open Orchid with the convex face, in profile, pulled apart along its axis (last: it moves the parts)
  if (!ONLY || ONLY === 'exploded') {
  await state(100, '#fc-x');
  const ex = await p.evaluate(EXPLODE, { dir:VIEWS.profile[0], up:VIEWS.profile[1], W:PX*2, LW, ORDER, NOTES });
  if (ex.skipped.length) console.log('not placed in the exploded view:', ex.skipped.join(', '));
  fs.writeFileSync(`${OUT}/orchid-exploded.png`, Buffer.from(ex.png.split(',')[1],'base64')); console.log('orchid-exploded');
  }

  // Blender: the Orchid as glTF with the unfold baked in as animation (1 s stowed, 4 s unfold, 2 s open, 4 s fold,
  // 1 s stowed, at 24 fps), then tools/make_blend.py turns it into blender/specter-orchid.blend. Fresh page, since
  // the exploded view moved the parts.
  if (!ONLY || ONLY === 'blend') {
    await p.reload(); await p.waitForTimeout(1500); await state(0, '#fc-f');
    await p.addScriptTag({ url:'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/exporters/GLTFExporter.js' });
    const GLB_OUT = path.join(ROOT, 'blender', 'specter-orchid.glb'); fs.mkdirSync(path.dirname(GLB_OUT), { recursive:true });
    const b64 = await p.evaluate(() => new Promise(res => {
      const { T, root } = window.__r, FPS = 24, N = 96, ease = x => (1 - Math.cos(Math.PI*x))/2;
      const keys = [[0, 0]];                                            // [frame, deployment]
      for (let i = 0; i <= N; i++) keys.push([24 + i, ease(i/N)]);
      for (let i = 0; i <= N; i++) keys.push([24 + N + 48 + i, 1 - ease(i/N)]);
      keys.push([24 + 2*N + 48 + 24, 0]);
      // lines and dots are screen drawing only; the solids carry the model
      const drop = []; root.traverse(o => { if (o.isLine || o.isPoints) drop.push(o); }); drop.forEach(o => o.parent.remove(o));
      const nodes = []; root.traverse(o => { if (o !== root) nodes.push(o); });
      const shown = o => { for (let a = o; a && a !== root; a = a.parent) if (!a.visible) return false; return true; };
      const rec = nodes.map(() => ({ p:[], q:[], s:[], vis:[] }));
      keys.forEach(([, v]) => { window.__pose(v); nodes.forEach((o, i) => { const r = rec[i], vis = o.visible;
        r.p.push(...o.position.toArray()); r.q.push(...o.quaternion.toArray()); r.vis.push(vis);
        r.s.push(...(vis ? o.scale.toArray() : [1e-4, 1e-4, 1e-4])); r.ever = r.ever || shown(o); }); });
      window.__pose(0);
      // never shown in any pose (the other mounts, the beam): leave it out; shown only some of the time: scale to nothing
      nodes.forEach((o, i) => { if (!rec[i].ever && o.parent) o.parent.remove(o); });
      const times = keys.map(([f]) => f/FPS), tracks = [], same = a => a.every((x, j) => Math.abs(x - a[j % (a.length/keys.length)]) < 1e-6);
      nodes.forEach((o, i) => { const r = rec[i]; if (!r.ever) return; o.visible = true; o.scale.fromArray(r.s, 0);
        if (!same(r.p)) tracks.push(new T.VectorKeyframeTrack(`${o.uuid}.position`, times, r.p));
        if (!same(r.q)) tracks.push(new T.QuaternionKeyframeTrack(`${o.uuid}.quaternion`, times, r.q));
        if (!same(r.s)) tracks.push(new T.VectorKeyframeTrack(`${o.uuid}.scale`, times, r.s)); });
      const mats = {}, mat = k => mats[k] || (mats[k] = new T.MeshStandardMaterial({ name:k, color:0xbfc5cc, metalness:0.5, roughness:0.55, side:(k==='vib'||k==='harm') ? T.DoubleSide : T.FrontSide }));
      const geos = new Map();
      root.traverse(o => { if (!o.isMesh) return; o.material = mat(o.userData.key || 'core');
        if (!geos.has(o.geometry)) { const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone(); g.computeVertexNormals(); geos.set(o.geometry, g); }
        o.geometry = geos.get(o.geometry); });
      root.name = 'SP3-CTR Orchid'; root.updateMatrixWorld(true);
      new THREE.GLTFExporter().parse(root, buf => { const u = new Uint8Array(buf); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); res(btoa(s)); },
        { binary:true, trs:true, onlyVisible:false, animations:[new T.AnimationClip('unfold', -1, tracks)] });
    }));
    fs.writeFileSync(GLB_OUT, Buffer.from(b64, 'base64')); console.log('specter-orchid.glb');
    try { require('child_process').execFileSync('blender', ['-b', '--factory-startup', '--python', path.join(__dirname, 'make_blend.py'), '--', GLB_OUT, GLB_OUT.replace(/\.glb$/, '.blend')], { stdio:'inherit' }); }
    catch (e) { console.log('blender not run (' + e.message.split('\n')[0] + '); the .glb is there to import by hand'); }
  }
  await b.close();
})();
