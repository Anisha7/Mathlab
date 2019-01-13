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
    let num3 = getRandomInt(max)
    // determine random operand
    let op = getOp()
    let equation = `${num1}a ${op} ${num2} = ${num3}`
    return equation
}

function pattern2() {
    let max = 50
    let num1 = getRandomInt(max)
    let num2 = getRandomInt(max)
    let num3 = getRandomInt(max)
    // determine random operand
    let op = getOp()
    let equation = `${num1} ${op} ${num2} = ${num3}a`
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
    let equation = `${num1}a ${op} ${num2} = ${num3} ${op} ${num4}a`
    return equation
}