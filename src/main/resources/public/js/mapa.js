import * as THREE from './libs/three.module.js'
class Mapa extends THREE.Mesh {
    constructor(width, height, texture) {
        super();
        this.width = width;
        this.height = height;
        this.texture = texture;
    }
    createMap = () => {
        const geometry = new THREE.BoxGeometry(this.width, 10, this.height);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/textures/" + this.texture)
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }
    createPlansza = () => {
        const geometry = new THREE.BoxGeometry(this.width + 200, 9, this.height + 200);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/textures/wood.jpeg")
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }
}
export { Mapa };