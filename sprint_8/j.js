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

const readLines = () => {
  let n = Number(readLine())
  const result = []

  while (n--) {
    result.push(readLine())
  }

  return result
}

const camelCased = (words, queries) => {
  const map = new Map()
  const result = []

  map.set('', words)

  for (const word of words) {
    let upperCased = ''
    for (let i = 0; i < word.length; i++) {
      const char = word[i]

      if (char === char.toUpperCase()) {
        upperCased += char

        if (!map.has(upperCased)) {
          map.set(upperCased, [])
        }

        map.get(upperCased).push(word)
      }
    }
  }

  for (const query of queries) {
    const match = map.get(query)
    if (match) {
      result.push(match)
    }
  }

  return result
}

function solve() {
  const words = readLines()
  const queries = readLines()
  camelCased(words.sort((a, b) => a > b && 1 || a < b && -1 || 0), queries).forEach((result) => {
    console.log(result.join('\n'))
  })
}

