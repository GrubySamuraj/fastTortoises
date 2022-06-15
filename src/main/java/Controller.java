import com.google.gson.Gson;
import spark.Request;

import java.util.ArrayList;

public class Controller {
    static ArrayList<String> loggedIn = new ArrayList<String>();
    static Cards cards = new Cards();
    static boolean isStarted = false;
    static int turn;
    static Gson gson = new Gson();
    public String start(Request req){
        turn = 0;
        isStarted = true;
        return("");
    }
    public static String getStart(){
        ArrayList<Card> cardList = new ArrayList<Card>();
        String color;
        color = cards.drawTurtle();
        if (color == null) {
            GetStart res = new GetStart(false, null, null);
            return(gson.toJson(res, GetStart.class));
        }
        Player player = Players.addPlayer(color);
        for (int i = 0; i < 5; i++){
            Card card = cards.drawCard();
            cardList.add(card);
        }
        GetStart res = new GetStart(!isStarted, player, cardList);
        return(gson.toJson(res, GetStart.class));
    }

    public String postMove(Request req) {
        if(turn < loggedIn.size() - 1) {
            turn++;
        }
        else{
            turn = 0;
        }
        Card droppedCard = gson.fromJson(req.body(), Card.class);
        Moves.move(droppedCard.color, droppedCard.action);
        Card card = cards.drawCard();
        return gson.toJson(card, Card.class);
    }
    public String getMove(){
        ArrayList<Field> board = Moves.board;
        ResGetMove res = new ResGetMove(turn, board, cards.cards.size(), loggedIn, isStarted);
        System.out.println(res);
        return gson.toJson(res, ResGetMove.class);
    }

    public boolean register(Request req) {
        User user = gson.fromJson(req.body(), User.class);
        boolean check = !Mongo.findUser(user.nick);
        if (check) Mongo.safeUser(user.nick, user.password);
        return check;
    }

    public boolean login(Request req) {
        User user = gson.fromJson(req.body(), User.class);
        boolean check = Mongo.findUser(user.nick);
        boolean checkPass = false;
        boolean checkIsLoggedIn = false;
        if (loggedIn != null) {
            for (int i = 0; i < loggedIn.size(); i++) {
                if (loggedIn.get(i).equals(user.nick)) checkIsLoggedIn = true;
            }
        }
        if (check && !checkIsLoggedIn) checkPass = Mongo.checkPass(user.nick, user.password);
        if (checkPass) loggedIn.add(user.nick);
        return checkPass;
    }

    public boolean addPoint(Request req) {
        boolean check = login(req);
        if (check){
            User user = gson.fromJson(req.body(), User.class);
            Mongo.addPoint(user.nick);
        }
        return check;
    }

    public int getPoints(Request req) {
        int points = -1;
        if (login(req)){
            User user = gson.fromJson(req.body(), User.class);
            points = Mongo.getPoint(user.nick);
        }
        return points;
    }
}
