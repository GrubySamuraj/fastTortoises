
createCabbage = async (posX, posY, posZ) => {
    try {
        const loader = new THREE.GLTFLoader();
        loader.load('./img/textures/cabbage/scene.gltf', (gltf) => {
            gltf.scene.scale.set(0.5, 0.5, 0.5);
            gltf.scene.position.set(posX, posY, posZ);
            game.scene.add(gltf.scene);
        });
    }
    catch (err) {
        console.log(err)
    }
}
