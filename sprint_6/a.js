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

function readNumberPair() {
  const [n, m] = readLine().split(' ')

  return [Number(n), Number(m)]
}

function solve() {
  let [v, e] = readNumberPair()

  const vertexes = new Map()

  for (let i = 1; i <= v; i++) {
    vertexes.set(i, [])
  }

  while (e--) {
    const [v1, v2] = readNumberPair()
    vertexes.get(v1).push(v2)
  }

  for (let [vertex, edges] of vertexes) {
    console.log(
      edges.length,
      edges.sort((a, b) => a - b).join(' ')
    )
  }
}


