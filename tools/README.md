# Tools

| Script | What it does | Needs |
|---|---|---|
| `build_index.sh` | Wraps `specter.html` into `index.html` (the standalone page). Run after editing `specter.html`. | sh |
| `render_orchid.js` | Renders the Webbed Orchid into `renders/orchid-<LW>/` at 2048 px with lines LW px wide (default 3, so `renders/orchid-3/`): stowed, an unfold sequence, the open array from four sides, the three face shapes, a labelled exploded view (`orchid-exploded.png`, twice as wide), and a looping GIF of the unfold (`orchid-loop.gif`, 800 px, 50 fps). It also writes `blender/specter-orchid.glb` with the unfold baked in as animation and, if `blender` is on the PATH, `blender/specter-orchid.blend`. `ONLY=views`, `gif`, `exploded` or `blend` redoes just that part. | Node, Playwright, Python + Pillow for the GIF, Blender for the .blend |
| `make_gif.py` | Called by `render_orchid.js`: turns the unfold frames into the looping GIF, one fixed grey palette and no dithering so nothing flickers. | Python, Pillow |
| `make_blend.py` | Run by `render_orchid.js`: imports the Orchid glTF into an empty Blender scene, names each shared mesh after its part, adds a camera, a sun and a dark world, sets the frame range to the animation and saves the `.blend`. | Blender |
| `postprocess.py` | Builds the wide `*-sheet.png` images from the Orchid renders. | Python, Pillow |
| `beam_pattern.py` | Compares the far-field beam of a filled 19-tile array with the petal (hinged net) layout. | Python, numpy |

Full refresh after a model change:

```sh
tools/build_index.sh
npm i playwright && npx playwright install chromium   # first time only
node tools/render_orchid.js     # LW=<px> for another line weight, PX=4096 for print size
python3 tools/postprocess.py    # or: python3 tools/postprocess.py renders/orchid-<LW>
```

`render_orchid.js` loads three.js and its add-ons from a CDN, so it needs a network connection.

Every part has a name that stays the same on every run and in every export, built from what it is rather than from a counter:
`<owner> / <label>`, e.g. `Tile 07 / Actuator rod 3`, `Horn A2 / Spoke, Tile 01 corner 2 to face corner 1, front`, `Core`.
Tiles are numbered in unfold order (Tile 01 is the front tile), corners 1-6 round the tile and 1-5 round a horn face.
The page shows the name when you click a part, and the Blender objects carry the same names.

In Blender, parts of one class share one mesh, named after the class (the `part` custom property on each object): every tile is a frame (ring, delta frame, hinge halves and launch locks, fused), a panel (with its whiffles), a set of
six actuator brackets and six shafts, and all 20 frames share one mesh, as do all panels, all bracket sets and all shafts, each horn type's body and face are
one mesh used six times (`Horn A face`, ...), and all 114 spokes and every ball joint share one mesh each. Edit the
mesh once and every copy follows. Each spoke is one straight piece that the animation stretches as it telescopes.

The version with carriages, boom-tip and tile-stalk horn mounts, and `render.js` is tagged `backup/all-mechanisms`.
