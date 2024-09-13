// https://contest.yandex.ru/contest/22781/run-report/116615890/

/*
-- ПРИНЦИП РАБОТЫ --

Если текущий символ определен как число, то добавляем его в стек операндов, иначе вынимаем из стека 2 верхних
операнда и производим мат. оперцию по значению символа, а результат складываем в стек операндов.
Повторяем до конца массива. Далее выводим верхний элемент из стека операндов.

-- ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

В простейшем случае "1 2 +" в пустой стек будет добавлено 2 операнда, затем по алгоритму после сложения
оных, будет добавлен операнд "3", который пойдет на вывод. При более сложных случаях, например "1 2 + 3 *", алгоритм будет индуктивно корректен, то есть продолжится для операндов "3 3" и операции умножения.

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

В любом случае цикл проходящий по символам будет выолняться n раз. Внутри тела цикла могут вызываться .push,
 .pop, а так же мат. операции, которые занимают O(1) времени. Таким образом сложность по времени равна O(n) 
 

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --
Дополнительной памяти влияющей на ассимптотику не юзаем.

Если n = m + o, где m количество операндов, а o количество операторов,
то в стеке может быть максимум m элементов

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


function readLine() {
  return lines[line++]
}

function readStringArray() {
  return readLine().split(' ')
}

const operandsMap = {
  '*': true,
  '/': true,
  '+': true,
  '-': true
}

function polandMath(input) {
  const operands = []

  for (let i = 0; i < input.length; i++) {
    const strValue = input[i]

    if (operandsMap[strValue]) {
      const b = operands.pop()
      const a = operands.pop()

      if (strValue === '*') {
        operands.push(a * b)
      }

      if (strValue === '/') {
        operands.push(Math.floor(a / b))
      }

      if (strValue === '+') {
        operands.push(a + b)
      }

      if (strValue === '-') {
        operands.push(a - b)
      }
    } else {
      operands.push(Number(strValue))
    }
  }

  return operands[operands.length - 1]
}

function solve() {
  let input = readStringArray()

  const result = polandMath(input)

  console.log(result)
}

