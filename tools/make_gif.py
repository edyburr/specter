"""Builds a looping GIF from an unfold sequence: frames f0000.png (stowed) .. fNNNN.png (open), rendered at SS times the
final size. Plays stowed (held), unfold, open (held), fold, and loops.

    python3 tools/make_gif.py <frames_dir> <out.gif> <fps> <hold_seconds> <supersample>

Every frame is scaled down with a Lanczos filter, then mapped without dithering to one fixed palette of grey levels.
The palette never changes between frames and no pixel is dithered, so still parts of the drawing stay exactly the
same from frame to frame: no flicker, and the GIF only stores what moved. Needs Pillow.
"""
import glob, os, sys
from PIL import Image

src, out, fps, hold, ss = sys.argv[1], sys.argv[2], float(sys.argv[3]), float(sys.argv[4]), int(sys.argv[5])
LEVELS = 16
pal = Image.new('P', (1, 1)); pal.putpalette(sum(([round(255*i/(LEVELS - 1))]*3 for i in range(LEVELS)), []) + [0]*3*(256 - LEVELS))
def load(f):
    im = Image.open(f).convert('L')
    im = im.resize((im.width//ss, im.height//ss), Image.LANCZOS)
    return im.convert('RGB').quantize(palette=pal, dither=Image.Dither.NONE)
frames = [load(f) for f in sorted(glob.glob(os.path.join(src, 'f*.png')))]
step = round(1000/fps)   # GIF delays are whole hundredths of a second: 50 fps is 20 ms, 30 fps rounds to 30 ms
seq = frames + frames[-2:0:-1]
dur = [round(hold*1000)] + [step]*(len(frames) - 2) + [round(hold*1000)] + [step]*(len(frames) - 2)
seq[0].save(out, save_all=True, append_images=seq[1:], duration=dur, loop=0, disposal=1, optimize=False)
print(f'{os.path.basename(out)}: {len(seq)} frames, {seq[0].width}x{seq[0].height}, {os.path.getsize(out)/1e6:.1f} MB')
