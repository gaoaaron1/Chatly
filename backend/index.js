//No longer NEED
const axios = require("axios");

//import express to run http server
const express = require("express");

//calls server from other origin 
const cors = require("cors");

const { MongoClient } = require("mongodb");


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

//MONGODB
const mongoURL = "mongodb://127.0.0.1:27017/chatly";
const mongoClient = new MongoClient(mongoURL);


app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    //Connect to the database
    await mongoClient.connect();

    //Insert the user into the "users" collection
    const result = await mongoClient
      .db()
      .collection("users")
      .insertOne({ username: username });
    
    //Return the inserted user document
    return res.status(200).json(result.ops);


  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await mongoClient.close();
  }
});

const port = process.env.PORT || 3001;

//Print out on console the port it is running on 
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});