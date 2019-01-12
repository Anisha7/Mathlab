// Random math problems will  be generated in this file
// and pushed onto the site's html

// track problem to solution
var solutionDict = {};

function generateSimpleProblem(){
    max = 50
    found = false
    while (found === false){
        console.log("in while loop")
        num1 = getRandomInt(max)
        num2 = getRandomInt(max)
        // determine random operand
        opNum = getRandomInt(100)
        op = 'plus'
        if (opNum%2 === 0) {
            op = 'minus'
        }
        equation = `${num1} ${op} ${num2}`
        console.log(equation)
        // found = verify(equation)
        found = true
        setTimeout(3000)
    }
    solutionDict[equation] = solve(equation)
    return equation
}

// add equation to html page
function printSimpleProblem(){
    problem = generateSimpleProblem()
    document.getElementById('problem-string').innerText = `Solve ${problem}.`
    

}

function printSimpleSolution(){
    problem = document.getElementById('problem-string').innerText
    solution = solutionDict[problem]
    
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
