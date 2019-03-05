var express = require('express');
var cors = require('cors');
var path = require("path");
var helmet = require('helmet');
var request = require("request");
require('dotenv').config()
const app = express()
app.use(helmet())
app.set('x-powered-by', 'Canvas 23 Studios');

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/build'));
app.use(cors({ origin: 'https://imperio2.herokuapp.com/' }));

const IEXENDPOINT = 'https://cloud.iexapis.com/beta/';
const IEXTOKEN_WITHAND = '&token=' + process.env.REACT_APP_IEX_TOKEN



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
        for (let key of Object.keys(body)) {
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
    // console.log(req.body.companies)
    let companies = req.body.companies;
    let quotes = req.body.quotes;
    let total = 0;
    let symbols = []
    for (let company of companies) {
        total = total + company.shares.count * company.shares.price
        symbols.push(company.symbol)
    }

    let currentTotal = 0;
    let previousTotal = 0;
    let gainer = {};
    let loser = {};
    let previousCompanySymbol = '';

    // console.log(companies);
    for (let company of companies) {
        currentTotal = currentTotal + (quotes[company.symbol].quote.latestPrice * company.shares.count);
        previousTotal = previousTotal + (quotes[company.symbol].quote.previousClose * company.shares.count);

        if (previousCompanySymbol === '') {
            if (quotes[company.symbol].quote.changePercent > 0) {
                gainer = company;
                gainer['changePercent'] = quotes[company.symbol].quote.changePercent * 100;
                gainer['price'] = quotes[company.symbol].quote.latestPrice;
                previousCompanySymbol = company.symbol;
            }
        }
        else {
            if (quotes[company.symbol].quote && quotes[company.symbol].quote.changePercent > quotes[gainer.symbol].quote.changePercent) {
                gainer = company;
                gainer['changePercent'] = quotes[company.symbol].quote.changePercent * 100;
                gainer['price'] = quotes[company.symbol].quote.latestPrice;
                previousCompanySymbol = company.symbol;
            }
        }
    }
    previousCompanySymbol = '';
    for (let company of companies) {
        // currentTotal = currentTotal + (quotes[company.symbol].quote.latestPrice * company.shares.count);
        if (previousCompanySymbol === '') {
            if (quotes[company.symbol].quote.changePercent < 0) {
                loser = company;
                loser['changePercent'] = quotes[company.symbol].quote.changePercent * 100;
                loser['price'] = quotes[company.symbol].quote.latestPrice;
                previousCompanySymbol = company.symbol;
            }
        }
        else {
            if (quotes[company.symbol].quote && quotes[company.symbol].quote.changePercent < quotes[loser.symbol].quote.changePercent) {
                loser = company;
                loser['changePercent'] = quotes[company.symbol].quote.changePercent * 100;
                loser['price'] = quotes[company.symbol].quote.latestPrice;
                previousCompanySymbol = company.symbol;
            }
        }
    }
    let percentChange = ((currentTotal - previousTotal) / currentTotal * 100).toFixed(2)
    res.send({
        status: 200,
        total: total,
        currentTotal: currentTotal,
        previousTotal: previousTotal,
        percentChange: percentChange,
        gainer: gainer,
        loser: loser,
        quotes: quotes
    })
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
app.get('/portfolio', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});
app.get('*', function (req, res) {
    response.sendFile(path.resolve(__dirname, 'build/index.html'));
});