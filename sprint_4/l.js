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

function readNumbers() {
  return readLine().split(' ').map((str) => Number(str))
}


const functions = (R, q) => {
  const hash = (str, n) => {
    let result = 0

    for (let i = 0; i < n; i++) {
      result = mod(result * q) + str[i].charCodeAt()
    }

    return mod(result)
  }

  const mod = (a) => {
    return a - (Math.floor(a / R) * R)
  }

  return {mod, hash}
}

function getAllSubstrings(str, n, k) {
  const R = 2 ** 52
  const q = 29
  const maximalQpower = 1297297635015349

  const {mod, hash} = functions(R, q)
  const maxQPower = n >= 500000 ? maximalQpower : Number((BigInt(q) ** BigInt(n - 1) % BigInt(R)))

  let map = new Map()

  let hashed
  for (let i = 0; i < str.length - n + 1; i++) {
    const previousChar = str[i - 1]
    const lastChar = str[i + n - 1]

    if (hashed) {
      const previousCharPowered = mod(previousChar.charCodeAt() * maxQPower)
      const hashDiff = mod(hashed - previousCharPowered)
      const diffMultiplied = mod(hashDiff * q)

      hashed = mod(diffMultiplied + lastChar.charCodeAt())
    } else {
      hashed = hash(str, n)
    }

    if (!map.has(hashed)) {
      map.set(hashed, [])
    }

    map.get(hashed).push(i)
  }

  const result = []

  for (const [_, indexes] of map) {
    if (indexes.length >= k) {
      result.push(indexes[0])
    }
  }
  return result
}

function solve() {
  const [n, k] = readNumbers()
  const str = readLine()
  console.log(getAllSubstrings(str, n, k).join(' '))
}
