const robot = require('../robot')

robot.connect()
    .then(async () => {
        console.log('connected!')

        for (let i = 10; i >= -10; i -= 2) {
            console.log(i/10)
            robot.drive(0, i/10)
            await robot.sleep(500)
        }

        await robot._onExit()
        process.exit(0)

    }).catch((error) => {
        console.log(error)
        process.exit(1)
    })