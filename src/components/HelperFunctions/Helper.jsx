function calculateTotalChange(count, purchasePrice, currentPrice) {
    return (((count * currentPrice)-(purchasePrice * count))/(purchasePrice * count)*100).toFixed(2) + '%'
}
function getPercentChange(quote) {
    return ((quote.latestPrice - quote.previousClose) / quote.latestPrice * 100).toFixed(2)
}
function getPercentChangeGeneric(latestValue, previousValue) {
    return ((latestValue - previousValue) / latestValue * 100).toFixed(2)
}
function getDayOfWeek(){
    return new Date().getUTCDay()
}
function getHourOfDay(){
    return new Date().getUTCHours();
}
function getMinutesOfDay(){
    return new Date().getUTCMinutes();
}
function determineIfMarketsAreOpen(day, hour, minute){
    if(day !== 0 && day !== 6){
        if(hour >= 14 && hour < 21){
            if(hour === 14)
            {
                if(minute > 30)
                {
                    return true;
                }
                else{
                    return false
                }
            }
            else{
                return true
            }
        }
        else{
            return false;
        }
    }
    else{
        return false;
    }
}
function findIndex(symbol, trackedCompanies) {
    for (let index of Object.keys(trackedCompanies)) {
        if (trackedCompanies[index].symbol === symbol) {
            return index;
        }
    }
}

function sortCompaniesAscending(companies){
    companies.sort(function (a, b) {
        if (a.quote.changePercent < b.quote.changePercent) { return -1; }
        if (a.quote.changePercent > b.quote.changePercent) { return 1; }
        return 0;
      })
    return companies;
}

function sortCompaniesDescending(companies){
    companies.sort(function (a, b) {
        if (a.quote.changePercent > b.quote.changePercent) { return -1; }
        if (a.quote.changePercent < b.quote.changePercent) { return 1; }
        return 0;
      })
    return companies;
}

function sortCompaniesABC(companies){
    companies.sort(function (a, b) {
        if (a.symbol < b.symbol) { return -1; }
        if (a.symbol > b.symbol) { return 1; }
        return 0;
      })
    return companies;
}

function sortCompaniesYTDChange(companies){
    companies.sort(function (a, b) {
        if (a.quote.ytdChange > b.quote.ytdChange) { return -1; }
        if (a.quote.ytdChange < b.quote.ytdChange) { return 1; }
        return 0;
      })
    return companies;
}

export { calculateTotalChange, 
          getPercentChange, 
          getPercentChangeGeneric, 
          getDayOfWeek, 
          getHourOfDay, 
          getMinutesOfDay, 
          determineIfMarketsAreOpen, 
          findIndex, 
          sortCompaniesAscending,
          sortCompaniesDescending,
          sortCompaniesABC,
          sortCompaniesYTDChange
        }