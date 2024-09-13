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

function readNumber() {
  return Number(readLine())
}

function readNumberArray() {
  return readLine().split(' ').map((str) => Number(str))

}

function mod(a, b) {
  return a - (Math.floor(a / b) * b)
}

function powMod(a, power, m) {
  if (power === 1) return a
  if (power % 2 === 0) return powMod(a, power / 2, m) ** 2 % m
  return powMod(a, power - 1, m) * a % m
}


function solve() {
  const a = readNumber()
  const m = readNumber()
  const s = readLine()
  let n = readNumber()

  const results = [0, s[0].charCodeAt()]

  for (let i = 1; i < s.length; i++) {
    results[i + 1] = (results[i] * a % m + s[i].charCodeAt()) % m;
  }

  while (n--) {
    const [l, r] = readNumberArray()
    const aPowered = powMod(a, r - l + 1, m)
    const lPrefix = mod(results[l - 1] * aPowered, m)
    console.log(mod(results[r] - lPrefix, m))
  }
}


