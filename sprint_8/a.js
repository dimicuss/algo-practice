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

const reverseWords = (string) => {
  return string.split(' ').reverse().join(' ')
}

function solve() {
  const string = readLine()

  console.log(reverseWords(string))
}


