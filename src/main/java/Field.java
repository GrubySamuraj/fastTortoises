import java.util.ArrayList;

public class Field {
    ArrayList<Turtle> turtles = new ArrayList<Turtle>();
    int number;
    public Field(ArrayList<Turtle> turtles, int number){
        this.turtles = turtles;
        this.number = number;
    }

    @Override
    public String toString() {
        return "Field{" +
                "turtles=" + turtles +
                ", number=" + number +
                '}';
    }
}
