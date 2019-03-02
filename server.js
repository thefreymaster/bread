var express = require('express');
var cors = require('cors');
var path = require("path");
var helmet = require('helmet');
var request = require("request");
const app = express()
app.use(helmet())
app.set('x-powered-by', 'Canvas 23 Studios');

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/build'));
app.use(cors({ origin: 'https://imperio2.herokuapp.com/' }));


app.get('/', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'index.html'));
});

var port = 9700;
var prodport = 9700;
var server = app.listen(process.env.PORT || port, function () {
    console.log('Running Express server on port: ' + port);
});

app.get('/api/quick-quote/:symbols', function (req, res) {
    let quick = {
        price: '',
        percentChange: ''
    }
    var options = {
        method: 'GET',
        url: 'https://api.iextrading.com/1.0/stock/market/batch?symbols=' + req.params.symbols + '&types=quote'
    };
    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        body = JSON.parse(body);
        let quick = {};
        for(let key of Object.keys(body)){
            quick[key] = {
                quote: {
                    changePercent: body[key].quote.changePercent, 
                    latestPrice: body[key].quote.latestPrice
                }
            }
        }
        res.send(body);
    });
})
app.post('/api/portfolio/total', (req, res) => {
    console.log(req.body.companies)
    let total = 0;
    for(let company of JSON.parse(req.body.companies)){
        total = total + 
    }
    res.send(req.body.companies)
})

app.get('/quote', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});
app.get('/add', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});
app.get('/login', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});
app.get('/rise', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});
app.get('*', function(req, res) {
    res.render('404 Error!  Page not found.');
  });