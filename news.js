const request = require("request");

request('https://newsapi.org/v2/top-headlines?country=at&apiKey=7d322e19042a418f956c96f0218792d5', function (error, response, body) {
    
    if (response.statusCode === 200) {
        var bodyObj = JSON.parse(body);
        console.log("Ergebnisse ingesamt: " + bodyObj.totalResults);
    
        for (var i = 0; i < bodyObj.articles.length; i++) {
            console.log((i+1) + '. ' + bodyObj.articles[i].title);
        }
    }
});

/*
    // Print the error if one occured    
    console.log('error:', error);
    // Print the response status code if a response
    console.log('statusCode:', response && response.statusCode);
    // Print the HTML for the ecosia homepage
    console.log('body:', body);
});
*/
