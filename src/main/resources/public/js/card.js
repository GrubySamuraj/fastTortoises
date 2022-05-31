class Card extends THREE.Mesh {
    constructor(id, texture, kolor, typ) {
        super();
        this._id = id;
        this.texture = texture;
        this.kolor = kolor;
        this.typ = typ;
        this.rewers = "./img/textures/rewersDuzy.png"
    }
    createCard = () => {
        const geometry = new THREE.BoxGeometry(57, 1, 86);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            map: new THREE.TextureLoader().load("./img/textures/wood.jpeg")
        });
        const cube = new THREE.Mesh(geometry, material);
        return cube;
    }
}