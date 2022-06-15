class Mapa extends THREE.Mesh {
    constructor(width, height, texture) {
        super();
        this.width = width;
        this.height = height;
        this.texture = texture;
    }
    createPlansza = () => {
        const geometry = new THREE.BoxGeometry(this.width, 8, this.height);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/textures/grass.jpg")
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.y = -8;
        return cube;
    }
    createWoda = () => {
        const geometry2 = new THREE.BoxGeometry(this.width - 400, 8, this.height - 400);
        const material2 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/water.jpg")
        });
        const woda = new THREE.Mesh(geometry2, material2);
        woda.position.y = -6;
        return woda;
    }
}