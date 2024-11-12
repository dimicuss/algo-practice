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

const createTask = (index, parent) => {
  const task = {
    index,
    executed: false,
    result: false,
    parent,
  }

  return task
}

const checkString = (string, trie) => {
  const dp = new Map()
  const callstack = [createTask(0)]

  let lastExecutedTask

  while (callstack.length > 0) {
    const task = callstack[callstack.length - 1]

    if (task.executed) {
      if (task.parent) {
        task.parent.result = task.parent.result || task.result
      }

      dp.set(task.index, task.result)
      lastExecutedTask = callstack.pop()
    } else {
      const nextIndexes = indexesOfNextWord(string, trie, task.index)

      task.executed = true
      task.result = task.index >= string.length

      for (const nextIndex of nextIndexes) {
        const nextTask = createTask(nextIndex, task)

        if (dp.has(nextIndex)) {
          nextTask.result = dp.get(nextIndex)
          nextTask.executed = true
        }

        callstack.push(nextTask)
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
