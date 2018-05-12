//node imports
var dotenv = require("dotenv").config();

var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Twitter = require("twitter");
var Spotify = require('node-spotify-api');

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify)


//commands
var command = process.argv[2];
var userSearch = process.argv[3];
for (var i = 4; i < process.argv.length; i++) {

    userSearch += "+" + process.argv[i];

}

//functions list
if (command === "movie-this") {
    var movieurl = "http://www.omdbapi.com/?t=" + userSearch + "&y=&plot=short&apikey=trilogy";
    request(movieurl, function (error, response, body) {
        if (process.argv[3]) {
            var movie = JSON.parse(body);
            console.log(movie.Title);
            console.log(movie.Year);
            console.log(movie.imdbRating);
            console.log(movie.Ratings[1].Value);
            console.log(movie.Language);
            console.log(movie.Plot);
            console.log(movie.Actors);
        }
        else {
            request("http://www.omdbapi.com/?t=mr+nobody+&y=&plot=short&apikey=trilogy", function (error, response, body) {
                var movie = JSON.parse(body);
                console.log(movie.Title);
                console.log(movie.Year);
                console.log(movie.imdbRating);
                console.log(movie.Ratings[1].Value);
                console.log(movie.Language);
                console.log(movie.Plot);
                console.log(movie.Actors);
            })
        }
    })
}


//twitter  ~~ Uses Disney's Twitter
if (command === "twitter-this") {
    var tweet = { screen_name: 'Disney' };
    client.get('statuses/user_timeline', tweet, function (error, tweets, response) {
        if (!error) {
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].text);
            }
        }
    });

}


// spotify
if (command === "spotify-this-song") {
    spotify.search({ type: 'track', query: userSearch, limit: 1 }, function (err, data) {
        if (process.argv[3]) {
            console.log(data.tracks.items[0].album.artists[0].name);
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].album.artists[0].href);
            console.log(data.tracks.items[0].album.name);

        }
        else { //not working, coming back to it later.
            spotify.search({ type: 'track', query: "disney", limit: 1 }, function (err, data) {
                console.log(data.tracks.items[0].album.artists[0].name);
                console.log(data.tracks.items[0].name);
                console.log(data.tracks.items[0].album.artists[0].href);
                console.log(data.tracks.items[0].album.name);
            });
        }

    });
}