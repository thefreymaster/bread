import React, { Component } from 'react';
import "./Loaf.css";
import Company from "../Loaf/Company";
import Ticker from "../Loaf/Ticker";
import Price from "../Loaf/Price";
import PercentChange from "../Loaf/PercentChange";

class Loaf extends Component {
    render() {
        return(
            <div className="loaf-component flex flex-column width-50">
                <Company name="Apple Inc."/>
                <Ticker ticker="AAPL"/>
                <div className="flex flex-row">
                    <Price price="$158.34" label="Latest Price"/>
                    <PercentChange change="3.42%" label="Percent Change Today"/>
                </div>
            </div>
        )
    }
}

export default Loaf;