const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

let line = 0
const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', solve)

function readLine() {
  return lines[line++]
}

const openBrackets = {
  '{': true,
  '[': true,
  '(': true
}

const validBracketsPairs = {
  '{': '}',
  '[': ']',
  '(': ')'
}

function isCorrectBracketSeq(seq) {
  const openedBrackets = []

  for (let i = 0; i < seq.length; i++) {
    const bracket = seq[i]

    if (openBrackets[bracket]) {
      openedBrackets.push(bracket)
    } else {
      const openBracket = validBracketsPairs[openedBrackets[openedBrackets.length - 1]]
      if (openBracket === bracket) {
        openedBrackets.pop()
      } else {
        return false
      }
    }
  }

  return openedBrackets.length === 0
}

function solve() {
  let seq = readLine()
  console.log(isCorrectBracketSeq(seq) ? 'True' : 'False')
}



