public class Card {
    String color;
    String action;
    public Card(String color, String action){
        this.color = color;
        this.action = action;
    }

    @Override
    public String toString() {
        return "Card{" +
                "color='" + color + '\'' +
                ", action='" + action + '\'' +
                '}';
    }
}
