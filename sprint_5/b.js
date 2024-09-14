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

  function parseNumber(str) {
    return str === 'None' ? null : Number(str)
  }

  function generateTree(tree) {
    const [_, ...nodes] = tree.split('\n')
    const parsedNodes = nodes.map((str) => {
      const [_, valueStr, leftStr, rightStr] = str.split(' ')
      const node = new CNode(parseNumber(valueStr))
      return [node, () => {
        const left = parseNumber(leftStr)
        const right = parseNumber(rightStr)

        if (left) {
          node.left = parsedNodes[left][0]
        }

        if (right) {
          node.right = parsedNodes[right][0]
        }
      }]
    })

    parsedNodes.forEach(([_, fn]) => fn())

    return parsedNodes[0][0]
  }

  (function suiteA() {
    const tree = `6
0 0 1 2
1 2 None None
2 7 3 4
3 4 5 None
4 8 None None
5 12 None None`
    const root = generateTree(tree)
    console.assert(!solution(root), 'A')
  })();


  (function suiteB() {
    const tree = `5
0 1 1 2
1 2 None None
2 0 3 4
3 3 None None
4 6 None None`

    const root = generateTree(tree)
    console.assert(solution(root), 'B')
  })();

  (function suiteD() {
    const tree = `9
0 0 1 2
1 1 3 None
2 2 None 4
3 3 5 6
4 4 7 8
5 5 None None
6 6 None None
7 7 None None
8 8 None None`
    const root = generateTree(tree)
    console.assert(!solution(root), 'D')
  })();

  (function suiteC() {
    const tree = `3
0 1 1 2
1 2 None None
2 0 None None`

    const root = generateTree(tree)
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

