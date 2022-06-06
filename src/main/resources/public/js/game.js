class Game extends THREE.Mesh {
    constructor() {
        super();
        this.pola = [
            {
                position: { x: 110, z: 334 },
                tortoises: []
            },
            {
                position: { x: 10, z: 287 },
                tortoises: []
            },
            {
                position: { x: -80, z: 210 },
                tortoises: []
            },
            {
                position: { x: -46, z: 108 },
                tortoises: []
            },
            {
                position: { x: 60, z: 79 },
                tortoises: []
            },
            {
                position: { x: 90, z: -40 },
                tortoises: []
            },
            {
                position: { x: 10, z: -122 },
                tortoises: []
            },
            {
                position: { x: -91, z: -192 },
                tortoises: []
            },
            {
                position: { x: -47, z: -280 },
                tortoises: []
            },
            {
                position: { x: 37, z: -341 },
                tortoises: []
            }
        ];
        this.kolorowaClicked = false;
        this.kartyZolw = [];
        this.kartyAkcji = [];
        this.zolwie = [];
        this.positionPole = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }];
        this.kolory = ["niebieski", "czerwony", "fioletowy", "zielony", "zolty"];
        this.colors = ["#0000FF", "#FF0000", "#800080", "#00FF00", "#FFFF00"];
        this.texturesCardsMaly = ["zolwczerwonyKartka.png", "zolwFioletowyKartka.png", "zolwniebieskiKartka.png", "zolwZielonyKartka.png", "zolwZoltyKartka.png"];
        this.teksturazolwia = ["zolwNiebieski.gltf", "zolwCzerwony.gltf", "zolwFioletowy.gltf", "zolwZielony.gltf", "zolwZolty.gltf"];
        this.teksturyKart = ["CzerwonyMinus.png", "CzerwonyPlus.png", "CzerwonyPlusPlus.png", "FioletowyMinus.png", "FioletowyPlus.png", "FioletowyPlusPlus.png", "KolorowyStaryStary.png", "KolorowyMinus.png", "KolorowyPlecy.png", "KolorowyPlus.png", "NiebieskiMinus.png", "NiebieskiPlus.png", "NiebieskiPlusPlus.png", "ZielonyMinus.png", "ZielonyPlus.png", "ZielonyPlusPlus.png", "ZoltyMinus.png", "ZoltyPlus.png", "ZoltyPlusPlus.png"];
        this.kolorkiClicked = false;
        this.carsdPosition = { x: 0, y: 600, z: 1000 };
        this.ilosciKart = {
            plus: 5,
            minus: 2,
            plusplus: 1,
            kolorowy: 3,
            stary: 2,
            starystary: 2
        };
        this.kartyInfo = [];
        this.GeneracjaKart();
        console.log(this.kartyInfo);
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
        this.plaszna = this.mapy.createPlansza();
        this.scene.add(this.plaszna);
        this.wylosowanaKarta = false;
        const light = new THREE.AmbientLight(0xFFFFFF);
        this.scene.add(light);
        this.rzuconeKarty = [];
        this.wszystkieWybory = [];
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
        this.controls.enablePan = false;
        let posx = -200;
        let zolw;
        for (let x = 0; x < 5; x++) {
            zolw = new Zolw(this.teksturazolwia[x], x, 0, posx, -6, 450, this.kolory[x]);
            zolw = await zolw.createZolw();
            posx += 100;
            this.scene.add(zolw);
            this.zolwie.push(zolw);
        }
        posx = -350;
        let posy = -6;
        let posz = 430;
        const stosKartMalych = new THREE.Object3D();
        for (let x = 0; x < this.texturesCardsMaly.length; x++) {
            posy += 1;
            let zolwcard;
            zolwcard = new Smallcard(x, this.texturesCardsMaly[x], this.kolory[x], "zolw", posx, posy, posz);
            zolwcard = zolwcard.createCard();
            zolwcard.rotation.z = Math.PI;
            this.kartyZolw.push(zolwcard);
            stosKartMalych.add(zolwcard);
        }
        this.scene.add(stosKartMalych);
        posx = -350;
        posy = -6;
        posz = 0;
        const stosKart = new THREE.Object3D();
        for (let y = 0; y < this.kartyInfo.length; y++) {
            posy += 1
            let karta;
            karta = new Card(y, this.kartyInfo[y].sciezka, this.kartyInfo[y], posx, posy, posz);
            karta = karta.createCard();
            karta.rotation.z = Math.PI;
            this.kartyAkcji.push(karta);
            stosKart.add(karta);
            karta.stos = true;
        }
        for (let x = 0; x < this.pola.length; x++) {
            let kamien = new Rock(this.pola[x].position.x, 0, this.pola[x].position.z);
            kamien = kamien.createRock();
            this.scene.add(kamien);
            this.pola[x].obj = kamien;
        }
        this.scene.add(stosKart);
        // this.potasuj(this.kartyAkcji, 10, 0);
        this.potasuj(this.kartyZolw, 10, 1);
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
                    this.zrzucenieKart(karty);
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
        if (!this.wylosowanaKarta) {
            let losowa = Math.floor(Math.random() * (this.kartyZolw.length - 1));
            let karta = this.kartyZolw[losowa];
            karta.rotation.x = Math.PI;
            karta.rotation.y = Math.PI;
            new TWEEN.Tween(karta.position)
                .to({ x: 340, y: -2 }, 1000)
                .easing(TWEEN.Easing.Linear.None)
                .onComplete(() => {
                    this.zrzucenieKart(this.kartyZolw);
                })
                .start()
            player.kolor = karta.kolor;
            console.log(player.kolor);
            this.wylosowanaKarta = true;
        }
    }
    myRaycast = () => {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        document.addEventListener("click", () => {
            mouseVector.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouseVector.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.setFromCamera(mouseVector, this.camera);
            const intersects = raycaster.intersectObjects(this.scene.children, true);
            if (intersects.length > 0) {
                let obj = intersects[0].object;
                if (obj.stos) {
                    console.log(obj);
                    this.WybranieKart(this.kartyAkcji);
                }
                else if (obj.player && !this.kolorkiClicked) {
                    this.karta = obj;
                    this.RzutKarty(obj);
                }
                else if (obj.wybory) {
                    this.WyborKoloruKarty(obj);
                }
            }
        });
    }
    zrzucenieKart = (karty) => {
        let startPosy = -4;
        for (let x = 0; x < karty.length - 1; x++) {
            karty[x].position.y = startPosy + x;
        }
        karty[karty.length - 1].position.y = karty.length - 5;
    }
    WybranieKart = (karty) => {
        let ilosc = 5;
        let posx = -114 + (player.cards.length * 57);
        if (player.cards.length <= 5) {
            ilosc = ilosc - player.cards.length;
            for (let x = 0; x < ilosc; x++) {
                let losowa = Math.floor(Math.random() * (karty.length - 1));
                console.log(karty[losowa]);
                new TWEEN.Tween(karty[losowa].position)
                    .to({ x: this.carsdPosition.x + posx, y: this.carsdPosition.y - 220, z: this.carsdPosition.z - 200 }, 1000)
                    .easing(TWEEN.Easing.Linear.None)
                    .onComplete(() => {
                        this.zrzucenieKart(this.kartyZolw);
                    })
                    .start()
                karty[losowa].rotation.y = Math.PI;
                karty[losowa].rotation.x = -Math.PI / 2;
                karty[losowa].stos = false;
                karty[losowa].player = true;
                player.cards.push(karty[losowa]);
                karty.splice(losowa, 1);
                posx += 57;
            }
        }
        this.zrzucenieKart(karty);
    }
    RzutKarty = async (karta) => {
        let zolw;
        for (let x = 0; x < this.zolwie.length; x++) {
            if (this.zolwie[x].kolor == karta.typ.kolor) {
                zolw = this.zolwie[x];
            }
        }
        if (zolw) {
            if (zolw.pole + karta.typ.znak >= 10) {
                console.log("Koniec gry");
            }
            else if (zolw.pole + karta.typ.znak >= 0) {
                if (!this.pola[zolw.pole] || this.pola[zolw.pole].tortoises.length == 1 || (this.pola[zolw.pole].tortoises.length > 1 && this.pola[zolw.pole].tortoises.indexOf(zolw) == this.pola[zolw.pole].tortoises.length - 1) || karta.typ.onlyOne) {
                    await this.WyrzucenieKarty(karta);
                    this.JedenZolw(zolw, karta);
                }
                else {
                    await this.WyrzucenieKarty(karta);
                    this.WieleZolwi(zolw, karta);
                }
            }
        }
        else {
            this.kolorkiClicked = true;
            let wybory = new Wybor(karta.position.x, karta.position.y + 60, karta.position.z, this.colors);
            wybory = await wybory.createWybor();
            this.scene.add(wybory);
        }
    }
    JedenZolw = (zolw, karta) => {
        console.log(this.pola[zolw.pole]);
        if (karta.typ.onlyOne) {
            this.zrzucenieZolwiow(this.pola[zolw.pole].tortoises, this.pola[zolw.pole].tortoises.indexOf(zolw));
        }
        if (this.pola[zolw.pole])
            this.pola[zolw.pole].tortoises.splice(this.pola[zolw.pole].tortoises.indexOf(zolw), 1);
        zolw.pole += karta.typ.znak;
        this.pola[zolw.pole].tortoises.push(zolw);
        zolw.position.x = this.pola[zolw.pole].position.x;
        zolw.position.y = 10 + (this.pola[zolw.pole].tortoises.length - 1) * 10;
        zolw.position.z = this.pola[zolw.pole].position.z;
    }
    WieleZolwi = (zolw, karta) => {
        let transport = [];
        let przed = zolw.pole;
        for (let x = this.pola[zolw.pole].tortoises.indexOf(zolw); x < this.pola[zolw.pole].tortoises.length; x++) {
            transport.push(this.pola[przed].tortoises[x]);
            this.pola[zolw.pole].tortoises[x].position.x = this.pola[zolw.pole + karta.typ.znak].position.x;
            console.log(this.pola[zolw.pole + karta.typ.znak].tortoises.length);
            if (this.pola[zolw.pole + karta.typ.znak].tortoises.length != 0)
                this.pola[zolw.pole].tortoises[x].position.y = 10 + (this.pola[zolw.pole + karta.typ.znak].tortoises.length * 10) + (x * 10);
            else {
                this.pola[zolw.pole].tortoises[x].position.y = 10 + (transport.indexOf(this.pola[zolw.pole].tortoises[x]) * 10);
            }
            this.pola[zolw.pole].tortoises[x].position.z = this.pola[zolw.pole + karta.typ.znak].position.z;
        }
        console.log(transport);
        for (let x = 0; x < transport.length; x++) {
            let zolw = transport[x];
            if (this.pola[zolw.pole])
                this.pola[zolw.pole].tortoises.splice(this.pola[zolw.pole].tortoises.indexOf(zolw), 1);
            zolw.pole += karta.typ.znak;
            this.pola[zolw.pole].tortoises.push(zolw);
        }
    }
    WyrzucenieKarty = async (karta) => {
        return new Promise((resolve, reject) => {
            try {
                let stosKart = { x: 200, y: this.rzuconeKarty.length, z: 200 }
                new TWEEN.Tween(karta.position)
                    .to({ x: stosKart.x, y: stosKart.y, z: stosKart.z }, 500)
                    .onComplete(() => {
                        this.zrzucenieKart(this.kartyZolw);
                        this.rzuconeKarty.push(karta);
                        let numerKarty = player.cards.indexOf(karta);
                        player.cards[numerKarty].player = false;
                        player.cards.splice(numerKarty, 1);
                        for (let x = numerKarty; x < player.cards.length; x++) {
                            player.cards[x].position.x -= 57;
                        }
                        new TWEEN.Tween(karta.rotation)
                            .to({ x: -Math.PI })
                            .onComplete(() => {
                                resolve("koniec");
                                this.WybranieKart(this.kartyAkcji);
                            })
                            .start();
                    })
                    .start()
            }
            catch (error) {
                reject(error);
            }
        })
    }
    WyborKoloruKarty = async (obj) => {//naprawic wybor kolorow, gdy jest wiecej kart, zrobic wygrana oraz zrobic tasowanie kart gdy sie skoncza na stosie
        console.log(this.karta.typ);
        this.karta.typ.kolor = obj.kolor;
        for (let x = 0; x < this.wszystkieWybory.length; x++) {
            this.scene.remove(this.wszystkieWybory[x]);
        }
        if (this.karta.typ.znak == "starystary") {
            this.karta.typ.znak = 2;
            this.karta.typ.onlyOne = true;
        }
        else if (this.karta.typ.znak == "stary") {
            this.karta.typ.znak = 1;
            this.karta.typ.onlyOne = true;
        }
        this.kolorkiClicked = false;
        await this.RzutKarty(this.karta);
        console.log(this.kartyAkcji);
    }
    zrzucenieZolwiow = (zolwie, zolwWyrzucony) => {
        for (let x = zolwWyrzucony; x < zolwie.length; x++) {
            zolwie[x].position.y -= 10;
        }
    }
    GeneracjaKart = () => {
        for (let x = 0; x < this.teksturyKart.length; x++) {
            let obj = {};
            if (this.teksturyKart[x].search(/.*Niebieski.*/) != -1) {
                obj.kolor = "niebieski";
            }
            else if (this.teksturyKart[x].search(/.*Czerwony.*/) != -1) {
                obj.kolor = "czerwony";
            }
            else if (this.teksturyKart[x].search(/.*Fioletowy.*/) != -1) {
                obj.kolor = "fioletowy";
            }
            else if (this.teksturyKart[x].search(/.*Zolty.*/) != -1) {
                obj.kolor = "zolty";
            }
            else if (this.teksturyKart[x].search(/.*Zielony.*/) != -1) {
                obj.kolor = "zielony";
            }
            else {
                obj.kolor = "kolorowy";
            }
            if (this.teksturyKart[x].search(/.*PlusPlus.*/) != -1) {
                for (let y = 0; y < this.ilosciKart.plusplus; y++) {
                    obj.znak = 2;
                    obj.sciezka = this.teksturyKart[x];
                    this.kartyInfo.push(obj);
                }
            }
            else if (this.teksturyKart[x].search(/.*Plus.*/) != -1) {
                for (let y = 0; y < this.ilosciKart.plus; y++) {
                    obj.znak = 1;
                    obj.sciezka = this.teksturyKart[x];
                    this.kartyInfo.push(obj);
                }
            }
            else if (this.teksturyKart[x].search(/.*Minus.*/) != -1) {
                for (let y = 0; y < this.ilosciKart.minus; y++) {
                    obj.znak = -1;
                    obj.sciezka = this.teksturyKart[x];
                    this.kartyInfo.push(obj);
                }
            }
            else if (this.teksturyKart[x].search(/.*StaryStary.*/) != -1) {
                for (let y = 0; y < this.ilosciKart.starystary; y++) {
                    obj.znak = "starystary";
                    obj.sciezka = this.teksturyKart[x];
                    this.kartyInfo.push(obj);
                }
            }
            else if (this.teksturyKart[x].search(/.*Stary.*/) != -1) {
                for (let y = 0; y < this.ilosciKart.stary; y++) {
                    obj.znak = "stary";
                    obj.sciezka = this.teksturyKart[x];
                    this.kartyInfo.push(obj);
                }
            }
        }
    }
}