// https://contest.yandex.ru/contest/26133/run-report/125854330/

/*
  #ИДЕЯ И ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ#

  В основе алгоритма лежит алгоритм проверки скобочных последовательностей через стек.
  При каждой встреченной левой скобке будем добавлять в стек новую таску, а при правой
  удаляем из стека текущую и умножаем результат удаленной таски на множитель
  сохраненный при выполнении предыдущей таски (при получении символа или цифры будем сохранять их в текущу таску как result и digit),
  далее сложим с результатом текущей таски. Таким образом к концу работы алгоритма, в стеке останентся один элемент с распакованной строкой.

  Далее просто проверим префиксы получившихся строк.

  #ВРЕМЯ ИСПОЛНЕНИЯ#
  
  Распаковка займет O(n), где n сдлинна распакованной строки, так как внутри есть умножение и складывание строк между тасками.
  Проверка префикса займет O(n * m), где n динна распакованной строки, а m количество строк.

  Cуммарно O(n * m)

  #ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ#

  O(n), где n динна распакованной строки
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


const digitMap = {1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true, 0: true}
const isDigit = (char) => digitMap[char] || false

const unpackString = (string) => {
  const callStack = [{result: '', digit: ''}]
  let i = 0

  while (i < string.length) {
    const char = string[i]
    const task = callStack[callStack.length - 1]

    if (isDigit(char)) {
      task.digit += char
    } else if (char === '[') {
      callStack.push({
        result: '',
        digit: '',
      })
    } else if (char === ']') {
      const task = callStack.pop()
      const taskToUpdate = callStack[callStack.length - 1]
      const multiplier = taskToUpdate.digit ? Number(taskToUpdate.digit) : 1
      taskToUpdate.result += task.result.repeat(multiplier)
      taskToUpdate.digit = ''
    } else {
      task.result += char
    }

    i++
  }

  return callStack[0].result
}

const maxCommonPrefix = (strings) => {
  let prefix = unpackString(strings[0])

  if (strings.length > 1) {
    for (let i = 1; i < strings.length; i++) {
      const unpackedString = unpackString(strings[i])

      for (let j = 0; j < Math.max(unpackedString.length, prefix.length); j++) {
        if (prefix[j] !== unpackedString[j]) {
          prefix = unpackedString.slice(0, j)
          break
        }
      }
    }
  }


  return prefix
}

function solve() {
  const packedStrings = readLines()

  console.log(
    maxCommonPrefix(packedStrings)
  )
}
