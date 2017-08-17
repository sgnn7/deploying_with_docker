'use strict'

const bodyParser = require('body-parser')
const express = require('express');
const mongo = require('mongodb')

const DB_NAME = 'word_database';
const DB_HOST = process.env.DB_HOST || 'localhost:27017';
const COLLECTION_NAME = 'words';
const SERVER_PORT = 8000;

const app = express();
const db = mongo.MongoClient();
const dbUri = `mongodb://${DB_HOST}/${DB_NAME}`;
const words = [];

app.set('view engine', 'pug')
app.use(bodyParser.urlencoded({ extended: false }))

function loadWords(callback) {
    db.connect(dbUri, (err, db) => {
        if (err) {
            throw err;
        }

        db.collection(COLLECTION_NAME).find({})
                                      .toArray((err, docs) => {
            words.push.apply(words, docs.map(doc => doc.word));
            callback();
        });
    });
}

app.get('/', (req, res) => {
    res.render('index', { words: words });
});

app.post('/new', (req, res) => {
    const word = req.body.word;

    console.info(`Got word: ${word}`);
    if (word) {
        db.connect(dbUri, (err, db) => {
            if (err) {
                throw err;
            }

            db.collection(COLLECTION_NAME).insertOne({ word } ,() => {
                db.close();
                words.push(word);
            });
        });
    }

    res.redirect('/');
});

loadWords(() => {
    console.info("Data loaded from database");
    app.listen(SERVER_PORT, () => {
        console.info("Server started on port %d...", SERVER_PORT);
    });
});
