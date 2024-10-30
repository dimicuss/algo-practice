// https://contest.yandex.ru/contest/25597/run-report/122709779/

/*

#ПРИНЦИП РАБОТЫ И ДОКАЗАТЕЛЬСТВО ПРАВИЛЬНОСТИ#

Посути требуется найти есть ли подмассив с суммой равной полусумме (S) всех элементов массива (A).
Для этого определим двумерную динамику где строки будут представлять текущий подмассив из A элементов,
а столбцы текущую подсумму из S элементов (например S = 10, тогда массив будет [0...10]).

Динамический переход будет выглядеть так

dp[i][j] = T если j === 0

иначе

dp[i][j] = dp[i - 1][j] || dp[i - 1][j - A[i]] || false

Так как dp[i] представляет текущий подмассив из A[1...i] элементов, то вляется ли текущая сумма j суммой
подмассива можно определить дизъюнкцией предыдущего подмассива по сумме j (dp[i - 1][j]), а так же по сумме j - A[i] (dp[i - 1][j - A[i]])
(тут можно получить негативную сумму, в таком случае результат будет негативным).

Конечный ответ будет лежать в ячейке dp[A.length][S.length]

#ВРЕМЯ ИСПОЛНЕНИЯ#

O(A * S), так как для вычисления значений придется пройти по всей матрице стостоящей из A строк и S столбцов

#ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ#

O(A), так как для вычислений нужна только предыдущая строка

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

const readNumber = () => Number(readLine())
const readNumbers = () => readLine().split(' ').map((str) => Number(str))

function findHalfSumSubArray(numbers) {
  const halfSum = numbers.reduce((sum, num) => sum + num, 0) / 2

  let dp = Array.from(halfSum + 1).fill(false)

  dp[0] = true

  for (let i = 0; i < numbers.length; i++) {
    const nextDp = Array.from(halfSum + 1).fill(false)
    nextDp[0] = true

    for (let j = 1; j <= halfSum; j++) {
      nextDp[j] = dp[j] || dp[j - numbers[i]] || false
    }

    dp = nextDp
  }

  return dp[halfSum]
}

function solve() {
  readNumber()
  const numbers = readNumbers()

  console.log(findHalfSumSubArray(numbers) ? 'True' : 'False')
}


