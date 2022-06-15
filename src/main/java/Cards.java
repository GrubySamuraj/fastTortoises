import java.util.ArrayList;

public class Cards {
    public static ArrayList<String> turtlesList;
    public static ArrayList<String> colorsList;
    public static ArrayList<String> actionsList;
    public static ArrayList<Card> cards;

    public Cards() {
        turtlesList = new ArrayList<String>();
        turtlesList.add("RED");
        turtlesList.add("GREEN");
        turtlesList.add("BLUE");
        turtlesList.add("PURPLE");
        turtlesList.add("YELLOW");

        colorsList = new ArrayList<String>();
        colorsList.add("RED");
        colorsList.add("GREEN");
        colorsList.add("BLUE");
        colorsList.add("PURPLE");
        colorsList.add("YELLOW");
        colorsList.add("ALL");

        actionsList = new ArrayList<String>();
        actionsList.add("+");
        actionsList.add("++");
        actionsList.add("-");
        actionsList.add("^");

        cards = new ArrayList<Card>();
        rollCards();
    }
    public static String drawTurtle(){
        if (turtlesList.size() > 0) {
            String turtle;
            int rand = (int) (Math.random() * turtlesList.size());
            turtle = turtlesList.get(rand);
            turtlesList.remove(rand);
            return (turtle);
        }
        else return (null);
    }
    public static Card drawCard(){
        if (cards.size() > 0) {
            Card card;
            int rand = (int) (Math.random() * cards.size());
            card = cards.get(rand);
            cards.remove(rand);
            return (card);
        }else {
            rollCards();
            return (drawCard());
        }
    }
    public static void rollCards(){
        for (int m = 0; m < 4; m++) {
            for (int i = 0; i < colorsList.size(); i++) {
                for (int j = 0; j < actionsList.size(); j++) {
                    if (colorsList.get(i).equals("ALL") || !actionsList.get(j).equals("^")) {
                        if (!(colorsList.get(i).equals("ALL") && actionsList.get(j).equals("++"))) {
                            Card card = new Card(colorsList.get(i), actionsList.get(j));
                            cards.add(card);
                        }
                    }
                }
            }
        }
    }
}
