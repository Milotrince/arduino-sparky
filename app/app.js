const express = require('express')
const app = express()
const port = process.env.port || 3000

app.use(express.static(__dirname + '/public'))
app.use(express.static('mycode'))
app.set('views', (__dirname + '/views'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const nunjucks = require('nunjucks')
nunjucks.configure(__dirname + '/views', { noCache: true })
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

// routes
app.use('/app', require('./routes/app'))
app.use('/robot', require('./routes/robot'))


app.get('/', (req, res) => {
    res.render('home.html')
})

app.get('/mycode/:filename', (req, res) => {
    res.render('mycode.html', req.params)
})

app.get('/drive', (req, res) => {
    res.render('driver-station.html')
})

app.get('/connect', (req, res) => {
    res.render('connect.html')
})

app.get('*', function(req, res){
    res.redirect('/')
  })


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})