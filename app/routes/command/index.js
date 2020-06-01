const router = require('express').Router()
const robot = require('../../robot')

router.post('/connect', function(req, res, next) {
    if (!robot.ready) {
        let options = req.body
        robot.connect(options)
            .then(() => {
                res.status(200).send('ready')
            }).catch((error )=> {
                console.log('critical error :(')
                res.status(500).send(error)
                process.exit(1)
            })
    } else {
        res.status(200).send('already connected')
    }
})

router.post('/move', function(req, res, next) {
    if (robot.ready) {
        let power = req.body
        robot.drive(power.x, power.y)
        res.status(200).send('ok')
    } else {
        res.status(400).send('robot not connected :(')
    }
})

router.post('/shoot/start', function(req, res, next) {
    if (robot.ready) {
        robot.startShoot()
        res.status(200).send('ok')
    } else {
        res.status(400).send('robot not connected :(')
    }

})

router.post('/shoot/stop', function(req, res, next) {
    if (robot.ready) {
        robot.stopShoot()
        res.status(200).send('ok')
    } else {
        res.status(400).send('robot not connected :(')
    }
})

module.exports = router