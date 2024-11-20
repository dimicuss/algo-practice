// https://contest.yandex.ru/contest/26133/run-report/124629383/

/*
  #ИДЕЯ И ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ#

  Построим бор на каком то наборе слов. Далее от начального индекса будем находить слова
  в боре и если до конца строки найдено хотя бы одно слово, то рекусивно для следующего
  индекса от всех найденых слов выполним алгоритм, иначе вернем false.
  Таким образом к концу строки будет проверено соответствие строки бору.

  Дополнительно что бы сократить количество итераций
  необходимо кэшировать результаты проверки вхождения слова в бор по текущему индексу,
  а так же перевести алгоритм в итерационную форму для предотвращения переполнения стека вызовов. 

  #ВРЕМЯ ИСПОЛНЕНИЯ#
  
  Сборка бора займет O(L) времени, где L суммарная длинна всех строк.
  А Выполнение самого алгоритма O(n^2), где n длинна строки

  Суммарно, O(L + n^2)

  #ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ#

   O(L + n^2), так как у нас есть бор + рекурсивная функция с каллстеком.
*/

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

const createTask = (index, parent) => ({
  index,
  parent,
  result: false,
  executed: false,
})

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

      task.result = task.index >= string.length
      task.executed = true

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
