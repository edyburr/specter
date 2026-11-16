"""Builds the wide sheets from the Orchid renders: views side by side in one image. Needs Pillow.
Run after tools/render_orchid.js.   python3 tools/postprocess.py [renders_dir]   (default renders/orchid-3)
Builds every sheet whose source images are all in the folder.
"""
import os, sys
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
R = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'renders', 'orchid-3')

def sheet(names, out):
    if not all(os.path.exists(os.path.join(R, n + '.png')) for n in names):
        return
    ims = [Image.open(os.path.join(R, n + '.png')) for n in names]
    w, h = ims[0].size
    m = Image.new('L', (w * len(ims), h), 255)
    for i, im in enumerate(ims):
        m.paste(im, (i * w, 0))
    m.save(os.path.join(R, out + '.png'), optimize=True)
    print(out)

sheet([f'orchid-{v}' for v in ('front', 'side', 'iso')], 'orchid-active-sheet')
sheet([f'orchid-face-{v}' for v in ('concave', 'flat', 'convex')], 'orchid-face-sheet')
sheet(['orchid-closed-front', 'orchid-closed-back'], 'orchid-closed-sheet')
sheet([f'orchid-unfold-{s:03d}' for s in (0, 25, 50, 75, 100)], 'orchid-unfold-sheet')
