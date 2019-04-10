
// https://api.iextrading.com/1.0/stock/market/collection/sector?collectionName=Communication%20Services

import axios from 'axios';
import { IEXENDPOINTV1, IEXTOKEN, IEXTOKEN_WITHAND } from './../Constants';

function getSectorQuotes(sector) {
    return axios.get(IEXENDPOINTV1 + '/stock/market/collection/sector?collectionName=' + sector)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getSectorQuotes }