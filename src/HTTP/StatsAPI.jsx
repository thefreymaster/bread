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
function getBatchData(ticker, types) {
    return axios.get('https://api.iextrading.com/1.0/stock/' + ticker + '/batch?types=' + types)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getStatsData, getQuote, getPrice, getBatchData }