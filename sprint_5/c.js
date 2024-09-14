if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test} = require('./utils')
  test(() => {
    const root = generateTree([
      [0, 1, 1, 4],
      [1, 2, 2, 5],
      [2, 4],
      [3, 3],
      [4, 2, 5, 6],
      [5, 3],
      [6, 4]
    ])
    const result = solution(root)
    console.assert(result)
  })

  test(() => {
    const root = generateTree([
      [0, 1, 1, 4],
      [1, 2, 5, 2],
      [2, 4],
      [3, 3],
      [4, 2, 5, 6],
      [5, 3],
      [6, 4]
    ])
    const result = solution(root)
    console.assert(!result)
  })

  test(() => {
    const root = generateTree([
      [0, 1, 1, 2],
      [1, 1, 3],
      [2, 1],
      [3, 1],
    ])
    const result = solution(root)
    console.assert(!result)
  })
}

function zipTree(node) {
  if (node !== null) {
    const leftArray = zipTree(node.left)
    const rightArray = zipTree(node.right)

    return leftArray.concat([node.value]).concat(rightArray)
  }

  return []
}

function isAnaram(node) {
  const array = zipTree(node)

  if (array.length % 2 === 0) {
    return false
  }

  let i = 0
  let j = array.length - 1

  while (i < j) {
    if (array[i] !== array[j]) {
      return false
    }

    i++
    j--
  }

  return true
}

function solution(root) {
  return isAnaram(root)
}

