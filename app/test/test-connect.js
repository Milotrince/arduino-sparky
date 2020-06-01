const robot = require('../robot')

robot.connect()
    .then(async () => {
        console.log('connected!')
        await robot._onExit()
        process.exit(0)

    }).catch((error) => {
        console.log(error)
        process.exit(1)
    })