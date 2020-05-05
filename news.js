require('dotenv').config();
const request = require('request');
const yargs = require('yargs');

let args = yargs
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

let requestOptions = {
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
    (error, response, body) => {
    
    if (response.statusCode === 200) {
        let bodyObj = JSON.parse(body);
        console.log("Ergebnisse ingesamt: " + bodyObj.totalResults);
        
        bodyObj.articles.forEach((article, index) => {
            console.log((index +1) + '. ' + article.title);
            console.log('    ' + article.url);
        });
    }
});