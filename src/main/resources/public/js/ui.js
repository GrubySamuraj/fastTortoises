class Ui {
    constructor() {

    }
    usunOkienko = async () => {
        return new Promise((resolve, reject) => {
            try {
                let div = document.getElementById("menu");
                div.remove();
                console.log("dupsztal");
                resolve("aaa");
            }
            catch (err) {
                reject(err);
            }
        })
    }
    register = () => {

    }
}