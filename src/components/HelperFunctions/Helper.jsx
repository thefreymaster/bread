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
    return new Date().getDay()
}
function getHourOfDay(){
    return new Date().getHours();
}
function getMinutesOfDay(){
    return new Date().getMinutes();
}
function determineIfMarketsAreOpen(day, hour, minute){
    if(day !== 0 && day !== 6){
        if(hour > 9 && hour < 16){
            if(hour === 9)
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

export { calculateTotalChange, getPercentChange, getPercentChangeGeneric, getDayOfWeek, getHourOfDay, getMinutesOfDay, determineIfMarketsAreOpen, findIndex }