// Random math problems will  be generated in this file
// and pushed onto the site's html

// track problem to solution
var solutionDict = {};

// make simple add/subtract equation
function makeEquation(){
    // get ints
    let max = 50
    let num1 = getRandomInt(max)
    let num2 = getRandomInt(max)
    let den1 = getRandomInt(max) + 1
    let den2 = getRandomInt(max) + 1

    // determine random operand
    let opNum = getRandomInt(100)
    let op = 'plus'
    if (opNum%2 === 0) {
        op = 'minus'
    }

    // create equation
    equation = `${num1} divided by ${den1} ${op} ${num2} divided by ${den2}`
    return equation
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
    problem = makeProblemReadable(problem)
    document.getElementById('problem-string').innerText = `Solve ${problem}.`
    // console.log(await solve(problem))
    solutionDict[problem] = await solve(problem)
    console.log(solutionDict[problem])
    // WriteFile(solutionPath, solutionDict[problem])
    
}

function printSimpleSolution(){
    let problem = document.getElementById('problem-string').innerText
    let solution = solutionDict[problem]
    // console.log(solution)
    // let htmlInput = `<img src="${solutionPath}">`
    // convert solution to base64 string
    let codedSolution = utoa(solution)
    console.log(codedSolution)
    let htmlInput = `<img src="${codedSolution}">`
    // testing purposes
    // htmlInput = `<h2> THIS IS A SOLUTION </h2>`
    // ends, delete after errors fixed
    htmlFull = `<div id = "simple-solution">${htmlInput}</div>`

    document.getElementById('results').innerHTML += htmlFull
}

function hideSimpleSolution() {
    element = document.getElementById('simple-solution')
    console.log(element)
    element.parentNode.removeChild(element)
}

window.onload = function() {
    printSimpleProblem()
    // check for click events
    document.getElementById("simple").onclick = function(e){
        printSimpleProblem()
    }

    showingSolution = false
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
