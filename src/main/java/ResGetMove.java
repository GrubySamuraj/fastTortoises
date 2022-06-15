import java.util.ArrayList;

public class ResGetMove {
    int turn;
    ArrayList<Field> board;
    int numberOfCards;
    ArrayList<String> loggedIn;
    boolean status;
    public ResGetMove(int turn, ArrayList<Field> board, int numberOfCards, ArrayList<String> loggedIn,boolean status){
        this.board = board;
        this.turn = turn;
        this.numberOfCards = numberOfCards;
        this.loggedIn = loggedIn;
        this.status = status;
    }

}
