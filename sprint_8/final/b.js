const readline = require('readline')

const reader = readline.createInterface({
  input: process.stdin
})

let line = 0
const lines = []

reader.on('line', line => {
  lines.push(line);
})

process.stdin.on('end', solve)

const readLine = () => {
  return lines[line++]
}

const readLines = () => {
  let n = Number(readLine())
  const result = []

  while (n--) {
    result.push(readLine())
  }

  return result
}

const readTrie = () => {
  const dict = readLines()
  const root = new Node()

  for (const word of dict) {
    let currentNode = root

    for (const char of word) {
      let nextNode = currentNode.charEdges.get(char)

      if (nextNode) {
        currentNode = nextNode
      } else {
        nextNode = new Node()
        currentNode.charEdges.set(char, nextNode)
        currentNode = nextNode
      }
    }

    currentNode.end = true
  }

  return root
}

const indexesOfNextWord = (string, trie, startIndex) => {
  let currentNode = trie
  let currentIndex = startIndex
  let nextIndexes = []

  while (currentNode) {
    if (currentNode.end) {
      nextIndexes.push(currentIndex)
    }

    const char = string[currentIndex]
    currentNode = currentNode.charEdges.get(char)
    currentIndex++
  }

  return nextIndexes
}

const checkString = (string, trie) => {
  const dp = new Map()
  const callstack = [{index: 0, executed: false, result: false, parent: undefined}]

  let lastExecutedTask

  while (callstack.length > 0) {
    const tailTask = callstack[callstack.length - 1]

    if (tailTask.executed) {
      if (tailTask.parent) {
        tailTask.parent.result = tailTask.parent.result || tailTask.result
      }

      dp.set(tailTask.index, tailTask.result)
      lastExecutedTask = callstack.pop()
    } else {
      tailTask.executed = true
      const nextIndexes = indexesOfNextWord(string, trie, tailTask.index)

      tailTask.result = tailTask.index >= string.length

      for (let i = nextIndexes.length - 1; i >= 0; i--) {
        const nextIndex = nextIndexes[i]
        if (dp.has(nextIndex)) {
          tailTask.result = tailTask.result || dp.get(nextIndex)
        } else {
          callstack.push({index: nextIndex, executed: false, result: false, parent: tailTask})
        }
      }
    }
  }

  return lastExecutedTask.result
}

function solve() {
  const string = readLine()
  const trie = readTrie()

  console.log(checkString(string, trie) ? 'YES' : 'NO')
}


class Node {
  end = false
  charEdges = new Map()
}
