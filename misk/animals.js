const names = [
  "dog",
  "cat",
  "bat",
  "cock",
  "cow",
  "pig",
  "fox",
  "ant",
  "bird",
  "lion",
  "wolf",
  "deer",
  "bear",
  "frog",
  "hen",
  "mole",
  "duck",
  "goat",
];

const idx = (char) => {
  return char.charCodeAt(0) - "a".charCodeAt(0);
};

const isNameInMap = (name, mapToClone) => {
  const map = [...mapToClone];
  for (const char of name) {
    if (--map[idx(char)] < 0) {
      return false;
    }
  }

  return true;
};

const sc = (chars) => {
  const charsMap = Array.from({ length: 26 }).fill(0);

  for (const char of chars) {
    charsMap[idx(char)]++;
  }

  return _cs(charsMap, names);
};

const _cs = (charsMap, names) => {
  const callStack = [{ charsMap, names, accepted: [], result: 0 }];

  let resultToReturn = 0;

  while (callStack.length) {
    const { charsMap, names, result } = callStack.pop();

    resultToReturn = Math.max(resultToReturn, result);

    for (const name of names) {
      if (isNameInMap(name, charsMap)) {
        const charsMapCloned = [...charsMap];
        for (const char of name) {
          charsMapCloned[idx(char)]--;
        }
        const filteredNames = names.filter((nameToFilter) => isNameInMap(nameToFilter, charsMapCloned));
        callStack.push({ charsMap: charsMapCloned, names: filteredNames, result: result + 1 });
      } else {
        const filteredNames = names.filter((nameToFilter) => isNameInMap(nameToFilter, charsMap));
        callStack.push({ charsMap, names: filteredNames, result });
      }
    }
  }
  return resultToReturn;
};

console.log(sc("wchegdoftrl"));
