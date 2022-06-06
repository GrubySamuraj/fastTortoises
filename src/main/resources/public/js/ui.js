class Ui {
    constructor() {
        document.getElementById("poczekalnia").addEventListener("click", this.poczekalniaResolve);
    }
    usunOkienko = async () => {
        return new Promise((resolve, reject) => {
            try {
                let div = document.getElementById("menu");
                div.remove();
                resolve("aaa");
            }
            catch (err) {
                reject(err);
            }
        })
    }
    register = () => {

    }
    poczekalniaResolve = async () => {
        if (!document.getElementById("ludzie")) {
            let body = document.getElementsByTagName("body")[0];
            let div = document.createElement("div");
            let ludzie = await router.getLudzie();
            for (let x = 0; x < ludzie.length; x++) {
                let div2 = document.createElement("div");
                div2.classList.add("ludz");
                div2.innerHTML = ludzie[x].login;
                //kto ma turę aktualnie
                div.appendChild(div2);
            }
            body.appendChild(div);
            div.setAttribute("id", "ludzie");
        }
        else {
            document.getElementById("ludzie").remove();
        }
    }
}