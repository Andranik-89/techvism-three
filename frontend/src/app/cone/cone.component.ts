import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ConeService, CanvasCoordinates } from './cone.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-cone',
  templateUrl: './cone.component.html',
  styleUrls: ['./cone.component.scss']
})
export class ConeComponent implements OnInit, AfterViewInit {

  constructor(public coneService: ConeService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowUp') {
      this.camera.position.z--;
    }
    if (event.key === 'ArrowDown') {
      this.camera.position.z++;
    }
    if (event.key === 'ArrowRight') {
      this.camera.position.x--;
    }
    if (event.key === 'ArrowLeft') {
      this.camera.position.x++;
    }
    console.log(event);
  }

  @ViewChild('canvas') private canvasRef: ElementRef;

  //* Cube Properties

  @Input() public rotationSpeedX: number = 0.005;

  @Input() public rotationSpeedY: number = 0;

  @Input() public size: number = 200;

  @Input() public texture: string = "/assets/texture2.jpg";

  //* Stage Properties

  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPlane: number = 1;

  @Input('farClipping') public farClippingPlane: number = 1000;

  //? Helper Properties (Private Properties);

  public camera!: THREE.PerspectiveCamera;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private loader = new THREE.TextureLoader();
  private geometry = new THREE.ConeGeometry(1, 4, 16);
  private material = new THREE.MeshStandardMaterial({ map: this.loader.load(this.texture) });
  public vector = new THREE.Vector3();

  private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);

  public renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

    /**
   *Animate the cube
   *
   * @private
   * @memberof CubeComponent
   */
   private animateCube() {
    this.cube.rotation.x += this.rotationSpeedX;
    this.cube.rotation.y += this.rotationSpeedY;
  }

  /**
   * Create the scene
   *
   * @private
   * @memberof CubeComponent
   */
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x000000)
    this.scene.add(this.cube);
    // light
    const color = 0xFFFFFF;
    const intensity = 1.1;
    const light = new THREE.AmbientLight(color, intensity);
    this.scene.add(light);

  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

   /**
 * Start the rendering loop
 *
 * @private
 * @memberof CubeComponent
 */
  private startRenderingLoop() {
    //* Renderer
    // Use canvas element in template
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

    const controls = new OrbitControls( this.camera, this.renderer.domElement );
    controls.update();
    let component: ConeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.animateCube();
      controls.update();
      component.renderer.render(component.scene, component.camera);
    }());
  }

  public getCanvasCoordinates(): CanvasCoordinates {
    return this.camera.getWorldPosition(this.vector);
  }

  public savePositions(): void {
    // ideally it's better to save positions when the user deactivates the page
    const canvasCoordinates = this.getCanvasCoordinates();
    console.log('data: ', canvasCoordinates);
    this.coneService.saveCanvasPositions(canvasCoordinates).subscribe(data => {
      this.snackBar.open('Cone position was saves successfully', '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    });
  }

  ngAfterViewInit(): void {
    this.coneService.getCanvasPositions().subscribe({
      next: (data) => {
        //*Camera
        let aspectRatio = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
          this.fieldOfView,
          aspectRatio,
          this.nearClippingPlane,
          this.farClippingPlane
        )
        this.camera.position.z = data?.z || 400;
        this.camera.position.x = data?.x || 0;
        this.camera.position.y = data?.y || 0;
        this.createScene();
        this.startRenderingLoop();
      },
      error: (err) => {
        console.log('err: ', err);
      }
    })

  }

}
