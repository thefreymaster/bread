import React, { Component, Fragment } from 'react';
import "./Loaf.css";
import Today from './Today/Today';
import YourShares from './YourShares/YourShares';
import LineChart from '../LineChart/LineChart';

class Loaf extends Component {
    constructor(props){
        super(props);
        this.state = {
            green: "#2ec061",
            red: "#c61515"
        }
    }
    render() {
        return (
            <div className="flex flex-column">
                <div className="flex flex-row">
                    <Today ticker={this.props.activeTicker} />
                    <YourShares ticker={this.props.activeTicker} userHasShares={false} />
                </div>
                <div className="flex flex-row">
                    <LineChart ticker={this.props.activeTicker} timeframe={'1d'} interval={10} title='1 Day' />
                    <LineChart ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' />
                </div>
                <div className="flex flex-row">
                    <LineChart ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' />
                    <LineChart ticker={this.props.activeTicker} timeframe={'5y'} interval={10} title='5 Year' />
                </div>
            </div>
        )
    }
}

export default Loaf;