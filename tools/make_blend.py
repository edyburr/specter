# Turns the Orchid glTF from render_orchid.js into a ready-to-open .blend: the model with its unfold animation,
# a camera, a sun and a white world, frame range set to the animation.
#   blender -b --factory-startup --python tools/make_blend.py -- blender/specter-orchid.glb blender/specter-orchid.blend
import sys, math
import bpy
from mathutils import Vector

src, out = sys.argv[sys.argv.index('--') + 1:][:2]

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
bpy.ops.import_scene.gltf(filepath=src)

# Every object arrives with the page's stable name ('Tile 07 / Actuator rod 3'), the same on every export. Parts of one
# class share one mesh (all 19 panels, the 6 faces of each horn type, ...), but glTF carries no mesh names, so name
# each mesh after its class, which the page exports as the custom property 'part': 'Horn A face', not 'Mesh_9'.
for me in bpy.data.meshes:
    users = sorted((ob for ob in scene.objects if ob.data == me), key=lambda ob: ob.name)
    if users: me.name = users[0].get('part') or users[0].name.split('.')[0]

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
world.node_tree.nodes['Background'].inputs['Color'].default_value = (1, 1, 1, 1)   # a white sheet, so the black lines read as a drawing
world.node_tree.nodes['Background'].inputs['Strength'].default_value = 1.0
scene.world = world

# Look of the drawings: every surface plain white, flat (an emission, so no light or shadow changes it), and black
# Freestyle lines on the outline and on every crease sharper than 20 degrees, as the page and the renders draw them.
for m in bpy.data.materials:
    m.use_nodes = True
    nt = m.node_tree; nt.nodes.clear()
    em = nt.nodes.new('ShaderNodeEmission'); em.inputs['Color'].default_value = (1, 1, 1, 1); em.inputs['Strength'].default_value = 1.0
    o = nt.nodes.new('ShaderNodeOutputMaterial'); nt.links.new(em.outputs['Emission'], o.inputs['Surface'])
    m.diffuse_color = (1, 1, 1, 1)
scene.render.use_freestyle = True
scene.render.line_thickness_mode = 'ABSOLUTE'; scene.render.line_thickness = 1.0
vl = bpy.context.view_layer; vl.use_freestyle = True
fs = vl.freestyle_settings; fs.crease_angle = math.radians(20)
ls = fs.linesets[0] if fs.linesets else fs.linesets.new('Edges')
ls.select_silhouette = ls.select_border = ls.select_crease = True
ls.select_by_visibility = True; ls.visibility = 'VISIBLE'
if ls.linestyle is None: ls.linestyle = bpy.data.linestyles.new('Black')
ls.linestyle.color = (0, 0, 0); ls.linestyle.thickness = 1.5; ls.linestyle.alpha = 1.0
scene.view_settings.view_transform = 'Standard'   # white stays white

scene.frame_set(0)
bpy.ops.wm.save_as_mainfile(filepath=out)
print('saved', out, 'frames 0-%d' % end)
