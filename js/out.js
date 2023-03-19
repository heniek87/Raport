const out = (dom, data) => {

  dom.innerHTML = `
  <pre>${JSON.stringify(data, ' ', 2)}</pre>
  `
}
const countPcs = (start, stop, circleTime, pcsInsideBox, pcsZero, fullBoxes, pcsInActBox, scrap, breakTime) => {

  const removes = scrap + Math.round(breakTime * 60 / circleTime)

  const timeLess = (stop - new Date()) / 1000
  let
    seconds = (stop - start) / 1000,
    expected = Math.floor(seconds / circleTime) - removes,
    toMake = Math.round(timeLess / circleTime),
    actAll = pcsZero + (fullBoxes * pcsInsideBox) + pcsInActBox,
    lastBox = Math.floor(toMake / pcsInsideBox) + fullBoxes,
    lastBoxPcs = (toMake - (pcsInsideBox - pcsInActBox)) % pcsInsideBox,
    all = actAll + toMake,
    before = [],
    diff = expected - all
  if (timeLess < 0) {
    lastBox = fullBoxes
    toMake = 0
    all = actAll
    diff = expected - all
    lastBoxPcs = 0
    console.log("po czasie")
  }

  // const pcsToEnd = expected -


  return { expected, actAll, lastBox, lastBoxPcs, all, diff, before, toMake }
}
export { out, countPcs }