if (process.env.REMOTE_JUDGE !== 'true') {
  const {generateTree, test, compareArrays} = require('./utils')

  function getResults(...rest) {
    let result = []

    getRange(...rest, (value) => {
      result.push(value)
    })

    return result
  }

  test(() => {
    const a = generateTree([
      [0, 1600, 1, 2],
      [1, 1400, 3, 4],
      [2, 2000, 5, 6],
      [3, 900],
      [4, 1600, 7],
      [5, 1800],
      [6, 2200],
      [7, 1550]
    ])

    const result = getResults(a, 1550, 1900)
    console.assert(compareArrays(result, [1550, 1600, 1600, 1800]), 'A')
  })
}

function getRange(node, min, max, cb) {
  if (node !== null) {
    if (node.value >= min) {
      getRange(node.left, min, max, cb)
    }

    if (node.value >= min && node.value <= max) {
      cb(node.value)
    }

    if (node.value <= max) {
      getRange(node.right, min, max, cb)
    }
  }
}

function printRange(...rest) {
  getRange(...rest, (value) => {
    console.log(value)
  })
}

