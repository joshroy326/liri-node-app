//Require .env file
require("dotenv").config();
//Require request------------------------------------------------------------------------------------------------------------
var request = require("request");
//Require moment-------------------------------------------------------------------------------------------------------------
var moment = require("moment");
//Require file systems
var fs = require('fs');
//Require axios--------------------------------------------------------------------------------------------------------------
var axios = require("axios");
var Spotify = require('node-spotify-api');
//---------------------------------------------------------------------------------------------------------------------------
//Initialize spotify
var keys = require('./keys');
var spotify = new Spotify(keys.spotify);
var args = process.argv[2];
//Finding out info on a concert
if (args === 'concert-this') {
    var artist = process.argv.slice(3).join(" ");
    var request = ("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp");
    axios.get(request).then(function (artistResponse) {
        // console.log(artistResponse)
        console.log("Venue: " + artistResponse.data[0].venue.name);
        console.log("City: " + artistResponse.data[0].venue.city);
        console.log("Event Date: " + moment(artistResponse.data[0].datetime).format("MM/DD/YYYY"));
    })
} else if (args === 'spotify-this-song') {
    var song = process.argv.slice(3).join(" ");
    spotify.search({
        type: 'track',
        query: song
    }, function (error, data) {
        if (error) {
            console.log("There was a problem: " + error);
        }
        console.log("Artist: " + data.tracks.items[0].artists.name);
        console.log("Name: " + data.tracks.items[0].name);
        console.log("URL: " + data.tracks.items[0].href);
        console.log("Album: " + data.tracks.items[0].album.name);
    })
} else if (args === 'movie-this') {
    var movie = process.argv.slice(3).join(" ");
    var request = ("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy");
    console.log(request);
    axios.get(request).then(function (movieResponse) {
        console.log("Title: " + movieResponse.data.Title);
        console.log("Year: " + movieResponse.data.Year);
        console.log("Rating: " + movieResponse.data.imdbRating);
        console.log("Language: " + movieResponse.data.Language);
        console.log("Plot: " + movieResponse.data.Plot);
        console.log("Actors: " + movieResponse.data.Actors);
    })
} else if (args === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            console.log(error);
        }
        var array = data.split(",");
        console.log(array[1]);
        //for some reason its not running the command in the txt file and just ouputting the song and not reaching out for the data
    });
}



