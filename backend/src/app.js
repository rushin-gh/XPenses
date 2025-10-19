const cors = require("cors");
const ConnectDatabase = require('./Database/database.js');
const express = require("express");
const { GetExpense, GetExpenses, AddExpense, DeleteExpense, UpdateExpense } = require('./Controller/expense.js');

const app = express();
app.use(express.json());
app.use(cors());

ConnectDatabase()
  .then(() => {
    console.log('Database connection established successfully...')
    app.listen(3000, (err) => {
      if (err) {
        throw new Error('Error while starting server.');
      } else {
        console.log(`Server is UP and listening on port ${3000}.`);
      }
    });
  })
  .catch((err) => {
    console.log('Error while connecting to database : ' + err.message);
  });

app.get("/ping", async (req, res) => {
  res.send("Server is running successfully...");
});

app.get("/expense/:id", GetExpense);
app.get("/expenses", GetExpenses);
app.post("/expense", AddExpense);
app.delete("/expense/:id", DeleteExpense);
app.patch("/expense/:id", UpdateExpense);

// @TODO - Add error handling middleware
app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send("Internal server error.");
  }
})