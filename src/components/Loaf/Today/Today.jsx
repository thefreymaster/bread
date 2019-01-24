import React, { Component } from 'react';
import Company from "../Today/Company";
import Ticker from "../Today/Ticker";
import Metric from "../Metric";

class Today extends Component {
    render() {
        return(
            <div className="loaf-component flex flex-column width-50 border-right">
                <Metric titleFontSize={72} title="Apple Inc." labelFontSize={36} label="AAPL"/>
                <div className="flex flex-row">
                    <div className='width-60'>
                        <Metric title="$158.34" label="Latest Price"/>
                    </div>
                    <Metric title="3.42%" label="Percent Change Today"/>
                </div>
            </div>
        )
    }
}

export default Today;