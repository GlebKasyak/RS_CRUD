const subString = (string, startSymbol, endSymbol) =>
  string.substring(startSymbol, endSymbol);

const reduceObjToString = obj => {
  return Object.entries(obj).reduce((acc, curr) => {
    acc = `${acc}${curr[0]} = ${curr[1]}, `;
    return acc;
  }, '');
};

const getActualRequestDurationInMilliseconds = start => {
  const NS_PER_SEC = 1e9;
  const NS_TO_MS = 1e6;
  const diff = process.hrtime(start);
  const duration = (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS;
  return `+${duration.toLocaleString()}ms`;
};

module.exports = {
  subString,
  reduceObjToString,
  getActualRequestDurationInMilliseconds
};
