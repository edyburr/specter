"""Thickens the 1 px render lines to about 3 px, converts to greyscale, and builds the wide sheets.
Run after tools/render.js (or tools/render_orchid.js). Needs Pillow.   python3 tools/postprocess.py [renders_dir]
Builds every sheet whose source images are all in the folder, so it works on renders/ and renders/orchid/ alike.
--no-thicken leaves the 1 px lines as rendered and only builds the sheets.
Run it once per fresh render: running it again on the same files thickens the lines again.
"""
import glob, os, sys
from PIL import Image, ImageFilter
Image.MAX_IMAGE_PIXELS = None
args = [a for a in sys.argv[1:] if not a.startswith('--')]
THICKEN = '--no-thicken' not in sys.argv
R = args[0] if args else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'renders')

for f in glob.glob(os.path.join(R, '*.png')):
    if f.endswith('-sheet.png') or not THICKEN:
        continue
    Image.open(f).convert('L').filter(ImageFilter.MinFilter(3)).save(f, optimize=True)

def sheet(names, out):
    if not all(os.path.exists(os.path.join(R, n + '.png')) for n in names):
        return
    ims = [Image.open(os.path.join(R, n + '.png')) for n in names]
    w, h = ims[0].size
    m = Image.new('L', (w * len(ims), h), 255)
    for i, im in enumerate(ims):
        m.paste(im, (i * w, 0))
    m.save(os.path.join(R, out + '.png'), optimize=True)

for t in ('carriage', 'petal'):
    sheet([f'{t}-{v}' for v in ('front', 'side', 'top', 'iso')], f'{t}-active-sheet')
    sheet([f'{t}-stalk-{v}' for v in ('front', 'side', 'top', 'iso')], f'{t}-stalk-active-sheet')
    sheet([f'{t}-face-{v}' for v in ('concave', 'flat', 'convex')], f'{t}-face-sheet')
sheet([f'petal-web-{v}' for v in ('front', 'side', 'top', 'iso')], 'petal-web-active-sheet')
sheet(['closed-web-front', 'closed-web-back'], 'closed-web-sheet')
# renders/orchid/
sheet([f'orchid-{v}' for v in ('front', 'side', 'iso')], 'orchid-active-sheet')
sheet([f'orchid-face-{v}' for v in ('concave', 'flat', 'convex')], 'orchid-face-sheet')
sheet(['orchid-closed-front', 'orchid-closed-back'], 'orchid-closed-sheet')
sheet([f'orchid-unfold-{s:03d}' for s in (0, 25, 50, 75, 100)], 'orchid-unfold-sheet')
