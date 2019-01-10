// Random math problems will  be generated in this file
// and pushed onto the site's html
// wolfram api will be used to verify that a solution exists
// and to find a valid solution



// from mdn documentation
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// use wolfram api to verify
function verify(value) {
    // URL for queries
    URL = `http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=L3KTPE-UYAAY8W3TG&mode=Default&i=${value}&output=json`

    // Create a request variable and assign a new XMLHttpRequest object to it.
    var request = new XMLHttpRequest();

    // Open a new connection, using the GET request on the URL endpoint
    request.open('GET', 'https://ghibliapi.herokuapp.com/films', true);

    request.onload = function () {
    // Begin accessing JSON data here
    }

    // Send request
    // request.send();

    return true
}
