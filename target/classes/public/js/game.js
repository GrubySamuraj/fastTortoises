class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0, 1000, 1000);
        this.axes = new THREE.AxesHelper(1000);
        this.scene.add(this.axes);
        this.camera.lookAt(this.scene.position);
        this.render();
        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
    }
    render = () => {
        requestAnimationFrame(this.render);
        this.renderer.render(this.scene, this.camera);
        TWEEN.update();
    }
}