import java.util.ArrayList;

public class GetStart {
    Player player;
    ArrayList<Card> cards;
    boolean status;
    public GetStart(boolean status, Player player, ArrayList<Card> cards){
        this.player = player;
        this.cards = cards;
        this.status = status;
    }
}
