import React, { Component, Fragment } from 'react';
import "./Loaf.css";
import Today from './Today/Today';
import YourShares from './YourShares/YourShares';
import Graph from '../Graph/Graph';

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
                    <YourShares userHasShares={true} />
                </div>
                <div className="flex flex-row">
                    <Graph timeframe={'1day'} color={this.state.green} />
                    <Graph timeframe={'6m'} color={this.state.red} />
                </div>
                <div className="flex flex-row">
                    <Graph timeframe={'1y'} color={this.state.green} />
                    <Graph timeframe={'5y'} color={this.state.red} />
                </div>
            </div>
        )
    }
}

export default Loaf;