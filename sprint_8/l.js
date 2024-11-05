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

function getPrefixFn(str) {
  const pi = Array.from({
    length: str.length
  }).fill(0)

  for (let i = 1; i < str.length; i++) {
    let k = pi[i - 1]

    while (k > 0 && str[i] !== str[k]) {
      k = pi[k - 1]
    }

    if (str[i] === str[k]) {
      k++
    }

    pi[i] = k
  }

  return pi
}


function solve() {
  const str = readLine()

  console.log(getPrefixFn(str).join(' '))
}


