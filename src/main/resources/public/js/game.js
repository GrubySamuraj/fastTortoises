class Game extends THREE.Mesh {
    constructor() {
        super();
        this.pola = [[], [], [], [], [], [], [], [], [], []];
        this.kartyZolw = [];
        this.kartyAkcji = [];
        this.zolwie = [];
        this.positionPole = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }];
        this.kolory = ["czerwony", "fioletowy", "niebieski", "zielony", "zolty"];
        this.texturesCardsMaly = ["zolwczerwonyKartka.png", "zolwFioletowyKartka.png", "zolwniebieskiKartka.png", "zolwZielonyKartka.png", "zolwZoltyKartka.png"];
        this.teksturazolwia = ["zolwNiebieski.gltf", "zolwCzerwony.gltf", "zolwFioletowy.gltf", "zolwZielony.gltf", "zolwZolty.gltf"];
        this.teksturyKart = ["CzerwonyMinus.png", "CzerwonyPlus.png", "CzerwonyPlusPlus.png", "FioletowyMinus.png", "FioletowyPlus.png", "FioletowyPlusPlus.png", "FioletowyStaryStary.png", "KolorowyMinus.png", "KolorowyPlecy.png", "KolorowyPlus.png", "NiebieskiMinus.png", "NiebieskiPlus.png", "NiebieskiPlusPlus.png", "ZielonyMinus.png", "ZielonyPlus.png", "ZielonyPlusPlus.png", "ZoltyMinus.png", "ZoltyPlus.png", "ZoltyPlusPlus.png"];
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.position.set(0, 600, 1000);
        this.axes = new THREE.AxesHelper(1000);
        this.scene.add(this.axes);
        this.camera.lookAt(this.scene.position);
        this.mapy = new Mapa(500, 800, "plansza.jpg");
        this.mapa = this.mapy.createMap();
        this.scene.add(this.mapa);
        this.plaszna = this.mapy.createPlansza();
        this.scene.add(this.plaszna);
        const light = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(light);
        window.onresize = () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        };
        this.render();
    }
    render = () => {
        requestAnimationFrame(this.render);
        TWEEN.update();
        this.renderer.render(this.scene, this.camera);
    }
    createElements = async () => {
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        let posx = -200;
        let zolw;
        for (let x = 0; x < 5; x++) {
            // texture, id, gracz, positionx, positiony, positionz
            zolw = new Zolw(this.teksturazolwia[x], x, 0, posx, 10, 450);
            zolw = zolw.createZolw();
            posx += 100;
        }
        posx = -350;
        let posy = 10;
        let posz = 430;
        for (let x = 0; x < 6; x++) {
            posy += 1
            let zolwcard;
            zolwcard = new Smallcard(x, this.texturesCardsMaly[x], this.kolory[x], "zolw", posx, posy, posz);
            zolwcard = zolwcard.createCard();
            this.scene.add(zolwcard);
            // zolwcard.rotation.y = Math.PI;
            zolwcard.rotation.z = Math.PI;
            this.kartyZolw.push(zolwcard);
        }
        posx = -350;
        posy = 10;
        posz = 0;
        for (let y = 0; y < this.teksturyKart.length; y++) {
            posy += 1
            let karta;
            // constructor(id, texture, typ, posx, posy, posz)
            karta = new Card(y, this.teksturyKart[y], "karta", posx, posy, posz);
            karta = karta.createCard();
            // zolwcard.rotation.y = Math.PI;
            karta.rotation.z = Math.PI;
            this.kartyAkcji.push(karta);
        }
        this.potasuj(this.kartyAkcji, 10);
        this.potasuj(this.kartyZolw, 10);
    }
    potasuj = (karty, iloscPrzetasowan) => {
        if (iloscPrzetasowan > 0) {
            let losowa;
            let losowa2;
            let x = 2;
            while (x > 0) {
                losowa = Math.floor(Math.random() * (karty.length - 1));
                losowa2 = Math.floor(Math.random() * (karty.length - 1));
                if (losowa != losowa2) {
                    x--;
                }
            }
            let pierwszyPunktY = karty[losowa].position.y;
            let drugiPunktY = karty[losowa].position.y + karty[karty.length - 1].position.y;
            let ostatniPunktY = karty[karty.length - 1].position.y;
            let pierwszyPunktZ = karty[losowa].position.z;
            let drugiPunktZ = karty[losowa].position.y + karty[karty.length - 1].position.z;
            let ostatniPunktZ = karty[losowa].position.z;
            let punktyY = [ostatniPunktY];
            let punktyZ = [drugiPunktZ, ostatniPunktZ];
            new TWEEN.Tween(karty[losowa].position)
                .to({ y: punktyY, z: punktyZ }, 1000)
                .interpolation(TWEEN.Interpolation.Bezier)
                .onUpdate()
                .onComplete(() => {
                    // karty[karty.length - 1] = karty[losowa];
                    // for (let y = karty.length - 1; y > 0; y--) {
                    //     karty[y].position.y = karty[y - 1].position.y;
                    //     // karty[y] = karty[y - 1];
                    // }
                    for (let x = 0; x < karty.length - 1; x++) {
                        karty[x].position.y = x
                    }
                    karty[karty.length - 1].position.y = karty.length - 1
                    this.potasuj(karty, iloscPrzetasowan - 1);
                })
                .easing(TWEEN.Easing.Linear.None)
                .start()
        }
        else if (iloscPrzetasowan == 0) {
            iloscPrzetasowan--;
            this.rozdanie();
        }
    }
    rozdanie = () => {
        console.log(this.kartyZolw.length - 1);
        let losowa = Math.floor(Math.random() * (this.kartyZolw.length - 1));
        console.log(losowa);
        let karta = this.kartyZolw[losowa];
        karta.rotation.x = Math.PI;
        karta.rotation.y = Math.PI;
        new TWEEN.Tween(karta.position)
            .to({ x: 340, y: 10 }, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .start()
        player.kolor = karta.kolor;
        console.log(player.kolor);
    }
    obroc = () => {

    }
}