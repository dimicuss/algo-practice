if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')

  test(() => {
    const a = generateTree([
      [0, 1, 1, 2],
      [1, 2],
      [2, 3, 3, 4],
      [3, 2],
      [4, 1],
    ])

    const result = solution(a)
    console.assert(result === 275, 'A')
  })
}

function concatValues(node, callback, result = "") {
  if (node !== null) {
    const nextResult = result + node.value
    if (node.left === null && node.right === null) {
      callback(Number(nextResult))
    } else {
      concatValues(node.left, callback, nextResult)
      concatValues(node.right, callback, nextResult)
    }
  }
}

function solution(...rest) {
  let result = 0

  concatValues(...rest, (sum) => {
    result += sum
  })

  return result
}

