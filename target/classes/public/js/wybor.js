class Wybor extends THREE.Mesh {
    constructor(posx, posy, posz, colors) {
        super();
        this.posx = posx;
        this.posy = posy;
        this.posz = posz;
        this.colors = colors;
        this.wszystkieWybory = [];
    }
    createWybor = async () => {
        let wybory = new THREE.Object3D();
        const bialyGeometry = new THREE.PlaneGeometry(135, 30);
        const bialyMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide });
        let bialy = new THREE.Mesh(bialyGeometry, bialyMaterial);
        bialy.position.set(this.posx, this.posy, this.posz - 1);
        game.wszystkieWybory.push(bialy);
        game.scene.add(bialy);
        for (let x = 0; x < game.kolory.length; x++) {
            const geometry = new THREE.PlaneGeometry(20, 20);
            const material = new THREE.MeshBasicMaterial({ color: this.colors[x], side: THREE.DoubleSide });
            let wybor = new THREE.Mesh(geometry, material);
            wybor.position.set(this.posx - 50, this.posy, this.posz);
            game.scene.add(wybor);
            wybor.kolor = game.kolory[x];
            wybor.wybory = true;
            this.posx += 25;
            game.wszystkieWybory.push(wybor);
        }
        return wybory;
    }
}