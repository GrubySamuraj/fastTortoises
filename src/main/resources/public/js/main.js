import { Router } from "./router.js";
import { Game } from "./game.js";
import { Ui } from "./ui.js";
let game;
let router;
let ui;
function mainfun() {
    router = new Router();
    game = new Game();
    ui = new Ui();
}
export { game, router, ui }
mainfun();