post('/robot/isready', {})
  .then((response) => {
    if (!response.ready) {
      window.location = '/connect'
    }
  })