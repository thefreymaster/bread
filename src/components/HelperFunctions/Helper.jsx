function calculateTotalChange(count, purchasePrice, currentPrice) {
    return (((count * currentPrice)-(purchasePrice * count))/(purchasePrice * count)*100).toFixed(2) + '%'
}

export { calculateTotalChange }