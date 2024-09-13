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

function readStrings() {
  return readLine().split(' ')
}

function solve() {
  const n = readNumber()
  const words = readStrings()

  let map = new Map()

  words.forEach((word, i) => {
    const key = word.split('').sort().join('')

    if (!map.has(key)) {
      map.set(key, [])
    }

    const list = map.get(key)

    list.push(i)
  })

    ;[...map.values()].forEach((indexes) => {
      console.log(indexes.join(' '))
    })
}

