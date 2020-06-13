let robot = new Robot()
robot.on('error', (data) => {
  if (joystick) {
    joystick.destroy()
    $('#controller').css('opacity', '0')
    $('#controller').css('pointer-events', 'none')
  }
  if (data.event == 'connect') {
    window.location = '/disconnected'
  }
})
robot.on('connect', (data) => {
    nextStage()
})

let joystick = null
let lastMoveTime = new Date()
let data = { x: 0, y: 0, shooting: false }
stages = [
  {
    text: "Connecting...",
    type: true,
    input: false,
    action: function() {
      robot.connect()
    }
  },
  {
    text: "Connected!",
    type: true,
    input: false,
    action: function() {
      createJoystick()
      showController()
    }
  }
]


function createJoystick() {
  joystick = joystickjs.create({
    zone: document.getElementById('joystick'),
    mode: 'dynamic',
    position: { left: '75%', top: '40%' },
    color: '#ffd900',
    size: 200
  })
  joystick.on('end', function(event, data) {
    setDataText({x:0, y:0})
    robot.drive(0, 0)
  })
  joystick.on('move', function(event, data) {
    let x = Math.cos(data.angle.radian)
    let y = Math.sin(data.angle.radian)
    setDataText({x, y})
    let now = new Date()
    if (now - lastMoveTime > 100) {
      robot.drive(x, y)
      lastMoveTime = now
    }
  })
}

function showController() {
  $('#text').append($(`<p id='data'></p>`))
  setDataText()
  $('#controller').css('opacity', '1')
  $('#controller').css('pointer-events', 'all')

  $('#button').on('mousedown touchstart', function() {
    robot.startShoot()
    setDataText({shooting:true})
  })
  $('#button').on('mouseup touchend', function() {
    robot.stopShoot()
    setDataText({shooting:false})
  })

}


presentStage()