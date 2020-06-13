const router = require('express').Router()
const glob = require('glob')

router.post('/mycode', function(req, res, next) {
    glob('mycode/**/*.js', {nonull: true}, function (error, files) {
        if (error) {
            res.status(500).send(error.message)
        } else {
            res.status(200).json(files)
        }
    })
})

router.post('/shutdown', function(req, res, next) {
    res.status(200).send('ok')
    print('exiting...')
    process.exit(0)
})

module.exports = router