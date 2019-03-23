

import axios from 'axios';
import { IEXENDPOINT, IEXTOKEN, IEXTOKEN_WITHAND } from './../Constants';

function getCompanyNews(symbol) {
    return axios.get(IEXENDPOINT + '/stock/' + symbol + '/news/last/3' + IEXTOKEN)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getCompanyNews }