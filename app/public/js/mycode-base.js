let robot = new Robot()

robot.on('error', (data) => {
    nextStage()
})
robot.on('connect', (data) => {
    index++
    nextStage()
})

let data = {}
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
    text: "Connected!\nPress enter to run.",
    type: true,
    input: true,
    action: function() {
        nextStage()
    }
  },
  {
    text: "Running...",
    type: true,
    input: false,
    action: async function() {
        await run()
        nextStage()
    }
  },
  {
    text: "Complete!",
    type: true,
    input: false,
    action: function() {
    }
  },
]

presentStage()