if (process.env.REMOTE_JUDGE !== 'true') {
  class CNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
}

function findMaximalNode(node) {
  if (node !== null) {
    const leftMaximum = findMaximalNode(node.left)
    const rightMaximum = findMaximalNode(node.right)
    return Math.max(node.value, leftMaximum, rightMaximum)
  }

  return -Infinity
}

function solution(root) {
  return findMaximalNode(root)
}

function test() {
  var node1 = new CNode(1);
  var node2 = new CNode(-5);
  var node3 = new CNode(3);
  node3.left = node1;
  node3.right = node2;
  var node4 = new CNode(2);
  node4.left = node3;
  console.assert(solution(node4) === 3);
}

