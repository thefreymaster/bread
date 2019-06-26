import { getBulkQuotes } from "./StatsAPI";
import { getPercentChange, getDayOfWeek, getMinutesOfDay, getHourOfDay, determineIfMarketsAreOpen } from "../components/HelperFunctions/Helper";
import { showNotification } from '../components/HelperFunctions/Notifications';
import { GREEN, FILTER, RED } from "../Constants";



export const getQuotesData = (companies, dispatch) => {
    let symbols = [];
    for (let symbol in companies) {
        symbols.push(companies[symbol].symbol)
    }
    let index = 0;
    let quotes = getBulkQuotes(symbols, FILTER);
    let market = determineIfMarketsAreOpen(getDayOfWeek(), getHourOfDay(), getMinutesOfDay());
    quotes.then(response => {
        for (let company in response) {

            const { quote } = response[company];
            let change = getPercentChange(quote);
            // companies[index]['quote'] = quote;
            if (parseFloat(change) > 5 && market) {
                showNotification(quote.companyName, company + ' is up ' + getPercentChange(quote) + '% today.', GREEN, 'rise');
            }
            if (parseFloat(change) < -5 && market) {
                showNotification(quote.companyName, company + ' is down ' + getPercentChange(quote) + '% today.', RED, 'fall');
            }
            index++;
            dispatch({ type: "POPULATE_QUOTE_DATA", payload: {quote, symbol: quote.symbol} })

        }
        // that.props.addQuotesToStore(response);
        // that.getPortfolioData();
        // that.fetchingTrackedCompaniesComplete();
    })
}
