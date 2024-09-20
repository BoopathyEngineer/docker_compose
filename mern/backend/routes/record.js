import express from "express";
import connectDB from "../db/connection.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Middleware to establish DB connection before routes
router.use(async (req, res, next) => {
  try {
    req.db = await connectDB(); // Attaching the db instance to the request object
    next();
  } catch (err) {
    res.status(500).send("Database connection failed");
  }
});

// Get all records
router.get("/", async (req, res) => {
  try {
    const collection = req.db.collection("records");
    const results = await collection.find({}).toArray();
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching records");
  }
});

// Get a single record by ID
router.get("/:id", async (req, res) => {
  try {
    const collection = req.db.collection("records");
    const query = { _id: new ObjectId(req.params.id) };
    const result = await collection.findOne(query);

    if (!result) res.status(404).send("Not found");
    else res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching record");
  }
});

// Create a new record
router.post("/", async (req, res) => {
  try {
    const newDocument = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };

    const collection = req.db.collection("records");
    const result = await collection.insertOne(newDocument);
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// Update a record by ID
router.patch("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const updates = {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
      },
    };

    const collection = req.db.collection("records");
    const result = await collection.updateOne(query, updates);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// Delete a record by ID
router.delete("/:id", async (req, res) => {
  try {
    const query = { _id: new ObjectId(req.params.id) };
    const collection = req.db.collection("records");
    const result = await collection.deleteOne(query);
    res.status(200).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;
