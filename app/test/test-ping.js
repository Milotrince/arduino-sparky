const robot = require('../robot')
const five = require('johnny-five')

robot.connect()
    .then(async () => {
        console.log('connected!')

        await robot.ping()

        await robot._onExit()
        process.exit(0)

    }).catch((error) => {
        console.log(error)
        process.exit(1)
    })