const oddDecreaseMap = {
  0: 2,
  1: 1,
  8: 0,
};

const evenDecreaseMap = {
  "00": 4,
  11: 3,
  69: 2,
  88: 1,
  96: 0,
};

const baseIndexes = {
  0: 0,
  1: 1,
  8: 2,
  11: 3,
  69: 4,
  88: 5,
  96: 6,
};

const generateIndexesByStringSize = (n) => {
  let counts = [0, 3, 4];
  let indexes = [0, 2, 6];

  for (let i = 3; i <= n; i++) {
    if (i % 2 === 0) {
      counts[i] = counts[i - 2] * 5;
    } else {
      counts[i] = counts[i - 1] * 3;
    }

    indexes[i] = indexes[i - 1] + counts[i];
  }

  return indexes;
};

const createIdx = (n) => {
  const indexes = generateIndexesByStringSize(n);

  const _createIdx = (num) => {
    if (baseIndexes[num] !== undefined) {
      return baseIndexes[num];
    }

    const middle = num.length / 2;
    let rest, nextNum, variants, decrease;

    if (num.length % 2 === 0) {
      rest = num.slice(0, middle - 1) + num.slice(middle + 1);
      nextNum = num.slice(middle - 1, middle + 1);
      variants = 5;
      decrease = evenDecreaseMap[nextNum];
    } else {
      rest = num.slice(0, middle) + num.slice(middle + 1);
      nextNum = num.slice(middle, middle + 1);
      variants = 3;
      decrease = oddDecreaseMap[nextNum];
    }

    const base = indexes[num.length - 1];

    const restPositionInOwnGroup = _createIdx(rest) - indexes[rest.length - 1];
    const result = base + restPositionInOwnGroup * variants - decrease;
    return result;
  };

  return _createIdx;
};

const singleRound = (num) => (num <= "0" && "0") || (num <= "1" && "1") || (num <= "6" && "6") || (num <= "8" && "8") || "9";

const singleRoundOdd = (num) => (num <= "0" && "0") || (num <= "1" && "1") || "8";

const singleIncr = (num) => (num <= "0" && "1") || (num <= "1" && "8") || "8";

const doubleIncr = (num) => (num <= "00" && "11") || (num <= "11" && "69") || (num <= "88" && "96") || "96";

const getOppositeChar = (char) => (char === "9" && "6") || (char === "6" && "9") || char;

const generateNextStrobogramNumber = (num) => {
  if (num === "0") {
    return "0";
  }

  const nextLine = [];

  let i = 0;
  let j = num.length - 1;
  let drop = false;

  while (i < j) {
    if (drop) {
      nextLine[i] = "0";
      nextLine[j] = "0";
    } else {
      const nextChar = singleRound(num[i]);
      if (nextChar !== num[i]) {
        drop = true;
      }

      nextLine[i] = nextChar;
      nextLine[j] = getOppositeChar(nextChar);
    }

    i++;
    j--;
  }

  if (i === j) {
    if (drop) {
      nextLine[i] = "0";
    } else {
      nextLine[i] = singleRoundOdd(num[i]);
    }
  }

  if (num > nextLine.join("")) {
    let i, j;

    if (nextLine.length % 2 === 0) {
      i = nextLine.length / 2 - 1;
      j = nextLine.length / 2;
    } else {
      i = j = Math.floor(nextLine.length / 2);
    }

    let reminder = true;

    while (reminder) {
      if (i < 0 || j >= nextLine.length) break;

      if (i === j) {
        const nextChar = singleIncr(nextLine[i]);
        if (nextChar === nextLine[i]) {
          nextLine[i] = "0";
        } else {
          reminder = false;
          nextLine[i] = nextChar;
        }
      } else {
        const char = nextLine[i] + nextLine[j];
        const nextChar = doubleIncr(char);
        if (nextChar === char) {
          nextLine[i] = "0";
          nextLine[j] = "0";
        } else {
          reminder = false;
          nextLine[i] = nextChar[0];
          nextLine[j] = nextChar[1];
        }
      }

      i--;
      j++;
    }
  }

  if (nextLine[0] === "0") {
    nextLine[0] = "1";
    nextLine.push("1");
  }

  return nextLine.join("");
};

const upsideDown = (a, b) => {
  const idx = createIdx(b.length);

  const aIdx = idx(generateNextStrobogramNumber(a));
  const bNext = generateNextStrobogramNumber(b);

  let bIdx = idx(bNext);
  bIdx = bNext !== b ? bIdx - 1 : bIdx;

  return bIdx - aIdx + 1;
};
