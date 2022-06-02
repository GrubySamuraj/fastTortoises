class Card extends THREE.Mesh {
    constructor(id, texture, typ, posx, posy, posz) {
        super();
        this._id = id;
        this.texture = texture;
        // this.kolor = kolor;
        this.typ = typ;
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
        this.rewers = "./img/textures/karty/Rewers.png";
    }
    createCard = () => {
        //obiekt stworzyć, przechowujący karty
        const geometry = new THREE.BoxGeometry(57, 1, 86);
        let materials = [];
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/Rewers.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/Rewers.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/" + this.texture) }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/Rewers.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/Rewers.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/Rewers.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/Rewers.png") }));
        const cube = new THREE.Mesh(geometry, materials);
        game.scene.add(cube);
        cube.position.set(this.posx, this.posy, this.posz);
        return cube;
    }
}