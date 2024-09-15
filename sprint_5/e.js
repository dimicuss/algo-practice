if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')

  test(() => {
    const a = generateTree([
      [0, 5, 1, 2],
      [1, 3, 3, 4],
      [2, 8],
      [3, 1],
      [4, 4],
    ])

    const result = solution(a)

    console.assert(result, 'A')
  })

  test(() => {
    const a = generateTree([
      [0, 5, 1, 2],
      [1, 3, 3, 4],
      [2, 8],
      [3, 1],
      [4, 5],
    ])

    const result = solution(a)

    console.assert(!result, 'B')
  })
}

function isSearchTree(n) {
  if (n !== null) {
    const l = isSearchTree(n.left)
    const r = isSearchTree(n.right)

    return {
      check: l.check && r.check && l.max < n.value && r.min > n.value,
      min: Math.min(l.min, r.min, n.value),
      max: Math.max(l.max, r.max, n.value)
    }
  }

  return {
    check: true,
    min: Infinity,
    max: -Infinity
  }
}

function solution(...rest) {
  return isSearchTree(...rest).check
}

