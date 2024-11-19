const {readFile} = require("fs");
const {inspect} = require("util");

const atom = '([А-Я][а-я]+(?:-[а-я]+)?(?:\\Wда\\W[А-Я][а-я]+(?:-[а-я]+)?)?)'

const matchers = [
  `(?:${atom}\\W${atom}\\W${atom})`,
  `(?:${atom}\\W${atom})`,
  `(?:${atom})`,
].join('|')

const matchNames = (string) => {
  const regex = new RegExp(matchers, 'g')

  let result
  let results = []

  while ((result = regex.exec(string)) !== null) {
    const first = result[1] || result[4] || result[6]
    const second = result[2] || result[5]
    const third = result[3]
    const forms = [first, second, third].filter(Boolean)

    const formsPermutations = []

    getPermutations(forms, (perm) => formsPermutations.push(perm))

    results.push({
      start: result.index,
      end: result.index + result[0].length,
      formsPermutations
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

readFile(0, (_, data) => {
  console.log(inspect(matchNames(data.toString()), false, Infinity))
})
