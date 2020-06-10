const { Board, Motor, Servo, Pin } = require('johnny-five')
const events = require('events')
const pEvent = require('p-event')

function clamp(val, min, max) {
  return Math.min(Math.max(val, min), max)
}

let robot = {
  ready: false,
  connecting: false,

  defaults: {
    port: '/dev/tty.Sparky-DevB',
    left: {
      pins: {
        pwm: 5,
        dir: 4,
      },
      invertPWM: true
    },
    right: {
      pins: {
        pwm: 3,
        dir: 2,
      },
      invertPWM: true
    },
    shooter: {
      pins: {
        pwm: 6,
        dir: 7
      },
      invertPWM: true 
    },
    servo: {
      pin: 10,
      startAt: 0
    }
  },

  connect: (options) => {
    return new Promise((resolve, reject) => {
      if (!robot.connecting && !robot.ready) {
        robot.connecting = true
        robot.events = new events.EventEmitter()
        robot._options = Object.assign(robot.defaults, options)
        robot._board = new Board({ port: robot._options.port })
        robot._board.on("error", robot._onError)
        robot._board.on("ready", robot._onReady)
        // robot._board.on("info", robot._onLog)
        // robot._board.on("warn", robot._onLog)
        // robot._board.on("fail", robot._onLog)
        robot._board.on("exit", robot._onExit)
        resolve(Promise.race([
          pEvent(robot.events, 'ready'),
          pEvent(robot.events, 'error')
        ]))
      } else {
        reject('cannot connect twice')
      }
    })
  },

  drive: (x, y) => {
    if (robot.ready) {
      robot.left.setPower(y - x)
      robot.right.setPower(y + x)
    }
  },

  startShoot: (power=1) => {
    if (robot.ready) {
      robot.servo.to(90)
      robot.shooter.setPower(power)
    }
  },

  stopShoot: () => {
    if (robot.ready) {
      robot.shooter.setPower(0)
      robot.servo.home()
    }
  },

  stop: () => {
    if (robot.ready) {
      robot.servo.home()
      robot.servo.stop()
      robot.left.stop()
      robot.right.stop()
    }
  },

  sleep: (ms=1000) => {
    return new Promise(resolve => setTimeout(resolve, ms))
  },

  ping: (ms=3000) => {
    console.log('ping?')
    return new Promise((resolve, reject) => {
      if (robot.ready) {
        setTimeout(reject, ms)
        robot._board.digitalRead(0, function(value) {
          console.log('ping: '+value)
          resolve()
        })
      } else {
        reject()
      }
    })
  },

  _calcMotorPower: (val) => {
    return clamp(val, -1.0, 1.0) * 255
  },

  _sendMotorPower: (motor, power) => {
    let p = robot._calcMotorPower(power)
    if (p > 0) {
      motor.forward(p)
    } else if (p < 0) {
      motor.reverse(Math.abs(p))
    } else {
      motor.stop()
    }
  },


  _onReady: () => {
    console.log('board ready :D')
    robot.connecting = false

    // for ping
    robot._board.pinMode(0, Pin.INPUT)

    robot.left = robot._createMotor(robot._options['left'])
    robot.right = robot._createMotor(robot._options['right'])
    robot.shooter = robot._createMotor(robot._options['shooter'])
    robot.servo = robot._createServo(robot._options['servo'])

    robot._board.repl.inject({
      left: robot.left,
      right: robot.right,
      shooter: robot.shooter,
      servo: robot.servo
    })

    robot.ready = true
    robot.events.emit('ready')
  },

  _onError: (error) => {
    robot.events.emit('error')
  },

  _onLog: (event) => {
    console.log(`${event.type}: ${event.message}`)
  },

  _onExit: async () => {
    if (robot.ready) {
      console.log('stopping...')
      robot.stop()
      await robot.sleep()
    }
  },

  _createMotor: (opts) => {
    let motor = new Motor(opts)
    motor.setPower = (power) => {
      robot._sendMotorPower(motor, power)
    } 
    motor.on('ready', () => {
      motor.stop()
    })
    return motor
  },

  _createServo: (pin) => {
    let servo = new Servo(pin)
    servo.setPosition = (deg) => {
      servo.to(deg)
    } 
    return servo
  }

}

module.exports = robot