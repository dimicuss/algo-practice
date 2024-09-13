if (process.env.REMOTE_JUDGE !== 'true') {
  class Node {
    constructor(value = null, next = null, prev = null) {
      this.value = value;
      this.next = next;
      this.prev = prev;
    }
  }
}

function solution(node) {
  let nodeToHandle = node
  let lastNode = null

  while (nodeToHandle) {
    const prevNode = nodeToHandle.prev
    const nextNode = nodeToHandle.next
    nodeToHandle.prev = nextNode
    nodeToHandle.next = prevNode
    lastNode = nodeToHandle
    nodeToHandle = nextNode
  }

  return lastNode
}
