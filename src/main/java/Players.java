import java.util.ArrayList;

public class Players {
    static int nextId;
    static ArrayList<Player> players = new ArrayList<Player>();
    public static Player addPlayer(String color){
        Player player = new Player(nextId, color);
        players.add(player);
        nextId++;
        return(player);
    }
}
