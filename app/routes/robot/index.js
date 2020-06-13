const router = require('express').Router()
const robot = require('../../robot')

router.post('/isready', function(req, res, next) {
    res.status(200).json({ready: robot.ready})
})

router.post('/ping', function(req, res, next) {
    if (robot.ready) {
        robot.ping()
            .then(() => {
                res.status(200).json({ready: true})
            }).catch(() => {
                res.status(500).json({ready: false})
            })
    } else {
        res.status(200).json({ready: false})
    }
})

router.post('/connect', function(req, res, next) {
    if (!robot.ready) {
        let options = req.body
        robot.connect(options)
            .then(() => {
                res.status(200).send('ready')
            }).catch((error )=> {
                console.log('critical error :(')
                res.status(500).send(error)
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

router.post('/stop', function(req, res, next) {
    if (robot.ready) {
        robot.stop()
        res.status(200).send('ok')
    } else {
        res.status(400).send('robot not connected :(')
    }
})



module.exports = router