import com.mongodb.*;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.result.*;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.bson.types.ObjectId;

import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;

import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Updates.*;
public class Mongo {
    static MongoClient client = MongoClients.create("mongodb+srv://root:fridge12@cluster0.8h7yd.mongodb.net/?retryWrites=true&w=majority");
    static MongoDatabase database = client.getDatabase("turtles");
    public static void safeUser(String nick, String password) {
        MongoCollection<Document> users = database.getCollection("users");
        Document user = new Document("nick", nick).append("password", password).append("points", 0);
        users.insertOne(user);
    }
    public static boolean findUser(String nick){
        MongoCollection<Document> users = database.getCollection("users");
        Document user = users.find(new Document("nick", nick)).first();
        return (user != null);
    }

    public static boolean checkPass(String nick, String password) {
        MongoCollection<Document> users = database.getCollection("users");
        Document user = users.find(new Document("nick", nick)).first();
        return (password.equals(user.get("password")));
    }

    public static void addPoint(String nick) {
        MongoCollection<Document> users = database.getCollection("users");
        Document user = users.find(new Document("nick", nick)).first();
        int points = (int) user.get("points");
        points++;
        Bson newValue = new Document("points", points);
        Bson operation = new Document("$set", newValue);
        users.updateOne(user, operation);
    }

    public static int getPoint(String nick) {
        MongoCollection<Document> users = database.getCollection("users");
        Document user = users.find(new Document("nick", nick)).first();
        int points = (int) user.get("points");
        return points;
    }
}
