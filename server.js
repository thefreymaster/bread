var express = require('express');
var cors = require('cors');
var path = require("path");
var helmet = require('helmet')
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