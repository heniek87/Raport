import { initStartStop } from './initTimes.js'
import { out, countPcs } from './out.js'
const d = document;
const dom = {
  start: d.querySelector('#start'),
  stop: d.querySelector('#stop'),
  circleTime: d.querySelector('#circleTime'),
  circleTimeOut: d.querySelector('text#circleTimeOut'),
  pcsInsideBox: d.querySelector('#pcsInsideBox'),
  pcsZero: d.querySelector('#pcsZero'),
  fullBoxes: d.querySelector('#fullBoxes'),
  pcsInActBox: d.querySelector('#pcsInActBox'),
  scrap: d.querySelector('#scrap'),
  breakTime: d.querySelector('#breakTime'),
  out: d.querySelector('#out')
}
const startStop = initStartStop()

let start = startStop.start,
  stop = startStop.stop,
  circleTime = 60,
  pcsInsideBox = 20,
  pcsZero = 0,
  fullBoxes = 0,
  pcsInActBox = 0,
  scrap = 0,
  breakTime = 0,
  shift = startStop.shift


dom.start.value = start.HI()
dom.stop.value = stop.HI()



const count = () => {
  const data = countPcs(start, stop, circleTime, pcsInsideBox, pcsZero, fullBoxes, pcsInActBox, scrap, breakTime)
  out(dom.out, data)
  return data
}

//EVENTS
const listen = (obj, hand) => {

  obj.addEventListener('change', hand)
  obj.addEventListener('input', hand)
}

const changeStartHandler = evt => {

  const [hours, minutes] = dom.start.value.split(":")
  start.setMinutes(minutes)
  start.setHours(hours)
  if (shift == 3) { // dokończyć dla 3 zmiany
    if (hours >= 22) {

      if (new Date().getHours() >= 22) start.setDate(new Date().getDate())
      else start.setDate(new Date().getDate() - 1)

    } else {
      if (new Date().getHours() >= 22) start.setDate(new Date().getDate() - 1)
      else start.setDate(new Date().getDate())

    }
  }
  count()
}
const changeStopHandler = evt => {
  const [hours, minutes] = dom.stop.value.split(":")
  stop.setMinutes(minutes)
  stop.setHours(hours)
  if (shift == 3) { // dokończyć dla 3 zmiany
    if (hours >= 22) {
      if (new Date().getHours() >= 22) stop.setDate(new Date().getDate())
      else stop.setDate(new Date().getDate() - 1)


    } else {
      if (new Date().getHours() >= 22) stop.setDate(new Date().getDate() - 1)
      else stop.setDate(new Date().getDate())


    }
    console.log((hours >= 22), (new Date().getHours() >= 22), stop)
  }
  count()
}



const breakTimeHandler = () => {
  breakTime = parseFloat(dom.breakTime.value)
  count()
}

const initCT = [6, 0, 0]//circle time array
const circleTimeHandler = (evt) => {
  initCT.push(parseFloat(dom.circleTime.value))
  dom.circleTime.value = ''
  initCT.shift()
  console.log(initCT)
  // const ct = parseFloat(dom.circleTime.value).toFixed(1)
  circleTime = parseFloat(`${initCT[0]}${initCT[1]}.${initCT[2]}`)

  dom.circleTimeOut.textContent = `${initCT[0]}${initCT[1]},${initCT[2]}s`
  count()
}

const scrapHandler = () => {
  scrap = parseFloat(dom.scrap.value)
  count()
}
const pcsInActBoxHandler = () => {
  pcsInActBox = parseFloat(dom.pcsInActBox.value)
  count()
}

const pcsInsideBoxHandler = () => {
  pcsInsideBox = parseFloat(dom.pcsInsideBox.value)
  count()
}

const pcsZeroHandler = () => {
  pcsZero = parseFloat(dom.pcsZero.value)
  count()
}

const fullBoxesHandler = () => {
  fullBoxes = parseFloat(dom.fullBoxes.value)
  count()
}

listen(dom.fullBoxes, fullBoxesHandler)
listen(dom.pcsZero, pcsZeroHandler)
listen(dom.pcsInsideBox, pcsInsideBoxHandler)
listen(dom.pcsInActBox, pcsInActBoxHandler)
listen(dom.scrap, scrapHandler)
listen(dom.circleTime, circleTimeHandler)
listen(dom.breakTime, breakTimeHandler)
listen(dom.start, changeStartHandler)
listen(dom.stop, changeStopHandler)
dom.fullBoxes.addEventListener('focus', (evt) => { evt.target.select() })
dom.pcsZero.addEventListener('focus', (evt) => { evt.target.select() })
dom.pcsInsideBox.addEventListener('focus', (evt) => { evt.target.select() })
dom.pcsInActBox.addEventListener('focus', (evt) => { evt.target.select() })
dom.scrap.addEventListener('focus', (evt) => { evt.target.select() })
dom.circleTime.addEventListener('focus', (evt) => { evt.target.select() })
dom.breakTime.addEventListener('focus', (evt) => { evt.target.select() })
dom.start.addEventListener('focus', (evt) => { evt.target.select() })
dom.stop.addEventListener('focus', (evt) => { evt.target.select() })


dom.start.addEventListener('click', () => {
  dom.start.showPicker()
})
dom.stop.addEventListener('click', () => {
  dom.stop.showPicker()
})


const setScrapsHandler = () => {
  scrap = 0
  const { diff } = count()

  dom.scrap.value = diff
  scrap = diff
  dom.out.innerHTML = ""
  count()

}

const setBreakTimeHandler = () => {
  breakTime = 0
  const { diff } = count()
  breakTime = Math.floor(diff * circleTime / 60)
  dom.breakTime.value = breakTime
  count()
}
const setStartHandler = () => {
  const { diff } = count()
  start.setMinutes(start.getMinutes() + Math.floor(diff * circleTime / 60))
  dom.start.value = start.HI()
  count()
}
const setStopHandler = () => {

  const { expected, actAll } = count()
  console.log(stop.toJSON())
  stop.setMinutes(stop.getMinutes() - Math.floor((expected - actAll) * circleTime / 60))
  console.log(stop.toJSON())
  dom.stop.value = stop.HI()

  count()

}


const holdEvent = (evt, cb) => {
  console.log(evt)
  let touched = true
  let holded = false
  evt.target.addEventListener('touchend', () => {
    touched = false
    if (!holded) {
      evt.target.focus()
      evt.target.click()

    }
  })
  evt.preventDefault()
  setTimeout(() => {

    holded = true
    if (touched) {
      navigator?.vibrate(100)
      cb()
    }
  }, 500)
}

dom.circleTimeOut.addEventListener('click', () => {
  dom.circleTime.focus()
  dom.circleTime.value = ''

})
dom.circleTime.addEventListener('focus', () => {
  dom.circleTimeOut.classList.add("red")

})
dom.circleTime.addEventListener('blur', () => {

  dom.circleTimeOut.classList.remove("red")
})
dom.scrap.addEventListener('touchstart', (e) => holdEvent(e, setScrapsHandler))
dom.breakTime.addEventListener('touchstart', e => holdEvent(e, setBreakTimeHandler))
dom.start.addEventListener('touchstart', (e) => holdEvent(e, setStartHandler))
dom.stop.addEventListener('touchstart', (e) => holdEvent(e, setStopHandler))
// dom.scrap.previousSibling.addEventListener('touchstart', setScrapsHandler)


count()
