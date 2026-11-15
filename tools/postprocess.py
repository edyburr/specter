"""Thickens the 1 px render lines to about 3 px, converts to greyscale, and builds the wide sheets.
Run after tools/render.js. Needs Pillow.   python3 tools/postprocess.py [renders_dir]
Run it once per fresh render: running it again on the same files thickens the lines again.
"""
import glob, os, sys
from PIL import Image, ImageFilter
Image.MAX_IMAGE_PIXELS = None
R = sys.argv[1] if len(sys.argv) > 1 else os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'renders')

for f in glob.glob(os.path.join(R, '*.png')):
    if f.endswith('-sheet.png'):
        continue
    Image.open(f).convert('L').filter(ImageFilter.MinFilter(3)).save(f, optimize=True)

def sheet(names, out):
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
