if (process.env.REMOTE_JUDGE !== 'true') {
  class CNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }

    toString() {
      return JSON.stringify(this, null, 4)
    }
  }

  function generateTree(tree) {
    const result = new Map()
    const functions = []

    tree.forEach(([id, value, left, right]) => {
      const node = new CNode(value)

      functions.push(() => {
        if (left !== undefined) {
          node.left = result.get(left)
        }

        if (right !== undefined) {
          node.right = result.get(right)
        }
      })

      result.set(id, node)
    })

    functions.forEach((fn) => fn())

    return result.get(0)
  }

  (function suiteA() {
    const root = generateTree([
      [0, 0, 1, 2],
      [1, 2],
      [2, 7, 3, 4],
      [3, 4, 5],
      [4, 8],
      [5, 12]
    ])
    console.assert(!solution(root), 'A')
  })();


  (function suiteB() {
    const root = generateTree([
      [0, 1, 1, 2],
      [1, 2],
      [2, 0, 3, 4],
      [3, 3],
      [4, 6]
    ])
    console.assert(solution(root), 'B')
  })();

  (function suiteD() {
    const root = generateTree([
      [0, 0, 1, 2],
      [1, 1, 3],
      [2, 2, , 4],
      [3, 3, 5, 6],
      [4, 4, 7, 8],
      [5, 5],
      [6, 6],
      [7, 7],
      [8, 8]
    ])
    console.assert(!solution(root), 'D')
  })();

  (function suiteC() {
    const root = generateTree([
      [0, 1, 1, 2],
      [1, 2],
      [2, 0]
    ])
    console.assert(solution(root), 'C')
  })();
}

function checkDepth(node) {
  return _checkDepth(node)[0]
}

function _checkDepth(node) {
  if (node !== null) {
    const [leftBalanced, leftDepth] = _checkDepth(node.left)
    const [rightBalanced, rightDepth] = _checkDepth(node.right)

    return [
      leftBalanced && rightBalanced && Math.abs(leftDepth - rightDepth) < 2,
      Math.max(leftDepth, rightDepth) + 1,
    ]
  }

  return [true, 0]
}

function solution(root) {
  return checkDepth(root)
}

