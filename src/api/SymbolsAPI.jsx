import axios from 'axios';

function getAllSymbols() {
    return axios.get('https://api.iextrading.com/1.0/ref-data/symbols')
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getAllSymbols }