// Random math problems will  be generated in this file
// and pushed onto the site's html

// track problem to solution
var solutionDict = {};
 

function generateSimpleProblem(){
    max = 50
    found = false
    while (found === false){
        // determine random operand
        opNum = getRandomInt(100)
        op = 'plus'
        if (opNum%2 === 0) {
            op = 'minus'
        }
        // generate numbers
        num1 = getRandomInt(max)
        num2 = getRandomInt(max)
        den1 = getRandomInt(max)
        den2 = getRandomInt(max)

        // create equation
        equation = `${num1} divided by ${den1} ${op} ${num2} divided by ${den2}`
        console.log(equation)
        found = verify(equation)
        console.log(found)
        // found = true
        setTimeout(3000)
    }
    solutionDict[equation] = solve(equation)
    return equation
}

// add equation to html page
function printSimpleProblem(){
    problem = generateSimpleProblem()
    document.getElementById('problem-string').innerText = `Solve ${problem}.`
    print(solve(problem))
    solutionDict[problem] = solve(problem)
}

function printSimpleSolution(){
    problem = document.getElementById('problem-string').innerText
    solution = solutionDict[problem]
    console.log(solution)
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
