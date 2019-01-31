import React from 'react';
import axios from 'axios';


function getChartData(ticker, timeframe, interval) {
    return axios.get('https://api.iextrading.com/1.0/stock/' + ticker + '/chart/' + timeframe + '?chartInterval=' + interval)
        .then(function (response) {
            let data = []
            for (let time of response.data) {
                data.push({
                    x: time.label,
                    y: time.close,
                    changeOverTime: time.changeOverTime
                })
            }
            return [{
                id: timeframe,
                data: data
            }];
        })
        .catch(function (error) {
            console.log(error);
        });
}

export { getChartData }