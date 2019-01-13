// Random math problems will  be generated in this file
// and pushed onto the site's html

// track problem to solution
let solutionDict = {};

// make simple add/subtract equation
function makeEquation(){
    let max = 50
    let num1 = getRandomInt(max)
    let num2 = getRandomInt(max)
    // determine random operand
    let opNum = getRandomInt(100)
    let op = 'plus'
    if (opNum%2 === 0) {
        op = 'minus'
    }
    let equation = `${num1} ${op} ${num2}`
    return equation
}

async function generateSimpleProblem(){
    console.log("STARTING")
    let found = false
    let count = 0
    let equation = '3 plus 5'
    while ((found !== true) && (count < 5)){
        console.log("**in while loop**")
        equation = makeEquation()
        console.log(equation)
        // setTimeout(10000)
        found = await verify(equation)
        console.log("FOUND")
        console.log(found)
        // found = true
        // found = true
        // setTimeout(3000)
        count += 1
    }
    solutionDict[equation] = solve(equation)
    return equation
}

// add equation to html page
async function printSimpleProblem(){
    let problem = await generateSimpleProblem()
    document.getElementById('problem-string').innerText = `Solve ${problem}.`
}

function printSimpleSolution(){
    let problem = document.getElementById('problem-string').innerText
    let solution = solutionDict[problem]
    
    htmlInput = `<img src="${solution}">`

    // testing purposes
    htmlInput = `<h2> THIS IS A SOLUTION </h2>`
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
