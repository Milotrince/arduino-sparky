post('/robot/isready', {})
  .then((response) => {
    if (!response.ready) {
      window.location = '/connect'
    }
  }).catch((error) => {
    window.location = '/disconnected'
  })

setInterval(() => {
  post('/robot/ping', {})
    .then((response) => {
      if (!response.ready) {
        window.location = '/disconnected'
      }
    }).catch((error) => {
      window.location = '/disconnected'
    })
}, 1000 * 5)