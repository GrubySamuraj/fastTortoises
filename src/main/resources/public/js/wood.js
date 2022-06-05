class Rock extends THREE.Mesh {
    constructor(posx, posy, posz) {
        super();
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
    }
    createRock = () => {
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/textures/rock.jpg")
        });
        const geometry = new THREE.CylinderGeometry(50, 50, 20, 32);
        const cylinder = new THREE.Mesh(geometry, material);
        cylinder.position.set(this.posx, this.posy, this.posz)
        // game.scene.add(cylinder)
        return cylinder;
    }
}