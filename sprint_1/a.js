const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', solve)

function readNumber(line) {
  return Number(lines[line])
}

function solve() {
  const a = readNumber(0);
  const b = readNumber(1);

  const answer = a + b;

  console.log(answer);
} 
