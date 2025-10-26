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

const getIndexOfNumber = (num) => {
    if (baseIndexes[num]) {
        return baseIndexes[num];
    }

    const indexes = generateIndexesByStringSize(num.length);
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
    const restPositionInOwnGroup =
        getIndexOfNumber(rest) - indexes[rest.length - 1];
    const result = base + restPositionInOwnGroup * variants - decrease;
    return result;
};

const getNextInlineSingleChar = (num) => {
    if (num <= "0") {
        return "0";
    }

    if (num <= "1") {
        return "1";
    }

    if (num <= "6") {
        return "6";
    }

    if (num <= "8") {
        return "8";
    }

    return "9";
};

const getNextSingleChar = (num) => {
    if (num <= "0") {
        return "0";
    }

    if (num <= "1") {
        return "1";
    }

    return "8";
};

const getNextDoubleChar = (num) => {
    if (num <= "00") {
        return "11";
    }

    if (num <= "11") {
        return "69";
    }

    if (num <= "69") {
        return "88";
    }

    if (num <= "88") {
        return "96";
    }

    return "96";
};

const getOppositeChar = (char) => {
    if (char === "9") {
        return "6";
    }

    if (char === "6") {
        return "9";
    }

    return char;
};

const generateStrobo = (num) => {
    const nextLine = [];

    let i = 0;
    let j = num.length - 1;
    let drop = false;

    while (i < j) {
        if (drop) {
            nextLine[i] = "0";
            nextLine[j] = "0";
        } else {
            const nextChar = getNextInlineSingleChar(num[i]);
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
        nextLine[i] = getNextSingleChar(num[i]);
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
                const nextChar = getNextSingleChar(nextLine[i]);
                if (nextChar === nextLine[i]) {
                    nextLine[i] = "0";
                } else {
                    reminder = false;
                    nextLine[i] = nextChar;
                }
            } else {
                const char = nextLine[i] + nextLine[j];
                const nextChar = getNextDoubleChar(char);
                console.log(char, nextChar);
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

    return [num, nextLine.join("")];
};

console.log(generateStrobo("9009"));
