let robot = new Robot()
robot.on('error', (data) => {
  if (joystick) {
    joystick.destroy()
    $('#controller').css('opacity', '0')
    $('#controller').css('pointer-events', 'none')
    nextStage()
  }
  else if (data.event == 'connect') {
    nextStage()
  }
})
robot.on('connect', (data) => {
    index++
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
    text: "Failed to connect :(\nRestart the server, make sure everything is connected, and try again!",
    type: true,
    input: false,
    action: function() { }
  },
  {
    text: "Connected!",
    type: true,
    input: false,
    action: function() {
      createJoystick()
      showController()
    }
  },
  {
    text: "Disconnected :(\nRestart the server, make sure everything is connected, and try again!",
    type: true,
    input: false,
    action: function() { }
  },

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