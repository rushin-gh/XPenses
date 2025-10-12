const { MongoClient } = require("mongodb");
const config = require("../Data/config");

async function getCollectionConnection(collectionName) {
  let connection;
  try {
    const client = new MongoClient(config.MONGODB_CONNECTIONSTRING);
    await client.connect();
    const db = client.db("XPensesDB");
    connection = db.collection(collectionName);
  } catch (err) {
    console.log(err);
  }
  return connection;
}

module.exports = getCollectionConnection;
