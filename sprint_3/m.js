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

function findMedian(nArr, mArr, n, m, left = 0, right = n) {
  if (n > m) {
    return findMedian(mArr, nArr, m, n)
  }

  if (left <= right) {
    const nMid = Math.floor((left + right) / 2)
    const mMid = Math.floor((n + m + 1) / 2) - nMid

    const leftN = nMid > 0 ? nArr[nMid - 1] : -Infinity
    const rightN = nMid < n ? nArr[nMid] : Infinity

    const leftM = mMid > 0 ? mArr[mMid - 1] : -Infinity
    const rightM = mMid < m ? mArr[mMid] : Infinity

    if (leftN <= rightM && leftM <= rightN) {
      return (n + m) % 2 === 0
        ? (Math.max(leftM, leftN) + Math.min(rightM, rightN)) / 2
        : Math.max(leftN, leftM)
    }

    if (leftN > rightM) {
      return findMedian(nArr, mArr, n, m, left, nMid - 1)
    }

    return findMedian(nArr, mArr, n, m, nMid + 1, right)
  }

  return undefined
}

function solve() {
  const n = readNumber()
  const m = readNumber()
  const nArr = readNumberArray()
  const mArr = readNumberArray()

  console.log(findMedian(nArr, mArr, n, m))
}
