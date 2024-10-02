if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')

  function resize(root) {
    if (root) {
      let size = 1

      if (root.left) {
        resize(root.left)
        size += root.left.size
      }

      if (root.right) {
        resize(root.right)
        size += root.right.size
      }

      root.size = size
    }
  }

  test(() => {
    const tree = generateTree([
      [0, 8, 1, 2],
      [1, 4, 3, 4],
      [2, 12, 5, 6],
      [3, 2, 7, 8],
      [4, 6, 9, 10],
      [5, 10, 11, 12],
      [6, 14, 13, 14],
      [7, 1],
      [8, 3],
      [9, 5],
      [10, 7],
      [11, 9],
      [12, 11],
      [13, 13],
      [14, 15],
    ])

    resize(tree)

    const result = split(tree, 10)

    console.assert(result[0].size === 10)
    console.assert(result[1].size === 5)
  })

  test(() => {
    const tree = generateTree([
      [0, 5, 1, 2],
      [1, 2, , 3],
      [2, 10, 4, 5],
      [3, 3],
      [4, 8],
      [5, 2],
    ])

    resize(tree)

    const result = split(tree, 4)

    console.assert(result[0].size === 4)
    console.assert(result[1].size === 2)
  })

  test(() => {
    const tree = generateTree([
      [0, 5, 1, 2],
      [1, 2, , 3],
      [2, 10, 4, 5],
      [3, 3],
      [4, 8],
      [5, 2],
    ])

    resize(tree)

    const result = split(tree, 6)

    console.assert(result[0].size === 6)
    console.assert(result[1] === null)
  })
}

function split(root, k) {
  const leftSize = root.left === null ? 0 : root.left.size;

  if (leftSize === k) {
    const left = root.left
    root.size = 1 + (root.right?.size || 0)
    root.left = null
    return [left, root]
  }

  if (leftSize < k) {
    if (root.right) {
      const [bstA, bstB] = split(root.right, k - leftSize - 1);
      root.right = bstA
      root.size = (root.left?.size || 0) + (root.right?.size || 0) + 1
      return [root, bstB]
    }

    return [root, null]
  }

  const [bstA, bstB] = split(root.left, k)
  root.left = bstB
  root.size = (root.left?.size || 0) + (root.right?.size || 0) + 1
  return [bstA, root]
}

