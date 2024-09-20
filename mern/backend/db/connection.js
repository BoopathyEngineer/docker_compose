import { MongoClient, ServerApiVersion } from "mongodb";

const URI = "mongodb://mongodb:27017/mydatabase"; // Use the container name
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    return client.db("employees"); // Adjust as needed
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err; // Rethrow the error for handling in your routes
  }
};

export default connectDB;
