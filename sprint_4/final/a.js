/*

-- ПРИНЦИП РАБОТЫ и ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ --

Собираем из всех слов в документах поисковый индекс, который представляется хэш таблицей,
где ключ это слово, а значение массив количества вхождений слова в каждый документ. Индекс в массиве указывает
на документ, значение на количество вхождений.

Далее для каждого уникального слова запроса собираем статистику вхождений по поисковому индексу, суммируем и выводим в отсортированном порядке. 

-- ВРЕМЕННАЯ СЛОЖНОСТЬ --

N - количество документов
n - количество слов в документах
M - количество запросов
m - количество слов в запросе
k - количество ненулевых вхождений слов запроса во все документы  

За O(n) составляем поисковый индекс, так как добавление и обновление значения занимает O(1) времени.
Далее за O(m N) находим статистку по релевантности текущего запроса, а для всех за O(m N M) + сортируем итоговые релевантности для каждого запроса за O(k log k). Общее время будет O(n) + O((m N + k log k)  M)
Дополнительно можно реализовать выбор первых пяти максимальных элементов за O(k) время, вместо сортировки за O(k log k)

-- ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ --

n - количество документов
nl - количество слов в документе
m - количество запросов 
ml - количество слов в запросе

Доп память займет поисковый индекс размером O(nl * n) + используется доп память для хранения статистики по запросам - O(m * n)

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

function readNumber() {
  return Number(readLine())
}

const maxResults = 5

function genRelevanceStatistics(docs, queries) {
  const searchIndex = new Map()

  docs.forEach((doc, i) => {
    const words = doc.split(' ')

    words.forEach((word) => {
      if (!searchIndex.has(word)) {
        searchIndex.set(word, [])
      }
      const currentCounts = searchIndex.get(word)
      currentCounts[i] = (currentCounts[i] || 0) + 1
    })
  })

  return queries.map((query) => {
    const uniqueWords = new Set(query.split(' '))
    const relevances = []

    uniqueWords.forEach((word) => {
      const inDocsRelevance = searchIndex.get(word) || []

      inDocsRelevance.forEach((inDocRelevance, i) => {
        relevances[i] = (relevances[i] || 0) + (inDocRelevance || 0)
      })
    })

    const relevantResults = []

    relevances.forEach((relevance, index) => {
      if (relevance > 0) {
        relevantResults.push({index: index + 1, relevance})
      }
    })

    return relevantResults
      .sort((a, b) => b.relevance - a.relevance || a.index - b.index)
      .slice(0, maxResults)
  })
}

function solve() {
  let n = readNumber()
  const docs = []

  while (n--) {
    docs.push(readLine())
  }

  let m = readNumber()
  const queries = []

  while (m--) {
    queries.push(readLine())
  }

  genRelevanceStatistics(docs, queries).forEach((queryRelevance) => {
    console.log(queryRelevance.map(({index}) => index).join(' '))
  })
}

