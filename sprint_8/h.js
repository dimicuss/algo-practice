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

const readLine = () => {
  return lines[line++]
}

const replace = (str, pattern, replacement) => {
  return str.replace(new RegExp(pattern, 'g'), replacement)
}

function solve() {
  const str = readLine()
  const pattern = readLine()
  const replacement = readLine()

  console.log(replace(str, pattern, replacement))
}


