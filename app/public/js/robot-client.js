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

    this.shooter = this._motor('shooter')
    this.left = this._motor('left')
    this.right = this._motor('right')

  }

  drive(x, y) {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('/robot/move', {x, y}, 'move')
  }

  connect(port) {
    this._post('/robot/connect', {port}, 'connect')
      .then(() => {
        this.isReady = true
      })
  }

  startShoot(power=1) {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('/robot/shoot/start', {power}, 'startShoot')
  }

  stopShoot() {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('/robot/shoot/stop', {}, 'stopShoot')
  }

  stop() {
    if (!this.isReady) {
      this.emit('warn', {message: 'tried robot command while robot is not connected'})
      return
    }
    this._post('/robot/stop', {}, 'stop')
  }

  _motor(name) {
    return {
      setPower: function(power) {
        this._post('/robot/motor/power', {name, power}, 'setPower')
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
        this.emit(event, {})
      } else {
        throw new Error('server responded with not ok')
      }
    }).catch((error) => {
      this.emit('error', {error, message: 'failed at: '+event, event})
    }) 
  }

}

if ($('#home').length) {
  $('#home').click(function(event) {
    if (typeof(robot) !== 'undefined') {
      event.preventDefault()
      robot.stop()
      window.location = '/'
    }
  })
}