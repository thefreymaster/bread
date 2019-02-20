import React, { Component } from 'react';
import classnames from 'classnames';
import "./Body.css";
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
        if(this.props.activeTickerIndex === undefined || this.props.trackedCompanies.length === 0)
            return null;
        else{
            const index = this.props.activeTickerIndex;
            const userHasShares = this.props.trackedCompanies[index].shares.hasShares
            const count = this.props.trackedCompanies[index].shares.count;
            const price = this.props.trackedCompanies[index].shares.price;
            return (
                <div className="flex flex-column">
                    <div className={classnames("flex", {"flex-column": this.props.screen.xs, "flex-row": !this.props.screen.xs || !this.props.screen.sm})}>
                        <Today screen={this.props.screen} trackedCompanies={this.props.trackedCompanies} removeCompanyFromTrackedCompanies={this.props.removeCompanyFromTrackedCompanies} ticker={this.props.activeTicker} />
                        <YourShares index={index} count={count} price={price} trackedCompanies={this.props.trackedCompanies} saveShares={this.props.saveShares} ticker={this.props.activeTicker} userHasShares={userHasShares} />
                    </div>
                    <div className="flex flex-row dashed-border-bottom dashed-border-top">
                        <LineChart width={'50%'} ticker={this.props.activeTicker} timeframe={'1d'} interval={10} title='1 Day' rightDivider={true} />
                        <LineChart width={'50%'} ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' />
                    </div>
                    <div className="flex flex-row">
                        <LineChart width={'50%'} ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' rightDivider={true} />
                        <LineChart width={'50%'} ticker={this.props.activeTicker} timeframe={'5y'} interval={10} title='5 Year' />
                    </div>
                </div>
            )
        }

    }
}

export default Loaf;