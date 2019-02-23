import axios from 'axios';
import { IEXENDPOINT, IEXTOKEN, IEXTOKEN_WITHAND } from './../Constants';


function getStatsData(ticker) {
    return axios.get(IEXENDPOINT + '/stock/' + ticker + '/stats' + IEXTOKEN)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getQuote(ticker) {
    return axios.get(IEXENDPOINT + '/stock/' + ticker + '/quote'  + IEXTOKEN)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getPrice(ticker) {
    return axios.get(IEXENDPOINT + '/stock/' + ticker + '/price'  + IEXTOKEN)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getBatchData(ticker, types, filter) {
    return axios.get(IEXENDPOINT + '/stock/' + ticker + '/batch?types=' + types + IEXTOKEN_WITHAND)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getBatchDataGroupedByCompany(ticker, types) {
    return axios.get(IEXENDPOINT + '/stock/market/batch?symbols=' + ticker + '&types=' + types  + IEXTOKEN_WITHAND)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getQuickQuotes(tickers, filter) {
    return axios.get(IEXENDPOINT + '/stock/market/batch?symbols=' + tickers + '&types=quote&filter=' + filter  + IEXTOKEN_WITHAND)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}


export { getStatsData, getQuote, getPrice, getBatchData, getQuickQuotes }