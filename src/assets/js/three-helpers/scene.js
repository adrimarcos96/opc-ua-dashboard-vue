import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  AxesHelper,
  GridHelper,
  SRGBColorSpace,
  ACESFilmicToneMapping,
  SpotLight
} from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
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
    this.camera.position.set(0.356, -0.073, 3.316)
    this.camera.rotation.set(-0.1022, -0.0549, -0.0056)

    // Init orbit control
    // this.orbitControl = new OrbitControls(this.camera, this.canvas)
    // this.orbitControl.update()
    // this.orbitControl.addEventListener('change', () => console.log(this.camera.position))

    // Init loaders
    this.gltLoader = new GLTFLoader()
    // this.rgbeLoader = new RGBELoader()
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
    this.addLight()
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
    this.gltLoader.load('./three-models/dining_room.glb', (gltf) => {
      let room = gltf.scene
      room.receiveShadow = true
      room.castShadow = true
      this.scene.add(room)
      this.renderer.render(this.scene, this.camera)

      this.room = room
    })
  }

  addLight () {
    const spotL1 = new SpotLight('white', 400)
    spotL1.position.set(6.134189177716149, 5.070504083758956, 5.710233787082724)
    this.scene.add(spotL1)

    const spotL2 = new SpotLight('white', 400)
    spotL2.position.set(-10.241626287874897, 6.114524086167419, 5.939639697589269)
    this.scene.add(spotL2)

    const spotL3 = new SpotLight('white', 400)
    spotL3.position.set(-0.07421061718939888, -11.420436975597038, 0.29881201073197405)
    this.scene.add(spotL3)
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
    delete this.room
    delete this.camera
    delete this.scene
    delete this.renderer
    delete this.canvas
    // delete this.orbitControl
  }
}
