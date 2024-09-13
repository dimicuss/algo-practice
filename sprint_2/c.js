if (process.env.REMOTE_JUDGE !== 'true') {
  class Node {
    constructor(value = null, next = null) {
      this.value = value;
      this.next = next;
    }
  }
}

function solution(node, indexToRemove) {
  let previousNode = undefined
  let nodeToHandle = node
  let i = 0

  while (nodeToHandle && i <= indexToRemove) {
    if (i === indexToRemove) {
      if (previousNode) {
        previousNode.next = nodeToHandle.next
      } else {
        node = nodeToHandle.next
      }
      break
    }
    previousNode = nodeToHandle
    nodeToHandle = nodeToHandle.next
    i++
  }

  return node
}

