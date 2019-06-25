import axios from 'axios';
import { IEXENDPOINT, IEXTOKEN_WITHAND } from '../Constants';


function getChartData(ticker, timeframe, interval) {
    return axios.get(IEXENDPOINT + '/' + ticker + '/chart/' + timeframe + '?chartInterval=' + interval + IEXTOKEN_WITHAND)
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