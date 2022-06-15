class Router {
    constructor() {
        this.user = [];
        this.startData;
        this.pole;
        this.turn = 0;
    }
    login = async () => {
        let login = document.getElementById("login").value;
        let haslo = document.getElementById("password").value;
        player.password = haslo;
        let json = await this.fetchPostAsync(login, haslo);
        console.log(json);
        if (json) {
            console.log("Udało sie zalogować");
            player.nick = login;
            ui.waitingForOther();
        }
        else {
            alert("Dany gracz nie istnieje lub hasło jest niepoprawne!");
        }
    }
    registerClick = async () => {
        let login = document.getElementById("loginRegister").value;
        let haslo = document.getElementById("hasloRegister").value;
        let powtHaslo = document.getElementById("powthasloRegister").value;
        if (haslo == powtHaslo) {
            let cos = await this.register(login, haslo);
            if (cos) {
                alert("Udało się zarejestrować, teraz możesz się zalogować!");
            }
            else {
                alert("Taki user już istnieje!");
            }
        }
        else {
            alert("Hasła się nie zgadzają!");
        }
    }
    register = async (login, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = JSON.stringify({
                    nick: login,
                    password: password
                })

                const options = {
                    method: "POST",
                    body: data,
                };

                let response = await fetch("/register", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    fetchPostAsync = async (login, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = JSON.stringify({
                    nick: login,
                    password: password
                });

                const options = {
                    method: "POST",
                    body: data,
                };

                let response = await fetch("/login", options)

                if (!response.ok)
                    resolve(response.status)
                else
                    resolve(await response.json());
            }
            catch (err) {
                reject(err);
            }
        });
    }
    init = async () => {
        this.pole = ui.info.board;
        player.id = ui.users.indexOf(player.nick);
        if (ui.info.turn == player.id) {
            if (document.getElementById("wait"))
                document.getElementById("wait").remove();
            this.startData = await this.start();
            console.log(this.startData);
            await ui.usunOkienko();
            game.createElements();
            await game.createKarty();
            game.myRaycast();
            game.WybranieKart(this.startData.cards);
        }
        else {
            if (document.getElementById("wait"))
                document.getElementById("wait").remove();
            this.startData = await this.start();
            console.log(this.startData);
            await ui.usunOkienko();
            game.createElements();
            await game.createKarty();
            game.myRaycast();
            game.WybranieKart(this.startData.cards);
            this.waiting();
        }
    }
    getLudzie = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "GET",
                };

                let response = await fetch("/move", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    waiting = async () => {
        let div = document.createElement("div");
        div.setAttribute("id", "wait");
        div.innerText = "Oczekiwanie na ruch gracza...";
        let img = document.createElement("img");
        img.setAttribute("src", "./img/wait.gif");
        div.appendChild(img);
        document.body.appendChild(div);
        this.interwal = window.setInterval(async () => {
            let pole = await this.getMove();
            console.log(pole);
            if (pole.turn == player.id) {
                window.clearInterval(this.interwal);
                let wait = document.getElementById("wait");
                if (wait)
                    wait.remove();
                game.generowanieZolwi(pole.board);
            }
        }, 1000);
    }
    move = async (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify(data)
                };

                let response = await fetch("/move", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    getMove = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "GET"
                };

                let response = await fetch("/move", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    start = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "GET",
                };

                let response = await fetch("/start", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    startGet = async () => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify(player.id)
                };

                let response = await fetch("/start", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.text());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    addPoint = async (nick, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "PATCH",
                    body: JSON.stringify({
                        nick: nick,
                        password: password
                    })
                };

                let response = await fetch("/points", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
    checkPoint = async (nick, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const options = {
                    method: "POST",
                    body: JSON.stringify({
                        nick: nick,
                        password: password
                    })
                };

                let response = await fetch("/points", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
}