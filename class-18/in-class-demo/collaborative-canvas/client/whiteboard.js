const socket = io('http://localhost:3000')

const canvas = document.getElementById('whiteboard')
const context = canvas.getContext('2d')

canvas.addEventListener('mousedown', onMouseDown, false)
canvas.addEventListener('mouseup', onMouseUp, false)
canvas.addEventListener('mouseout', onMouseUp, false)
canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false)

canvas.addEventListener('touchstart', onMouseDown, false)
canvas.addEventListener('touchend', onMouseUp, false)
canvas.addEventListener('touchcancel', onMouseUp, false)
canvas.addEventListener('touchmove', throttle(onMouseMove, 10), false)

function throttle (callback, delay) {
  let previousTime = new Date().getTime()
  return function () {
    const time = new Date().getTime()
    if ((time - previousTime) >= delay) {
      previousTime = time
      callback.apply(null, arguments)
    }
  }
}

let drawing = false
let current = {
  x: null,
  y: null,
  color: 'black'
}

const colors = document.getElementsByClassName('color')
for (let i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', function (e) {
    current.color = e.target.className.split(' ')[1]
  })
}

function onMouseDown (e) {
  drawing = true
  current.x = e.clientX || e.touches[0].clientX
  current.y = e.clientY || e.touches[0].clientY
}

function onMouseUp (e) {
  if (!drawing) return
  drawing = false
  const targetX = e.clientX || e.touches[0].clientX
  const targetY = e.clientY || e.touches[0].clientY
  drawLine(current.x, current.y, targetX, targetY, current.color, true)
}

function onMouseMove (e) {
  if (!drawing) return
  const targetX = e.clientX || e.touches[0].clientX
  const targetY = e.clientY || e.touches[0].clientY
  drawLine(current.x, current.y, targetX, targetY, current.color, true)
  current.x = targetX
  current.y = targetY
}

// draw from currentX, currentY, to targetX, targetY
function drawLine (x0, y0, x1, y1, color) {
  context.beginPath()
  context.moveTo(x0, y0)
  context.lineTo(x1, y1)
  context.strokeStyle = color
  context.lineWidth = 2
  context.stroke()
  context.closePath()

  const w = canvas.width
  const h = canvas.height

  socket.emit('drawing', {
    x0: x0 / w,
    y0: y0 / h,
    x1: x1 / w,
    y1: y1 / h,
    color: color
  })
}

socket.on('drawing', function (data) {
  const w = canvas.width
  const h = canvas.height

  drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color)
})

// make the canvas fill its parent
function onResize () {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
}
window.addEventListener('resize', onResize, false)
onResize()
