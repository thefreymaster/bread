import axios from 'axios';


function getStatsData(ticker) {
    return axios.get('https://api.iextrading.com/1.0/stock/' + ticker + '/stats')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getQuote(ticker) {
    return axios.get('https://api.iextrading.com/1.0/stock/' + ticker + '/quote')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getPrice(ticker) {
    return axios.get('https://api.iextrading.com/1.0/stock/' + ticker + '/price')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getBatchData(ticker, types, filter) {
    return axios.get('https://api.iextrading.com/1.0/stock/' + ticker + '/batch?types=' + types + '&filter=' + filter)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getBatchDataGroupedByCompany(ticker, types) {
    return axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + ticker + '&types=' + types)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getQuickQuotes(tickers, filter) {
    return axios.get('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + tickers + '&types=quote&filter=' + filter)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}


export { getStatsData, getQuote, getPrice, getBatchData, getQuickQuotes }