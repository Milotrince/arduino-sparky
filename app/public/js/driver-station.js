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
    text: "Hello! This is our robot controller. (press enter)",
    type: true,
    input: true,
    action: function() {
      nextStage()
    }
  },
  {
    text: "Is the computer connected to bluetooth with the robot? (y/n)",
    type: true,
    input: true,
    action: function(input) {
      if (input.toLowerCase().includes('y')) {
        nextStage()
      } else {
        presentStage()
      }
    }
  },
  {
    text: "Connecting...",
    type: true,
    input: false,
    action: function(input) {
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
    robot.move(0, 0)
  })
  joystick.on('move', function(event, data) {
    let x = Math.cos(data.angle.radian)
    let y = Math.sin(data.angle.radian)
    setDataText({x, y})
    let now = new Date()
    if (now - lastMoveTime > 100) {
      robot.move(x, y)
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
    console.log('touchend')
    robot.stopShoot()
    setDataText({shooting:false})
  })

}


presentStage()