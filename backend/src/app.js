const express = require("express");
const { port } = require("./Data/constants");

const app = express();
app.listen(port, () => {
  console.log("Server is UP...");
  console.log("Listening on ", port);
});

app.use((req, res) => {
  res.send("Basic node setup is done");
});
