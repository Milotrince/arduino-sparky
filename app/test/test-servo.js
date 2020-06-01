const robot = require('../robot')

robot.connect()
    .then(async () => {
        console.log('connected!')

        for (let i = 0; i <= 180; i += 45) {
            console.log(i)
            robot.servo.to(i)
            await robot.sleep(500)
        }

        await robot._onExit()
        process.exit(0)

    }).catch((error) => {
        console.log(error)
        process.exit(1)
    })