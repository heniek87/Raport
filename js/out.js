const out = (dom, data) => {


  document.querySelector('#result').innerHTML = `

  <div class="before">
          <div class="before-1">

            <div id="boxBefore">${data.lastBox - 1}</div>
            <div id="boxBeforePcs">${data.pcsInsideBox}</div>
          </div>
          <div class="before-0">

            <div id="boxLast">${data.lastBox}</div>
            <div id="boxLastPcs">${data.lastBoxPcs}</div>
          </div>
        </div>
        <div class="after">
          <div class="all-pcs" id="allPcs">${data.all}</div>
          <div class="diff ${data.diff > 0 ? 'red' : ''}" id="diffPcs">${data.diff == 0 ? '' : data.diff < 0 ? '+' + data.diff * -1 : data.diff * -1}</div>
        </div>
      </div>
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


  return { expected, actAll, lastBox, lastBoxPcs, all, diff, before, toMake, pcsInsideBox }
}
export { out, countPcs }