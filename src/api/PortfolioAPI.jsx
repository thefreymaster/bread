import axios from 'axios';


function getPortfolioTotal(companies, quotes) {
    return axios.post('/api/portfolio/total', {
        companies: companies, 
        quotes: quotes
    }).then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getBest(companies, quotes) {
    return axios.post('/api/portfolio/best', {
        companies: companies, 
        quotes: quotes
    }).then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}
function getWorst(companies, quotes) {
    return axios.post('/api/portfolio/worst', {
        companies: companies, 
        quotes: quotes
    }).then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}
export { getPortfolioTotal, getBest, getWorst }