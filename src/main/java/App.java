import static spark.Spark.port;
import static spark.Spark.*;

public class App {
    public static void main(String[] args) {
        staticFiles.location("/public");
        port(3000);
        get("/test", (req, res) -> "test");
    }
}
