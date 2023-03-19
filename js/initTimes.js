Date.prototype.HI = function () {

  return `${this.getHours() < 9 ? '0' : ''}${this.getHours()}:${this.getMinutes() < 9 ? '0' : ''}${this.getMinutes()}`
}
const initStartStop = () => {

  const now = new Date()//new Date("2023-03-19 03:10:00")
  let start = new Date()
  let stop = new Date()
  let shift = 1
  if (now.getHours() >= 6 && now.getHours() < 14) start.setHours(5)
  else if (now.getHours() >= 14 && now.getHours() < 22) {
    shift = 2
    start.setHours(13)
  } else {
    shift = 3
    start.setHours(21)
    if (now.getHours() < 6) start.setDate(now.getDate() - 1)
    else start.setDate(now.getDate())
  }
  start.setMinutes(55)
  stop = new Date(start)
  stop.setHours(stop.getHours() + 8)


  return { start, stop, shift }
}

export { initStartStop }