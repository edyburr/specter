# Tools

| Script | What it does | Needs |
|---|---|---|
| `build_index.sh` | Wraps `specter.html` into `index.html` (the standalone page). Run after editing `specter.html`. | sh |
| `render.js` | Renders every black-and-white view into `renders/` and exports the three poses to `blender/*.glb`. | Node, Playwright |
| `postprocess.py` | Thickens the render lines and builds the wide `*-sheet.png` images. Run once after `render.js`. | Python, Pillow |
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
