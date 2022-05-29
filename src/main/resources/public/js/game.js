import * as THREE from './libs/three.module.js'
import { Mapa } from "./mapa.js"
import { Zolw } from './zolw.js';
class Game extends THREE.Mesh {
    constructor() {
        super();
        this.pola = [[], [], [], [], [], [], [], [], [], []];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0, 600, 600);
        this.createElements();
        this.axes = new THREE.AxesHelper(1000);
        this.scene.add(this.axes);
        this.camera.lookAt(this.scene.position);
        this.mapy = new Mapa(300, 500, "plansza.jpg");
        this.mapa = this.mapy.createMap();
        this.scene.add(this.mapa);
        this.plaszna = this.mapy.createPlansza();
        this.scene.add(this.plaszna);
        // this.scene.add(this.zolw);
        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.render();
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
    }
    createElements = async () => {
        // texture, id, gracz, positionx, positiony, positionz
        this.zolw = new Zolw("zolwNiebieski.png", 0, 0, -220, 10, 370);
        this.zolw = await this.zolw.createZolw();
        console.log(this.zolw);
        this.scene.add(this.zolw);
    }
}
export { Game, THREE };