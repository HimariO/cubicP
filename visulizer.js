var scene, camera, renderer;
var geometry, material, mesh;
var boxMaterial;
var channels = []

Array.prototype.end = function() {
  if(this.length > 0)
    return this[this.length-1]
  return undefined
}


class Channel {
  constructor(color_tone, parent_scene, channel_num) {
    this.color_tone = color_tone
    this.parent_scene = parent_scene
    this.pos_delta = 0.5

    this.channel_num = channel_num
    this.mesh_objects = []
    this.amplitude_series = []
  }

  update(amplitude){
    amplitude = Math.floor(amplitude)

    if(amplitude !== this.amplitude_series.end())
      this.new_block(amplitude)
    else
      this.extend_block(this.mesh_objects.end())

    if(this.mesh_objects[0] !== undefined)
      if(this.mesh_objects[0].position.x  >  100)
        this.parent_scene.remove(this.mesh_objects.shift())

    this.amplitude_series.push(amplitude)
    if(this.amplitude_series.length > 100)
      this.amplitude_series.splice(0, 50)

    this.render()
  }

  render(){
    for(let mesh of this.mesh_objects){
      mesh.position.x += this.pos_delta
    }
  }

  new_block(amplitude){
    console.log(`newAmp ${amplitude}  listlen ${this.mesh_objects.length}`);
    var boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
    var boxMaterials = [
        new THREE.MeshLambertMaterial({color: this.color_tone}),
        new THREE.MeshLambertMaterial({color: this.color_tone}),
        new THREE.MeshLambertMaterial({color: this.color_tone}),
        new THREE.MeshLambertMaterial({color: this.color_tone}),
        new THREE.MeshLambertMaterial({color: this.color_tone}),
        new THREE.MeshLambertMaterial({color: this.color_tone})
    ];
    var boxMaterial = new THREE.MultiMaterial(boxMaterials);
    var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

    boxMesh.position.x = 0
    boxMesh.position.y = Math.floor(amplitude)
    boxMesh.position.z = this.channel_num * 10

    boxMesh.scale.x = this.pos_delta

    this.parent_scene.add(boxMesh)
    this.mesh_objects.push(boxMesh)
  }

  extend_block(boxMesh){
    if(boxMesh === undefined)
      return

    boxMesh.scale.x += this.pos_delta
    boxMesh.position.x -= this.pos_delta / 2
  }
}



function init() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  // camera = new THREE.OrthographicCamera(
  //   window.innerWidth / -8,   // Left
  //   window.innerWidth / 8,    // Right
  //   window.innerHeight / 8,   // Top
  //   window.innerHeight / -8,  // Bottom
  //   -100,            // Near clipping plane
  //   100);           // Far clipping plane
  camera.position.z = 100;
  camera.position.x = 150;
  camera.position.y = 50;

  geometry = new THREE.BoxGeometry( 200, 200, 200 );
  material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: false } );

  // mesh = new THREE.Mesh( geometry, material );
  // scene.add( mesh );


   // Create the cube
   // Parameter 1: Width
   // Parameter 2: Height
   // Parameter 3: Depth
   var boxGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);

   // Applying different materials to the faces is a more difficult than applying one
   // material to the whole geometry. We start with creating an array of
   // THREE.MeshBasicMaterial.

   // Define six colored materials
   var boxMaterials = [
       new THREE.MeshLambertMaterial({color:0xFF0000}),
       new THREE.MeshLambertMaterial({color:0x00FF00}),
       new THREE.MeshLambertMaterial({color:0x0000FF}),
       new THREE.MeshLambertMaterial({color:0xFFFF00}),
       new THREE.MeshLambertMaterial({color:0x00FFFF}),
       new THREE.MeshLambertMaterial({color:0xFFFFFF})
   ];

   // Create a MeshFaceMaterial, which allows the cube to have different materials on
   // each face
   boxMaterial = new THREE.MultiMaterial(boxMaterials);

   // Create a mesh and insert the geometry and the material. Translate the whole mesh
   // by 1.5 on the x axis and by 4 on the z axis and add the mesh to the scene.
   boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  //  boxMesh.position.set(1.5, 0.0, 4.0);

   var ambientLight = new THREE.AmbientLight(0x303030, 1.0);
   scene.add(ambientLight);

   var directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
   directionalLight.position.set(0.0, 0.0, 5.0);
   scene.add(directionalLight);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor(0xeeeeee );

  document.body.appendChild( renderer.domElement );
  channels.push(new Channel("#37cfff", scene, 0))
  channels.push(new Channel("#FFFF00", scene, 1))
  channels.push(new Channel("#FFFFFF", scene, 2))
  channels.push(new Channel("#37cfff", scene, 3))
  channels.push(new Channel("#FFFF00", scene, 4))
  channels.push(new Channel("#FFFFFF", scene, 5))
  channels.push(new Channel("#37cfff", scene, 6))
  channels.push(new Channel("#FFFF00", scene, 7))

}


function animate() {

  requestAnimationFrame( animate );


  // boxMesh.rotation.x += 0.01;
  // boxMesh.rotation.y += 0.02;
  // boxMesh.position.x += 0.01
  // camera.rotation.x += 0.01
  camera.lookAt(scene.position)
  var scaleX = boxMesh.scale.x;


  renderer.render( scene, camera );
}




init();
animate();

// setInterval(()=>{
//   cha.update(Math.random() * 20)
//   chb.update(Math.random() * 15)
//   chc.update(Math.random() * 10)
// }, 62)
