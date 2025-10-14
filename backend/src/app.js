const express = require("express");
const { MongoClient, Collection } = require("mongodb");
const config = require("./Data/config");
const getCollectionConnection = require("./Database/DbConnection");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(config.APP_PORT, () => {
  console.log("Server is UP...");
  console.log("Listening on ", config.APP_PORT);
});

app.post("/expense", async (req, res) => {
  try {
    await addExpense(req.body);
    res.status(201).send(await getExpenses({}));
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

app.get("/expenses", async (req, res) => {
  try {
    const expenses = await getExpenses({});
    res.status(200).send(expenses);
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

const getExpenses = async (search = {}) => {
  let conn = await getCollectionConnection("Expenses");
  const documents = await conn.find(search).toArray();
  return documents;
};

const addExpense = async (expense) => {
  let conn = await getCollectionConnection("Expenses");
  const result = await conn.insertOne(expense);
};

app.use("/ping", (req, res) => {
  res.send("Server is running successfully...");
});
