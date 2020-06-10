const robot = require('../robot')
const five = require('johnny-five')

robot.connect()
    .then(async () => {
        console.log('connected!')

        // robot._board.pinMode(0, five.Pin.INPUT)
        // await new Promise
        // robot._board.digitalRead(0, (value) => {
        //     console.log(value)
        // })
        await robot.ping()

        await robot._onExit()
        process.exit(0)

    }).catch((error) => {
        console.log(error)
        process.exit(1)
    })