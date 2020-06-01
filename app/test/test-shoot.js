const robot = require('../robot')

robot.connect()
    .then(async () => {
        console.log('connected!')

        console.log('start shoot')
        robot.startShoot()
        await robot.sleep(2000)
        console.log('stop shoot')
        robot.stopShoot()

        await robot._onExit()
        process.exit(0)

    }).catch((error) => {
        console.log(error)
        process.exit(1)
    })