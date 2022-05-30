class Game extends THREE.Mesh {
    constructor() {
        super();
        this.pola = [[], [], [], [], [], [], [], [], [], []];
        this.zolwie = [];
        this.teksturazolwia = ["zolwNiebieski.gltf", "zolwCzerwony.gltf", "zolwFioletowy.gltf", "zolwZielony.gltf", "zolwZolty.gltf"]; // tu bedzie baza danych
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0, 900, 800);
        this.createElements();
        this.axes = new THREE.AxesHelper(1000);
        this.scene.add(this.axes);
        this.camera.lookAt(this.scene.position);
        this.mapy = new Mapa(500, 800, "plansza.jpg");
        this.mapa = this.mapy.createMap();
        this.scene.add(this.mapa);
        this.plaszna = this.mapy.createPlansza();
        this.scene.add(this.plaszna);
        const light = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(light);
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
        let posx = -200;
        let zolw;
        for (let x = 0; x < 5; x++) {
            // texture, id, gracz, positionx, positiony, positionz
            zolw = new Zolw(this.teksturazolwia[x], x, 0, posx, 10, 450);
            zolw = zolw.createZolw();
            posx += 100;
        }
    }
}