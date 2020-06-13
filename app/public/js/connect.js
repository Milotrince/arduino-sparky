let robot = new Robot()
robot.on('error', (data) => {
  if (data.event == 'connect') {
    window.location = '/disconnected'
  }
})
robot.on('connect', (data) => {
    nextStage()
})
let port = ''

stages = [
  {
    text: "Hello! This is the client to our robot controller. (press enter)",
    type: true,
    input: true,
    action: function() {
      nextStage()
    }
  },
  {
    text: "Is the server computer connected to bluetooth with the robot? (y/n)",
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
    text: "Port? (leave blank to use default)",
    type: true,
    input: true,
    action: function(input) {
      port = input.trim()
      nextStage()
    }
  },
  {
    text: "Connecting...",
    type: true,
    input: false,
    action: function(input) {
      if (port.length > 0) {
        robot.connect(port)
      } else {
        robot.connect()
      }
    }
  },
  {
    text: "Connected! (press enter to go to home)",
    type: true,
    input: true,
    action: function() {
      window.location = '/'
    }
  }
]

presentStage()