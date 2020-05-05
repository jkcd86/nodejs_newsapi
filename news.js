require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

var args = yargs
  .option("c", {
    describe: "News category of interest",
    alias: "category",
    choices: [
      "business",
      "entertainment",
      "general",
      "health",
      "science",
      "sports",
      "technology",
    ],
    type: "string",
    default: "business",
    demandOption: "false",
  })
  .option("l", {
    //location
    describe: 'Country code of interest (e.g., "de", "at", "uk", etc)',
    alias: "country",
    type: "string",
    default: "at",
    demandOption: "false",
  })
  .option("n", {
    //location
    describe: 'Country code of interest (e.g., "de", "at", "uk", etc)',
    alias: "num",
    type: "number",
    default: 20,
    demandOption: "false",
  })
  .help("h").argv;

var requestOptions = {
    url: 'https://newsapi.org/v2/top-headlines',
    qs: {
        country: args.country,
        apiKey: process.env.NEWS_API_KEY,
        category: args.category,
        pageSize: args.num
    }
};

request(
    requestOptions,
    function (error, response, body) {
    
    if (response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        console.log("Ergebnisse ingesamt: " + bodyObj.totalResults);
    
        for (var i = 0; i < bodyObj.articles.length; i++) {
            console.log((i+1) + '. ' + bodyObj.articles[i].title);
            console.log('   ' + bodyObj.articles[i].url);
        }
    }
});