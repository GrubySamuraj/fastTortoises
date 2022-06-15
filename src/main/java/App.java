import static spark.Spark.*;
class App {
    public static void main(String[] args) {
        Controller controller = new Controller();
        Moves.createBoard();
        staticFiles.location("/public");
        port(getHerokuPort());
        get("/start", (req, res) -> controller.getStart());
        post("/start", (req, res) -> controller.start(req));
        post("/move", (req, res) -> controller.postMove(req));
        get("/move", (req, res) -> controller.getMove());
        post("/register", (req, res) -> controller.register(req));
        post("/login", (req, res) -> controller.login(req));
        patch("/points", (req, res) -> controller.addPoint(req));
        post("/points", (req, res) -> controller.getPoints(req));
    }
    static int getHerokuPort() {
        ProcessBuilder processBuilder = new ProcessBuilder();
        if (processBuilder.environment().get("PORT") != null) {
            return Integer.parseInt(processBuilder.environment().get("PORT"));
        }
        return 3000;
    }
}