import axios from 'axios';
import { IEXENDPOINT, IEXTOKEN, IEXTOKEN_WITHAND } from './../Constants';

function getAllSymbols() {
    return axios.get(IEXENDPOINT + '/ref-data/symbols' + IEXTOKEN)
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getAllSymbols }