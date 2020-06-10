let robot = new Robot()
robot.on('error', (data) => {
  if (data.event == 'connect') {
    nextStage()
  }
})
robot.on('connect', (data) => {
    index++
    nextStage()
})

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
    text: "Connected! (press enter to go to home)",
    type: true,
    input: true,
    action: function() {
      window.location = '/'

    }
  },
  {
    text: "Disconnected :(\nRestart the server, make sure everything is connected, and try again!",
    type: true,
    input: false,
    action: function() { }
  },
]

presentStage()