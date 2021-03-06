import axios from 'axios';
import { IEXENDPOINT } from './../Constants';


function getIEXStatus(ticker) {
    return axios.get(IEXENDPOINT + '/status')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getBreadStatus(ticker) {
    return axios.get('/api/status')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getIEXStatus, getBreadStatus }