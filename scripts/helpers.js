const xpTable = [8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 21, 22, 25, 27, 29, 32, 35, 39, 42, 46, 51, 55, 60, 66, 72, 79, 87, 95, 104, 114, 124, 136, 149, 163, 178, 195, 213, 233, 255, 279, 306, 334, 366, 400, 438, 479, 524, 574, 628, 687, 752, 822, 900, 985, 1077, 1179, 1290, 1411, 1544, 1690, 1849, 2023, 2213, 2422, 2650, 2899, 3172, 3471, 3798, 4156, 4547, 4975, 5444, 5956, 6517, 7131, 7803, 8538, 9342, 10221, 11184, 12237, 13389, 14650, 16030, 17540, 19192, 20999, 22976, 25140, 27508, 30098, 32933, 36034, 39428, 43141, 47204, 51649];

const getLevel = (xp) => {
  let xpTotal = 0;
  let level = 1;

  for (let i = 0; i < xpTable.length; i++) {
    xpTotal += xpTable[i];

    if (xpTotal > xp) break;
    level++
  }

  return level;
}

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("lifescape"));
}

const setLocalStorage = (data) => {
  localStorage.setItem("lifescape", JSON.stringify(data));
}

export default {
  xpTable,
  getLevel,
  getLocalStorage,
  setLocalStorage,
}
