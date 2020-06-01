const express = require('express')
const app = express()
const port = process.env.port || 3000

app.use(express.static(__dirname + '/public'));
app.set('views', (__dirname + '/views'));

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const nunjucks = require('nunjucks')
nunjucks.configure(__dirname + '/views', { noCache: true })
app.engine('html', nunjucks.render)
app.set('view engine', 'html')

// routes
app.use('/command', require('./routes/command'))


app.get('/', (req, res) => {
    res.render('control-center.html')
})

app.get('/mycode/*', (req, res) => {
    res.render('mycode.html')
})

app.get('/drive', (req, res) => {
    res.render('driver-station.html')
})

app.get('*', function(req, res){
    res.redirect('/');
  });


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})