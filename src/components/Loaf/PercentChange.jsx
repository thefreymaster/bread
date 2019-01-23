import React from 'react';

function PercentChange(props){
    return(
        <div className="flex flex-column width-40">
            <div className="percent-metric ">{props.change}</div>
            <div className="loaf-label">{props.label}</div>
        </div>
    )
}
export default PercentChange;