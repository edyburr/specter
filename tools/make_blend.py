# Turns the Orchid glTF from render_orchid.js into a ready-to-open .blend: the model with its unfold animation,
# a camera, a sun and a grey studio world, frame range set to the animation.
#   blender -b --factory-startup --python tools/make_blend.py -- blender/specter-orchid.glb blender/specter-orchid.blend
import sys, math
import bpy
from mathutils import Vector

src, out = sys.argv[sys.argv.index('--') + 1:][:2]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
bpy.ops.import_scene.gltf(filepath=src)

# Parts of one class share one mesh (all 19 tiles, the 6 flares of each horn type, ...), but glTF carries no mesh
# names, so name each mesh after the objects that use it: 'Horn A flare', not 'Mesh_9'.
for me in bpy.data.meshes:
    users = sorted(ob.name for ob in scene.objects if ob.data == me)
    if users: me.name = users[0].split('.')[0]

# frame range from the imported actions
end = 1
for ob in scene.objects:
    ad = ob.animation_data
    acts = [ad.action] if ad and ad.action else []
    if ad: acts += [s.action for t in ad.nla_tracks for s in t.strips if s.action]
    for a in acts: end = max(end, int(math.ceil(a.frame_range[1])))
scene.render.fps = 24
scene.frame_start, scene.frame_end = 0, end
scene.frame_set(int(end * 0.45))          # open, so the bounds below cover the whole array

# bounds of the open model, for the camera and the light
lo, hi = Vector((1e9,) * 3), Vector((-1e9,) * 3)
for ob in scene.objects:
    if ob.type != 'MESH': continue
    for c in ob.bound_box:
        w = ob.matrix_world @ Vector(c); lo = Vector(map(min, lo, w)); hi = Vector(map(max, hi, w))
mid, size = (lo + hi) / 2, max(hi - lo)

cam_data = bpy.data.cameras.new('Camera'); cam_data.lens = 50
cam = bpy.data.objects.new('Camera', cam_data); scene.collection.objects.link(cam)
cam.location = mid + Vector((1.0, -1.4, 0.8)).normalized() * size * 2.4
cam.rotation_euler = (mid - cam.location).to_track_quat('-Z', 'Y').to_euler()
scene.camera = cam

sun_data = bpy.data.lights.new('Sun', 'SUN'); sun_data.energy = 3.0
sun = bpy.data.objects.new('Sun', sun_data); scene.collection.objects.link(sun)
sun.rotation_euler = (math.radians(50), math.radians(10), math.radians(30))

world = bpy.data.worlds.new('Studio'); world.use_nodes = True
world.node_tree.nodes['Background'].inputs['Color'].default_value = (0.05, 0.05, 0.055, 1)
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 0.6
scene.world = world

scene.frame_set(0)
bpy.ops.wm.save_as_mainfile(filepath=out)
print('saved', out, 'frames 0-%d' % end)
