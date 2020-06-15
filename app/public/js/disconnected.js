post('/robot/isready', {})
  .then((response) => {
    if (!response.ready) {
      window.location = '/connect'
    }
  }).catch((error) => { })


stages = [
  {
    text: "Disconnected :(\nRestart the server, make sure everything is connected, and try again!",
    type: true,
    input: false,
    action: function() { }
  }
]

presentStage()

post('/app/shutdown', {})