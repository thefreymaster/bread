import React from 'react';

function Price(props) {
    return (
        <div className="flex flex-column width-60">
            <div className="price-metric">{props.price}</div>
            <div className="loaf-label">{props.label}</div>
        </div>
    )
}
export default Price;