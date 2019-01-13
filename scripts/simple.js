// Random math problems will  be generated in this file
// and pushed onto the site's html

// track problem to solution
let solutionDict = {};
let solutionPath = "solutions/simple.gif"
// make simple add/subtract equation

function getOp() {
    let opNum = getRandomInt(100)
    let op = 'plus'
    if (opNum%2 === 0) {
        op = 'minus'
    }
    return op
}

function pattern1() {
    let max = 50
    let num1 = getRandomInt(max)
    let num2 = getRandomInt(max)
    // determine random operand
    let op = getOp()
    let equation = `${num1} ${op} ${num2}`
    return equation
}

function pattern2() {
    let max = 50
    let num1 = getRandomInt(max)
    let num2 = getRandomInt(max)
    let num3 = getRandomInt(max)
    // determine random operand
    let op = getOp()
    let op2 = getOp()
    let equation = `${num1} ${op} ${num2} ${op2} ${num3}`
    return equation
}

function pattern3() {
    let max = 50
    let num1 = getRandomInt(max)
    let num2 = getRandomInt(max)
    let num3 = getRandomInt(max)
    let num4 = getRandomInt(max)
    // determine random operand
    let op = getOp()
    let op2 = getOp()
    let op3 = getOp()
    let equation = `${num1} ${op} ${num2} ${op2} ${num3} ${op3} ${num4}`
    return equation
}

// generate equations of different levels
function makeEquation(){

    let max = 100
    let num = getRandomInt(max)
    patterns = 3
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
    problem = makeProblemReadable(problem)
    console.log(problem)
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
