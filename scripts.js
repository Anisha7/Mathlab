// Random math problems will  be generated in this file
// and pushed onto the site's html
// wolfram api will be used to verify that a solution exists
// and to find a valid solution
console.log("scripts loaded")
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
        equation = `${num1} + ${num2}`
        found = verify(equation)
    }
    return equation
}

// add equation to html page
function printSimpleProblem(){
    console.log("I am trying")
    problem = generateSimpleProblem()
    document.getElementById('simple-problem').innerhtml = `Solve ${problem}.`
}


// check for click events
document.getElementById("simple").onclick = function(e){
    alert('click');
}
