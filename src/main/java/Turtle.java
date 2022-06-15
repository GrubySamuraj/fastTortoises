public class Turtle {
    String color;
    int position;
    public Turtle(String color, int position){
        this.color = color;
        this.position = position;
    }

    @Override
    public String toString() {
        return "Turtle{" +
                "color='" + color + '\'' +
                ", position=" + position +
                '}';
    }
}
