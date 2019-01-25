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
                    <Today />
                    <YourShares userHasShares={false} />
                </div>
                <div className="flex flex-row">
                    <LineChart ticker={this.props.activeTicker} timeframe={'1d'} interval={20} color={this.state.green} />
                    <LineChart ticker={this.props.activeTicker} timeframe={'6m'} interval={10} color={this.state.red} />
                </div>
                <div className="flex flex-row">
                    <LineChart ticker={this.props.activeTicker} timeframe={'1y'} interval={10} color={this.state.green} />
                    <LineChart ticker={this.props.activeTicker} timeframe={'5y'} interval={50} color={this.state.red} />
                </div>
            </div>
        )
    }
}

export default Loaf;