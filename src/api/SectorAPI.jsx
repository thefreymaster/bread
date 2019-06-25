
// https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Communication%20Services

import axios from 'axios';
import { IEXENDPOINT, IEXTOKEN, IEXTOKEN_WITHAND } from './../Constants';

function getSectorQuotes(sector) {
    return axios.get(IEXENDPOINT + '/stock/market/collection/sector?collectionName=' + sector + IEXTOKEN_WITHAND)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getSectorQuotes }