class Zolw extends THREE.Mesh {
    constructor(tekstura, id, gracz, positionx, positiony, positionz) {
        super();
        this.tekstura = tekstura
        this._id = id;
        this.gracz = gracz;
        this.positionx = positionx;
        this.positiony = positiony;
        this.positionz = positionz;
    }
    createZolw = () => {
        let example;
        const loader = new THREE.GLTFLoader();
        loader.load('./img/textures/zolwie/' + this.tekstura, (gltf) => {
            gltf.scene.scale.set(12, 12, 12);
            gltf.scene.position.set(this.positionx, this.positiony, this.positionz);
            game.scene.add(gltf.scene);
            return gltf;

        }, undefined, function (error) {
            console.error(error);
        });
        // const geometry = new THREE.BoxGeometry(70, 10, 70);
        // const cube = new THREE.Mesh(geometry, material);
        // return cube;
    }
}