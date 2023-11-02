import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AxesHelper,
  GridHelper,
  EquirectangularReflectionMapping,
  SRGBColorSpace,
  ACESFilmicToneMapping
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export class Canvas3D {
  constructor (canvas) {
    const size = {
      width: canvas.offsetWidth,
      height: canvas.offsetHeight
    }

    this.canvas = canvas

    // Init renderer
    const renderer = new WebGLRenderer({ canvas, antialias: true })
    renderer.setClearColor(0xffffff)
    renderer.shadowMap.enabled = true
    renderer.setSize(size.width, size.height)
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.toneMappingExposure = 1
    this.renderer = renderer

    // Init scene
    this.scene = new Scene()

    // Init camera
    this.camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
    this.camera.position.set(-5.29, 2.64, 3.55)
    this.camera.rotation.set(-0.64, -0.87, -0.51)

    // Init orbit control
    // this.orbitControl = new OrbitControls(this.camera, this.canvas)
    // this.orbitControl.update()
    // this.orbitControl.addEventListener('change', () => console.log(this.camera.rotation))

    // Init loaders
    this.gltLoader = new GLTFLoader()
    this.rgbeLoader = new RGBELoader()
  }

  showAxesHelper () {
    const axesHelper = new AxesHelper(3)
    this.scene.add(axesHelper)
  }

  showGridHelper (size = 4) {
    const gridHelper = new GridHelper(size)
    gridHelper.position.set(1, 0, 1)
    this.scene.add(gridHelper)
  }

  render () {
    this.addEnvironmentLight()
    this.addRoom()

    const animate = () => {
      if ( this.renderer) {
        this.renderer.render(this.scene, this.camera)
      }
    }
    this.renderer.setAnimationLoop(animate)

    this.renderer.render(this.scene, this.camera)
  }

  addRoom () {
    this.gltLoader.load('./src/assets/three-models/room3d.glb', (gltf) => {
      let room = gltf.scene
      room.receiveShadow = true
      room.castShadow = true
      this.scene.add(room)
      this.renderer.render(this.scene, this.camera)

      this.room = room
    })
  }

  addEnvironmentLight() {
    this.rgbeLoader.load('./src/assets/three-models/WhiteNeons_NAD.hdr', (texture) => {
      texture.mapping = EquirectangularReflectionMapping
      this.scene.environment = texture
    })
  }

  onResize (width, height) {
    if (this.camera) {
      this.camera.aspect = width / height
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(width, height)
    }
  }

  moveCamera (x) {
    if (this.camera && this.room) {
      const yRotation = ( - x - this.camera.position.x ) * 0.05
      this.room.rotation.y = yRotation
    }
  }

  destroyScene () {
    delete this.gltLoader
    delete this.rgbeLoader
    delete this.room
    delete this.camera
    delete this.scene
    delete this.renderer
    delete this.canvas
    // delete this.orbitControl
  }
}
