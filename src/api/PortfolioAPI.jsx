import axios from 'axios';


function getPortfolioTotal(companies) {
    return axios.post('/api/portfolio/total', {
        companies: companies
    }).then(function (response) {
            return response
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getPortfolioTotal }