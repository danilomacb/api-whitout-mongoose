const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

MongoClient("mongodb://localhost:27017").connect((err, client) => {
    if (err) return console.error("Error on connect to mongo: ", err);

    console.log("Connected correctly to mongo");

    const db = client.db("dbName");
    const collection = db.collection("collectionName");

    const app = express();
    app.use(bodyParser.json());

    app.get("/", async (req, res) => {
        const elements = await collection.find().toArray();
        res.send(elements);
    });

    app.post("/", async (req, res) => {
        await collection.insert(req.body);
        res.status(200).send();
    });

    app.listen(3000, () => console.log(`Example app listening at http://localhost:3000`));
});
