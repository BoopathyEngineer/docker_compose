
import express from "express";
import cors from "cors";
import records from "./routes/record.js";

const PORT = process.env.PORT || 5050;
const app = express();

// CORS options
const corsOptions = {
  origin: '*', // Allow all origins. Change '*' to specific domains to restrict access.
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the headers you want to allow
  credentials: true, // Set to true if your server supports credentials (cookies, authorization headers)
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
