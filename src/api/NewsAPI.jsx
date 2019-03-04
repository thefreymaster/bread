

import axios from 'axios';
import { IEXENDPOINT, IEXTOKEN, IEXTOKEN_WITHAND } from './../Constants';

function getSymbolNews(symbol) {
    return axios.get(IEXENDPOINT + '/stock/' + symbol + '/news' + IEXTOKEN)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getSymbolNews }