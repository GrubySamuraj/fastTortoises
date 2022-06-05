class Zolw extends THREE.Mesh {
    constructor(tekstura, id, gracz, positionx, positiony, positionz, kolor) {
        super();
        this.tekstura = tekstura
        this._id = id;
        this.gracz = gracz;
        this.positionx = positionx;
        this.positiony = positiony;
        this.positionz = positionz;
        this.kolor = kolor;
    }
    createZolw = async () => {
        return new Promise((resolve, reject) => {
            try {
                const loader = new THREE.GLTFLoader();
                loader.load('./img/textures/zolwie/' + this.tekstura, (gltf) => {
                    gltf.scene.scale.set(12, 12, 12);
                    gltf.scene.position.set(this.positionx, this.positiony, this.positionz);
                    gltf.scene.kolor = this.kolor;
                    gltf.scene.pole = -1;
                    resolve(gltf.scene);
                });
            }
            catch (err) {
                reject(err)
            }
        })
    }
}