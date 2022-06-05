class Router {
    constructor() {
        this.user = [];
    }
    login = async () => {
        let login = document.getElementById("login").value;
        let haslo = document.getElementById("password").value;
        let json = await this.fetchPostAsync(login, haslo);
        await ui.usunOkienko();
        game.createElements();
        game.myRaycast();
        console.log(json);
    }
    register = async () => {
        let rejestruj = document.getElementById("menu");
    }
    fetchPostAsync = async (login, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const data = JSON.stringify({
                    login: login,
                    password: password
                })

                const options = {
                    method: "POST",
                    body: data,
                };

                let response = await fetch("/user/login", options)

                if (!response.ok)
                    resolve(response.status)
                else {
                    await ui.usunOkienko();
                    game.myRaycast();
                    game.createElements();
                    resolve(await response.json());
                }
            }
            catch (err) {
                reject(err);
            }
        });
    }
}