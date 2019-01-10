// Random math problems will  be generated in this file
// and pushed onto the site's html
// wolfram api will be used to verify that a solution exists
// and to find a valid solution
console.log("scripts loaded")
stuff = generateSimpleProblem()
console.log(stuff)
// from mdn documentation
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

// use wolfram api to verify
function verify(equation) {
    return true
}

// simple math problems
function generateSimpleProblem(){
    max = 50
    found = false
    while (found == false){
        num1 = getRandomInt(max)
        num2 = getRandomInt(max)
        // determine random operand
        opNum = getRandomInt(100)
        op = '+'
        if (opNum%2 === 0) {
            op = '-'
        }
        equation = `${num1} ${op} ${num2}`
        found = verify(equation)
    }
    return equation
}

// add equation to html page
function printSimpleProblem(){
    console.log("I am trying")
    problem = generateSimpleProblem()
    document.getElementById('problem-string').innerText = `Solve ${problem}.`
}

window.onload = function() {
    console.log(document.getElementById("simple"))
    printSimpleProblem()
    // check for click events
    document.getElementById("simple").onclick = function(e){
        printSimpleProblem()
    }
}
