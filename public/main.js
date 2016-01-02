/* global io */

const socket = io();
const tweets = [];

const list = document.querySelector("#tweetList");

const urlify = (text) => {
    var urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, function(url) {
        return '<a href="' + url + '">' + url + '</a>';
    })
}

document.querySelector("#startTweets").addEventListener("click", () => {
    //start getting tweets
    socket.emit("im ready");
    
    //show toast
    document.querySelector("#toast0").open();
})

socket.on("tweet", (tweet) => {
    tweets.push(tweet);
    
    for (let i in tweets) {
        let urlTweet = urlify(tweets[i].text);
        let para = document.createElement("p");
        para.innerHTML = urlTweet;

        let image = document.createElement("img");
        image.src = tweets[i].user.profile_image_url;
        image.style.width = "5em";
        image.style.borderRadius = "50%";
        image.style.marginRight = "1em";

        let listItem = document.createElement("paper-item");
        listItem.style.width = "80%";
        listItem.style.marginBottom = "2%";
        listItem.appendChild(image);
        listItem.appendChild(para);

        list.appendChild(listItem);
    }

    if (tweets.length > 30) {
        tweets.length = 0;
    }
})