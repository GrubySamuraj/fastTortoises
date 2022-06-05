class Mapa extends THREE.Mesh {
    constructor(width, height, texture) {
        super();
        this.width = width;
        this.height = height;
        this.texture = texture;
    }
    createPlansza = () => {
        const geometry = new THREE.BoxGeometry(this.width + 400, 8, this.height + 300);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/textures/grass.jpg")
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = -8;
        return cube;
    }
}