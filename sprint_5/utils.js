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

function generateTree(tree, index = 0) {
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

  return result.get(index)
}

function test(fn) {
  return fn()
}

module.exports = {generateTree, test}
