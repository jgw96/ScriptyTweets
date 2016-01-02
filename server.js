"use strict";

const express = require('express');
const Twitter = require("twitter");

const app = express();

//serve my application
app.use(express.static('public'));

//twitter stuff
const client = new Twitter({
    consumer_key: "61wN6i7cBgAz0OrWpfFqinzxV",
    consumer_secret: "UtC0ufSxrSrtlgBqDfW80N7fkfCNM0NHaQwG0hwnwEDerGKBP1",
    access_token_key: "3342117765-2KhNfZrCXa48cW5MrWJOJFlBeUjwDWE2B0LCNXA",
    access_token_secret: "kvvwIM4XUnIAViRcJ4UEbuqu4kcR2Qk7ShurBRd2bUR8y"
})

const server = app.listen(8080 || process.env.PORT, () => {
    const host = server.address().address;
    const port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

//socket.io stuff

//init socket.io
const io = require("socket.io")(server);

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('im ready', () => {
        console.log("starting stream");
        client.stream('statuses/filter', { track: 'javascript' }, (stream) => {
            stream.on('data', (tweet) => {
                io.emit("tweet", tweet)
            });

            stream.on('error', (error) => {
                console.log(error);
            });
        });
    });
});