class Smallcard extends THREE.Mesh {
    constructor(id, texture, kolor, typ, posx, posy, posz) {
        super();
        this._id = id;
        this.texture = texture;
        this.kolor = kolor;
        this.typ = typ;
        this.rewers = "./rewersMaly.png"
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
    }
    createCard = () => {
        const geometry = new THREE.BoxGeometry(80, 1, 80);
        const materials = [];
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/RewersMaly.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/RewersMaly.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/" + this.texture) }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/RewersMaly.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/RewersMaly.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/RewersMaly.png") }));
        materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("./img/textures/karty/RewersMaly.png") }));
        const cube = new THREE.Mesh(geometry, materials);
        cube.kolor = this.kolor;
        cube.position.set(this.posx, this.posy, this.posz);
        return cube;
    }
}