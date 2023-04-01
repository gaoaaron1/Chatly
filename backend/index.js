const axios = require("axios");

//import express to run http server
const express = require("express");

//calls server from other origin 
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  //Chat Engine Database
  try {
    const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "private-key": "2e9c6f7b-c58c-437a-adf8-32ebf4ce7c3b" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.listen(3001);