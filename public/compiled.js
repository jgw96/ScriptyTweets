/* global io */

'use strict';

var socket = io();
var tweets = [];

var list = document.querySelector("#tweetList");

var urlify = function urlify(text) {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function (url) {
        return '<a href="' + url + '">' + url + '</a>';
    });
};

document.querySelector("#startTweets").addEventListener("click", function () {
    //start getting tweets
    socket.emit("im ready");

    //show toast
    document.querySelector("#toast0").open();
});

socket.on("tweet", function (tweet) {
    tweets.push(tweet);

    for (var i in tweets) {
        var urlTweet = urlify(tweets[i].text);
        var para = document.createElement("p");
        para.innerHTML = urlTweet;

        var image = document.createElement("img");
        image.src = tweets[i].user.profile_image_url_https;
        image.style.width = "5em";
        image.style.borderRadius = "50%";
        image.style.marginRight = "1em";

        var listItem = document.createElement("paper-item");
        listItem.style.width = "80%";
        listItem.style.marginBottom = "2%";
        listItem.appendChild(image);
        listItem.appendChild(para);

        list.appendChild(listItem);
    }

    if (tweets.length > 30) {
        tweets.length = 0;
    }
});
