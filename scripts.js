// wolfram api will be used to verify that a solution exists
// and to find a valid solution


// from mdn documentation
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// use wolfram api to VERIFY
// Wolfram|Alpha Fast Query Recognizer API 
async function verify(value) {
    console.log("verifying")
    // URL for queries
    let URL = `https://cors-escape.herokuapp.com/http://www.wolframalpha.com/queryrecognizer/query.jsp?appid=L3KTPE-UYAAY8W3TG&mode=Default&i=${value}&output=json`

    // did not use fetch because it is not compatible on all browsers
    // attempted to use xml http requests
    // switched to axios because of its compatibility and good documentation
    // found = false
    let found = await axios({
        method:'get',
        url: URL,
        responseType:'text'
      })
        .then(function(response) {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            if (typeof response.data !== 'undefined' && typeof response.data !== 'string') {
                
                // if (response.data.query[0].domain === 'math')
                // found = response.data.query[0].accepted
                // console.log("query accepted value: ")
                console.log(response.data.query[0].accepted)
                // return response.data.query[0].accepted
                let responseResult = response.data.query[0].accepted
                if (responseResult == 'true') {
                    return true
                }

            } else {
                return false
            }
    });
    console.log("end of verify function")
    // return found
    return found
}

// use wolfram api to SOLVE
// Wolfram|Alpha Simple API
async function solve(value) {
    let URL = `https://cors-escape.herokuapp.com/http://api.wolframalpha.com/v1/simple?appid=L3KTPE-UYAAY8W3TG&i=${value}%3F`
    let solution = await axios({
        method:'get',
        url: URL,
        responseType:'text'
      })
        .then(function(response) {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            console.log(response.data)
            return response.data

        });
    return solution
}