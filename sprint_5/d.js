if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')

  test(() => {
    const a = generateTree([
      [0, 1, 1, 2],
      [1, 2],
      [2, 3],
    ])

    const b = generateTree([
      [0, 1, 1, 2],
      [1, 2],
      [2, 3],
    ])


    const result = solution(a, b)

    console.assert(result)
  })

  test(() => {
    const a = generateTree([
      [0, 1, 1],
      [1, 3],
    ])

    const b = generateTree([
      [0, 1, , 1],
      [1, 3],
    ])


    const result = solution(a, b)

    console.assert(!result)
  })
}

function areEqual(a, b) {
  if (a !== null && b !== null) {
    if (a.value == b.value) {
      const leftResult = areEqual(a.left, b.left)
      const rightResult = areEqual(a.right, b.right)

      return leftResult && rightResult
    }

    return false
  }

  if (a === null && b === null) {
    return true
  }

  return false
}

function solution(...rest) {
  return areEqual(...rest)
}

