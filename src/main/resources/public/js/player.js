class Player {
    constructor(nick, kolor, admin) {
        this.nick = nick;
        this.perspective = 0;
        this.kolor = kolor;
        this.admin = admin;
        this.perspectives = [{ x: 0, y: 600, z: 1000 }, { x: 0, y: 1300, z: 0 }, { x: 0, y: 600, z: -1000 }];
    }
    changePerspective = () => {
        if (this.perspective < this.perspectives.length - 1)
            this.perspective++;
        else
            this.perspective = 0;
        game.position.set(this.perspectives[this.perspective].x, this.perspectives[this.perspective].y, this.perspectives[this.perspective].z)
        game.camera.lookAt(game.scene);
    }
}