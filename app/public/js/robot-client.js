class Robot extends EventEmitter3 {

  constructor() {
    super()
    this.isReady = false

    // default listener actions
    this.on('warn', (data) => {
      console.warn(data.message)
    })
    this.on('error', (data) => {
      if (data.message) {
        console.error(data.message)
      }
      if (data.error) {
        console.error(data.error)
      }
    })
  }

  move(x, y) {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('command/move', {x, y}, 'move')
  }

  connect(port) {
    this._post('command/connect', {port}, 'connect')
      .then(() => {
        this.isReady = true
      })
  }

  startShoot(power=1) {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('command/shoot/start', {power}, 'startShoot')
  }

  stopShoot() {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('command/shoot/stop', {}, 'stopShoot')
  }

  _motor(name) {
    let motor = {
      setPower: function(power) {
        this._post('command/motor/power', {power}, 'setPower')
      }
    }
  }

  _post(route, data={}, event) {
    return fetch(route, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
    .then((response) => {
      if (response.ok) {
        // return response.json()
      } else {
        throw new Error('server responded with not ok')
      }
    }).then((json) => {
      // console.log(json)
      this.emit(event, {})
    }).catch((error) => {
      this.emit('error', {error, message: 'failed at: '+event, event})
    }) 
  }

}
