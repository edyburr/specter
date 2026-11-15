# Tools

| Script | What it does | Needs |
|---|---|---|
| `build_index.sh` | Wraps `specter.html` into `index.html` (the standalone page). Run after editing `specter.html`. | sh |
| `render.js` | Renders every black-and-white view into `renders/` and exports the three poses to `blender/*.glb`. | Node, Playwright |
| `render_orchid.js` | Renders the Webbed Orchid only (hinged peel, port-web horns) into `renders/orchid-<LW>/` at 2048 px with lines LW px wide (default 3, so `renders/orchid-3/`): stowed, an unfold sequence, the open array from four sides, the three face shapes, a labelled exploded view (`orchid-exploded.png`, twice as wide), and a looping GIF of the unfold (`orchid-loop.gif`, 800 px, 50 fps). `ONLY=views`, `gif` or `exploded` redoes just that part. No glTF. | Node, Playwright, Python + Pillow for the GIF |
| `make_gif.py` | Called by `render_orchid.js`: turns the unfold frames into the looping GIF, one fixed grey palette and no dithering so nothing flickers. | Python, Pillow |
| `postprocess.py` | Thickens the render lines and builds the wide `*-sheet.png` images. Run once after `render.js`, or with `renders/orchid-3 --no-thicken` after `render_orchid.js` (sheets only). | Python, Pillow |
| `beam_pattern.py` | Compares the far-field beam of the filled and petal arrays. | Python, numpy |

Full refresh after a model change:

```sh
tools/build_index.sh
npm i playwright && npx playwright install chromium   # first time only
node tools/render.js            # PX=1600 node tools/render.js for a quick pass
python3 tools/postprocess.py
```

`render.js` loads three.js and the glTF exporter from a CDN, so it needs a network connection.
At the default 4096 px it takes a few minutes with software rendering.

Webbed Orchid only:

```sh
node tools/render_orchid.js     # LW=<px> for another line weight, PX=4096 for print size
python3 tools/postprocess.py renders/orchid-3 --no-thicken   # sheets only; the lines are already the right weight
```
