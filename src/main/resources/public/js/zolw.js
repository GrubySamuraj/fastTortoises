import { STLLoader } from 'https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three@0.120.1/examples/jsm/loaders/OBJLoader.js';
import { game } from "./main.js";
import * as THREE from './libs/three.module.js';
class Zolw extends THREE.Mesh {
    constructor(texture, id, gracz, positionx, positiony, positionz) {
        super();
        this.texture = texture;
        this._id = id;
        this.gracz = gracz;
        this.positionx = positionx;
        this.positiony = positiony;
        this.positionz = positionz;
    }
    createZolw = async () => {
        return new Promise((resolve, reject) => {
            try {
                let object;
                const loader = new OBJLoader();
                // let mesh;
                // const material = new THREE.MeshBasicMaterial({
                //     color: 0xffffff,
                //     side: THREE.DoubleSide,
                //     map: new THREE.TextureLoader().load("./img/textures/" + this.texture)
                // });
                loader.load('./img/textures/zolw3.obj', function (obj) {
                    object = obj;
                    // resolve(obj)
                },
                    (xhr) => {
                        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                    },
                    (error) => {
                        console.log(error)
                    });
                // resolve(object)
            }
            catch (err) {
                reject(err);
            }
        })
        // const geometry = new THREE.BoxGeometry(70, 10, 70);
        // const cube = new THREE.Mesh(geometry, material);
        // return cube;
    }
}
export { Zolw };