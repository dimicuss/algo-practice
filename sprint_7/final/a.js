// https://contest.yandex.ru/contest/25597/run-report/122352473/

/*

#ПРИНЦИП РАБОТЫ И ДОКАЗАТЕЛЬСТВО ПРАВИЛЬНОСТИ#

В основе лежит проблема находения минимального редакционного расстояния двух строк A и B.
А имнно количество вставок, замен или удалений символов в строке B, что бы превратить её в строку A. 
Найти такое расстояние можно с помощью двумерной динамики, где динамический переход выражается такой фомулой - 

dp[i][j] = i, если i > 0 и j === 0
dp[i][j] = j, если j > 0 и i === 0

иначе 

dp[i][j] = min(
  dp[i][j - 1] + 1,
  dp[i - 1][j] + 1,
  dp[i - 1][j - 1] + A[i] === B[j] ? 1 : 0
)

Таким образом в ячейке dp[A.length][B.length] будет минимальное редакционное расстояние

#ВРЕМЯ ИСПОЛНЕНИЯ#

O(A * B), так как для вычисления значений придется пройти по всей матрице стостоящей из A строк и B столбцов

#ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ#

O(A * B), так как нужно хранить матрицу A * B
Но можно оптимизировать до O(A), так как для вычислений нужна только предыдущая строка, что и было реализованно

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

function lvnstn(a, b) {
  let dp = Array.from({length: b.length + 1}, (_, i) => i)

  for (let i = 1; i <= a.length; i++) {
    const newDp = Array.from({length: b.length + 1}).fill(i)

    for (let j = 1; j <= b.length; j++) {
      newDp[j] = Math.min(
        newDp[j - 1] + 1,
        dp[j] + 1,
        dp[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      )
    }

    dp = newDp
  }

  return dp[b.length]
}

function solve() {
  const a = readLine()
  const b = readLine()

  console.log(lvnstn(a, b))
}


