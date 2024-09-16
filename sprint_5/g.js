if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')

  test(() => {
    const a = generateTree([
      [0, -1, 1, 2],
      [1, 2, 3, 4],
      [2, 3, 5, 6],
      [3, 7, 7],
      [4, 3, 8, 9],
      [5, 4],
      [6, 0],
      [7, -1],
      [8, 9],
      [9, -6],
    ])

    const result = solution(a)
    console.assert(result === 21, 'A')
  })

  test(() => {
    const a = generateTree([
      [0, 1, 1, 2],
      [1, 1],
      [2, 2],
    ])

    const result = solution(a)
    console.assert(result === 4, 'B')
  })

  test(() => {
    const a = generateTree([
      [0, -5, 1, 2],
      [1, 1],
      [2, 7, 3, 4],
      [3, 2],
      [4, 3],
    ])

    const result = solution(a)
    console.assert(result === 12, 'C')
  })

  test(() => {
    const a = generateTree([
      [0, 2, 1, 2],
      [1, 2],
      [2, -3, 3, 4],
      [3, 5],
      [4, 1],
    ])

    const result = solution(a)
    console.assert(result === 6, 'D')
  })

  test(() => {
    const a = generateTree([
      [0, 7, , 1],
      [1, 2, 2, 3],
      [2, 3],
      [3, -7]
    ])

    const result = solution(a)
    console.assert(result === 12, 'E')
  })

  test(() => {
    const a = generateTree([
      [0, -10, 1, 2],
      [1, 1, 3],
      [2, 24, , 4],
      [3, 3, 5, 6],
      [4, 4, 7, 8],
      [5, 25],
      [6, 6],
      [7, 7],
      [8, 8, 9],
      [9, 9],
    ])

    const result = solution(a)
    console.assert(result === 64, 'F')
  })
}

function getBranchSums(node, sum = 0) {
  if (node !== null) {
    const nextSum = sum + node.value
    const l = getBranchSums(node.left, nextSum)
    const r = getBranchSums(node.right, nextSum)

    return Math.max(nextSum, l, r)
  }

  return 0
}

function getMaximalSum(node) {
  if (node !== null) {
    const lMaxSum = getBranchSums(node.left)
    const rMaxSum = getBranchSums(node.right)
    const sum = lMaxSum + rMaxSum + node.value
    const l = getMaximalSum(node.left)
    const r = getMaximalSum(node.right)
    return Math.max(sum, l, r)
  }

  return -Infinity
}

function solution(...rest) {
  return getMaximalSum(...rest)
}


