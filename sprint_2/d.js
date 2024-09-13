if (process.env.REMOTE_JUDGE !== 'true') {
  class Node {
    constructor(value = null, next = null) {
      this.value = value;
      this.next = next;
    }
  }
}

function solution(node, valueToFind) {
  let nodeToHandle = node
  let i = 0

  while (nodeToHandle) {
    if (nodeToHandle.value === valueToFind) {
      return i
    }
    nodeToHandle = nodeToHandle.next
    i++
  }

  return -1
}

