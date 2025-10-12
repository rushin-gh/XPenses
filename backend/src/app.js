const express = require("express");
const { MongoClient } = require("mongodb");
const config = require("./Data/config");
const getCollectionConnection = require("./Database/DbConnection");

const app = express();
app.use(express.json());

app.listen(config.APP_PORT, () => {
  console.log("Server is UP...");
  console.log("Listening on ", config.APP_PORT);
});

app.post("/expense", async (req, res) => {
  try {
    let conn = await getCollectionConnection("Expenses");
    const result = await conn.insertOne(req.body);
    res.status(201).send(result);
  } catch (err) {
    const errObj = {
      name: err.name,
      message: err.message,
      code: err.code,
      codeName: err.codeName,
      stack: err.stack,
      cause: err.cause,
    };

    res.status(500).send(errObj);
  }
});

app.use((req, res) => {
  res.send("Server is running successfully...");
});
