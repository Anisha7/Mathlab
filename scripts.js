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
    console.log("verifying")
    // URL for queries
    URL = `https://cors-escape.herokuapp.com/http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=L3KTPE-UYAAY8W3TG&mode=Default&i=${value}&output=json`

    // Create a request variable and assign a new XMLHttpRequest object to it.
    // let request = new XMLHttpRequest();

    // // Open a new connection, using the GET request on the URL endpoint
    // request.open('GET', URL, true);
    // console.log(request.status)
    // request.onload = function () {
    //     // Begin accessing JSON data here
    //     console.log(this.response)
    //     var data = JSON.parse(this.response);
    //     console.log("JSON")
    //     console.log(data)
    // }

    // request.onreadystatechange = function () {
    //     // Begin accessing JSON data here
    //     console.log(this.response)
    //     var data = JSON.parse(this.response);
    //     console.log("JSON")
    //     console.log(data)
    // }
    
    // Send request
    // request.send();

    // fetch(URL).then(function(result) {
    //     console.log("Result: ")
    //     console.log(result.json())
    //     // return result.json();
    //   }).then(function(json) {
    //     // displayResults(json);
    //     console.log("HI, display it now")
    // });

    axios({
        method:'get',
        url: URL,
        responseType:'text'
      })
        .then(function(response) {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
        console.log("Result: ")
        console.log(response)
        console.log(response.data)
    });
    return true
}
