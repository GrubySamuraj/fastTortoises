import java.util.ArrayList;

public class Moves {
    public static ArrayList<Field> board = new ArrayList<Field>();
    public static void createBoard(){
        ArrayList<Turtle> turtlesList = new ArrayList<Turtle>();
        ArrayList<String> colorsList = new ArrayList<String>();
        colorsList.add("RED");
        colorsList.add("GREEN");
        colorsList.add("BLUE");
        colorsList.add("PURPLE");
        colorsList.add("YELLOW");
        for (int i = 0; i < colorsList.size(); i++){
            turtlesList.add(new Turtle(colorsList.get(i), 0));
        }
        Field field1 = new Field(turtlesList, 0);
        board.add(field1);
        for (int i = 1; i <= 10; i++){
            board.add(new Field(new ArrayList<Turtle>(), i));
        }
        System.out.println(board);
    }
    public static void move(String color, String action) {
        if (action.equals("^")) {
            move("RED", "+");
            move("GREEN", "+");
            move("BLUE", "+");
            move("PURPLE", "+");
            move("YELLOW", "+");
        } else {
            int index = -1;
            String colorToMove = "";
            for (int i = 0; i < board.size(); i++) {
                ArrayList<Turtle> turtles = board.get(i).turtles;
                int position = 9;
                for (int j = 0; j < turtles.size(); j++) {
                    if (turtles.get(j).color.equals(color)) {
                        position = turtles.get(j).position;
                        index = board.get(i).number;
                        turtles.remove(j);
                    }
                }
                for (int j = 0; j < turtles.size(); j++) {
                    if (turtles.get(j).position == position + 1) {
                        colorToMove = turtles.get(j).color;
                    }
                }
            }
            switch (action) {
                case "+":
                    if (index <= 9) index++;
                    break;
                case "++":
                    if (index <= 8) index += 2;
                    break;
                case "-":
                    if (index > 1 && index != 10) index--;
                    break;
            }
            for (int i = 0; i < board.size(); i++) {
                if (board.get(i).number == index) {
                    int max = -1;
                    for (int j = 0; j < board.get(i).turtles.size(); j++) {
                        if (board.get(i).turtles.get(j).position > max) {
                            max = board.get(i).turtles.get(j).position;
                        }
                    }
                    Turtle turtle = new Turtle(color, max + 1);
                    board.get(i).turtles.add(turtle);
                }
            }
            if (colorToMove != "") {
                move(colorToMove, action);
            }
            System.out.println(board);
        }
    }
}