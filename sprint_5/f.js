if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')

  test(() => {
    const root = generateTree([
      [0, 3, 1, 2],
      [1, 1, 3, 4],
      [2, 4],
      [3, 8],
      [4, 12, 5],
      [5, 5]
    ])
    const result = solution(root)

    console.assert(result === 4)
  })
}

function getMaximumDepth(node) {
  if (node !== null) {
    const leftDepth = getMaximumDepth(node.left)
    const rightDepth = getMaximumDepth(node.right)

    return Math.max(leftDepth, rightDepth) + 1
  }

  return 0
}

function solution(root) {
  return getMaximumDepth(root)
}

