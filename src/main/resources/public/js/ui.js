class Ui {
    constructor() {
        document.getElementById("poczekalnia").addEventListener("click", this.poczekalniaResolve);
        document.getElementById("rejestracja").addEventListener("click", this.okienkoRegister);
        document.getElementById("profil").addEventListener("click", router.checkPoint);
        this.info = [];
        this.users = [];
    }
    usunOkienko = async () => {
        return new Promise((resolve, reject) => {
            try {
                if (document.getElementById("menu")) {
                    let div = document.getElementById("menu");
                    div.remove();
                }
                resolve("aaa");
            }
            catch (err) {
                reject(err);
            }
        })
    }
    poczekalniaResolve = async () => {
        if (!document.getElementById("ludzie")) {
            let body = document.getElementsByTagName("body")[0];
            let div = document.createElement("div");
            for (let x = 0; x < this.users.length; x++) {
                let div2 = document.createElement("div");
                div2.classList.add("ludz");
                div2.innerHTML += this.users[x];
                div.appendChild(div2);
            }
            body.appendChild(div);
            div.setAttribute("id", "ludzie");
        }
        else {
            document.getElementById("ludzie").remove();
        }
    }
    okienkoRegister = () => {
        let menu = document.getElementById("menu");
        if (!document.getElementById("powrot")) {
            let div = document.createElement("div");
            div.setAttribute("id", "register");
            let login = document.createElement("input");
            login.setAttribute("id", "loginRegister");
            login.classList.add("register");
            login.setAttribute("type", "text");
            let haslo = document.createElement("input");
            haslo.setAttribute("id", "hasloRegister");
            haslo.classList.add("register");
            haslo.setAttribute("type", "password");
            let powhaslo = document.createElement("input");
            powhaslo.setAttribute("id", "powthasloRegister");
            powhaslo.classList.add("register");
            powhaslo.setAttribute("type", "password");
            let btn = document.createElement("button");
            btn.classList.add("btn");
            btn.innerText = "Zarejestruj";
            btn.addEventListener("click", router.registerClick);
            let powrot = document.createElement("a");
            powrot.setAttribute("href", "#");
            powrot.classList.add("powrot");
            powrot.innerText = "Powrot";
            powrot.addEventListener("click", this.Powrot);
            div.innerHTML += "Login:<br>";
            div.appendChild(login);
            div.innerHTML += "<br>Hasło:<br>";
            div.appendChild(haslo);
            div.innerHTML += "<br>Powtórz hasło: <br>";
            div.appendChild(powhaslo);
            div.appendChild(btn);
            div.appendChild(powrot);
            menu.appendChild(div);
        }
    }
    checkPoints = async () => {
        let points = await router.checkPoint(player.nick, player.password);
        if (!document.getElementById("profil1")) {
            let body = document.getElementsByTagName("body")[0];
            let div = document.createElement("div");
            div.innerHTML = "Profil</br>";
            div.innerHTML += "Nick: " + player.nick;
            div.innerHTML += "</br>Punkty: " + points;
            body.appendChild(div);
            div.setAttribute("id", "profil1");
        }
        else {
            document.getElementById("profil1").remove();
        }
    }
    waitingForOther = async () => {
        // dodać pobieranie z bazy userów
        let div = document.createElement("div");
        let menu = document.getElementById("menu");
        div.setAttribute("id", "wait");

        let img = document.createElement("img");
        img.setAttribute("src", "./img/wait.gif");
        img.setAttribute("alt", "w8");

        let btn = document.createElement("button");
        btn.addEventListener("click", router.startGet);
        btn.classList.add("btn");
        btn.setAttribute("id", "startGame");
        btn.innerHTML = "Rozpocznij";

        let userzy = document.createElement("div");
        userzy.setAttribute("id", "users1");

        menu.remove();
        div.innerHTML += "Oczekiwanie na innych graczy<br>";
        div.appendChild(img);
        div.innerHTML += "<br>Aktualni gracze: ";
        div.appendChild(userzy);
        div.innerHTML += "<br>";
        div.appendChild(btn);
        document.body.appendChild(div);
        userzy = document.getElementById("users1");
        console.log(this.info);
        this.interwal = window.setInterval(async () => {
            this.info = await router.getLudzie();
            this.users = this.info.loggedIn;
            userzy.innerHTML = "";
            for (let user of this.users) {
                userzy.innerHTML += user;
                if (user == player.nick) {
                    userzy.innerHTML += "<==";
                }
                userzy.innerHTML += "<br>";
            }
            if (this.info.status) {
                window.clearInterval(this.interwal);
                router.init();
            }
        }, 1000);
    }
    Powrot = () => {
        console.log("powrot");
        document.getElementById("register").remove();
    }
}