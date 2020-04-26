const express = require("express");
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017";
const dbName = "myproject";

const client = new MongoClient(url);

client.connect((err) => {
    if (err) return console.error("Error on connect to mongo: ", err);

    console.log("Connected correctly to mongo");

    const db = client.db(dbName);
    const collection = db.collection("documents");

    const app = express();
    const port = 3000;

    app.get("/", async (req, res) => {
        const documents = await collection.find().toArray();
        res.send(documents);
    });

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
});
