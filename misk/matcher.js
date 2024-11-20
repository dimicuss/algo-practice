const {readFile} = require("fs");
const {inspect} = require("util");

const space = '\\s+'
const atom = '[А-ЯЁ][а-яё]+(?:-[а-я]+)?'
const infixes = ['да']
const matcher = `\\(?(${atom}(?:${space}(?:${infixes.join('|')})${space}${atom})?)\\)?`
const matcherUngrouped = `\\(?${atom}(?:${space}(?:${infixes.join('|')})${space}${atom})?\\)?`

const matchers = [
  `(?:${matcher}(?=${space}${matcherUngrouped}))`,
  `(?:${matcher})`,
  `(?:[А-Я]\\.\\s*${matcher})`,
].join('|')

const matchNames = (string) => {
  const regex = new RegExp(matchers, 'g')

  let result
  let results = []
  let chainedResults = []

  while ((result = regex.exec(string)) !== null) {
    const chained = result[1]
    if (chained) {
      chainedResults.push({
        start: result.index,
        end: result.index + chained.length,
        string: chained
      })
    } else {
      const ordinary = result[2] || result[3]
      chainedResults.push({
        start: result.index,
        end: result.index + ordinary.length,
        string: ordinary
      })

      results.push({
        sequence: chainedResults,
        allSubscequences: getSubSequences(chainedResults)
      })
      chainedResults = []
    }
  }

  if (chainedResults.length) {
    results.push({
      sequence: chainedResults,
      allSubscequences: getSubSequences(chainedResults)
    })
  }

  return results
}

const getPermutations = (items, cb, result = []) => {
  if (items.length > 0) {
    items.forEach((item, i) => {
      const nextResult = [...result, item]

      getPermutations(
        items.filter((_, iToFilter) => iToFilter !== i),
        cb,
        nextResult,
      )
    })
  } else {
    cb(result)
  }
}

const getSubSequences = (sequence) => {
  const result = []

  for (let i = 0; i < sequence.length; i++) {
    const subSequence = []

    for (let j = i; j < sequence.length; j++) {
      subSequence.push(sequence[j])
      const permutations = []
      getPermutations(subSequence, (permutation) => permutations.push(permutation))
      result.push({subSequence: [...subSequence], permutations})
    }
  }

  return result
}

readFile(0, (_, data) => {
  console.log(inspect(matchNames(data.toString()), false, Infinity))
})
