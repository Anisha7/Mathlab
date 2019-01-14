// wolfram api will be used to verify that a solution exists
// and to find a valid solution
let SOLVEDthing = ''

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
 }

// from mdn documentation
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// ex. 6 plus 5 returns 6 + 5
function makeProblemReadable(problem) {
    console.log(problem)
    console.log(typeof(problem))
    
    problem = problem.replace(/plus/g, "+")
    problem = problem.replace(/minus/g, "-")
    problem = problem.replace(/divided by/g, "/")
    problem = problem.replace(/multiplied by/g, "x")
    console.log("making readable")
    console.log(problem)
    return problem
    
}

// write to file
function WriteFile(path, solution) {
    // "c:\\MyFile.txt"
    var fh = fopen(path , 3); // Open the file for writing

    if(fh!=-1) // If the file has been successfully opened
    {
        // var str = "Some text goes here...";
        fwrite(fh, solution); // Write the string to a file
        fclose(fh); // Close the file 
    }
}

// ucs-2 string to base64 encoded ascii
function utoa(str) {
    return window.btoa(unescape(encodeURIComponent(str)));
}

// use wolfram api to VERIFY
// Wolfram|Alpha Fast Query Recognizer API 
async function verify(value) {
    return true
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
    console.log("SOLVING")
    console.log(value)
    let URL = `https://cors-escape.herokuapp.com/http://api.wolframalpha.com/v1/simple?appid=L3KTPE-UYAAY8W3TG&i=${value}%3F`
    let solution = await axios({
        method:'get',
        url: URL,
        responseType:'arraybuffer'
      })
        .then(function(response) {
        // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            console.log(response.data)
            return response.data

        });
    return solution
}



// making equations and pushing to html
// make simple add/subtract equation
// generate equations of different levels
function makeEquation(){

    let max = 100
    let num = getRandomInt(max)
    let patterns = 3
    if (num%patterns == 0) {
        return pattern1()
    } 
    if (num%patterns == 1) {
        return pattern2()
    }
    if (num%patterns == 2) {
        return pattern3()
    }
    return pattern1()
}

async function verifyEquation(eqToVerify) {
    console.log(eqToVerify)

    let verificationResult = await verify(eqToVerify)
    console.log(verificationResult)
    console.log(verificationResult == true)
    if (verificationResult == true){
        console.log("I AM TRUE LET ME GOOOOO")
        return eqToVerify
    } else {
        let newResult = await verifyEquation(makeEquation())
        return newResult
    }
}

// add equation to html page
async function printSimpleProblem(){
    // let problem = await generateSimpleProblem()
    let problem = await verifyEquation(makeEquation())
    
    // console.log(await solve(problem))
    

    temp = makeProblemReadable(problem)
    document.getElementById('problem-string').innerText = `Solve ${temp}.`
    // WriteFile(solutionPath, solutionDict[problem])

    solutionDict[problem] = await solve(problem)
    SOLVEDthing = solutionDict[problem]
    console.log("PRINTING IN PROBLEM CREATION")
    console.log(solutionDict[problem])
    
}

function printSimpleSolution(){
    console.log("print simple solution function")
    //let problem = (document.getElementById('problem-string').innerText).replace('Solve ', '')
    let dkey = document.getElementById('problem-string').innerText
    dkey = dkey.replace('Solve ', '')
    dkey = dkey.replace('.','')
    

    // solution = solutionDict[dkey]
    // solution = solutionDict[Object.keys(solutionDict)[0]]
    solution = SOLVEDthing
    // solution = _arrayBufferToBase64(solution)
    // console.log(solutionDict[problem])
    // console.log(solution)
    // let htmlInput = `<img src="${solutionPath}">`
    // convert solution to base64 string
    console.log("PRINTING IN SIMPLE SOLUTION")
    console.log(solution)
    let codedSolution = _arrayBufferToBase64(solution)
    
    console.log(codedSolution)
    let htmlInput = `<img src="data:image/gif;base64, ${codedSolution}">`
    // testing purposes
    // htmlInput = `<h2> THIS IS A SOLUTION </h2>`
    // ends, delete after errors fixed
    htmlFull = `<div id = "simple-solution">${htmlInput}</div>`

    document.getElementById('results').innerHTML += htmlFull
    document.getElementById('show-solution').innerText = "hide solution"
}

function hideSimpleSolution() {
    element = document.getElementById('simple-solution')
    console.log(element)
    
    element.parentNode.removeChild(element)
    document.getElementById('show-solution').innerText = "show solution"
    
}

window.onload = function() {
    let showingSolution = false
    printSimpleProblem()
    // check for click events
    document.getElementById("simple").onclick = function(e){
        SOLVEDthing = ''
        if (showingSolution == true){
            hideSimpleSolution()
            showingSolution = false
        }
        printSimpleProblem()
    }

    document.getElementById("show-solution").onclick = function(e){
        console.log(showingSolution)
        if (showingSolution === false){
            printSimpleSolution()
            showingSolution = true
        } else {
            hideSimpleSolution()
            showingSolution = false
        }
    }
}
