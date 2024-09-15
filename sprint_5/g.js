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
}

function getAllPaths(node, cb) {
  if (node !== null) {
    const l = getAllPaths(node.left, cb)
    const r = getAllPaths(node.right, cb)

    const sums = [node.value]

    if (l.length && r.length) {
      for (let i = 0; i < l.length; i++) {
        for (let j = 0; j < r.length; j++) {
          sums.push(node.value + l[i] + r[j])
        }
      }
    } else if (l.length) {
      for (let i = 0; i < l.length; i++) {
        sums.push(node.value + l[i])
      }
    } else if (r.length) {
      for (let j = 0; j < r.length; j++) {
        sums.push(node.value + r[j])
      }
    }
    cb(sums)
    return sums
  }

  return []
}

function solution(...rest) {
  let result = -Infinity

  getAllPaths(...rest, (sums) => {
    console.log(sums)
    result = Math.max(result, Math.max(...sums))
  })

  return result
}

