import React, { Component } from 'react';
import classnames from 'classnames';
import "./Body.css";
import Today from './Today/Today';
import YourShares from './YourShares/YourShares';
import LineChart from '../LineChart/LineChart';
import Systems from './Systems';

class Loaf extends Component {
    componentWillMount(){
        if(this.props.activeTickerIndex === undefined)
        {
            this.props.setActiveTicker(this.props.trackedCompanies[0].symbol, this.props.trackedCompanies[0], false)
        }
    }
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
                <div className="flex flex-column" style={{marginRight: 15}}>
                    <div className={classnames("flex", {"flex-column": this.props.screen.xs, "flex-row": !this.props.screen.xs || !this.props.screen.sm})}>
                        <Today screen={this.props.screen} trackedCompanies={this.props.trackedCompanies} removeCompanyFromTrackedCompanies={this.props.removeCompanyFromTrackedCompanies} ticker={this.props.activeTicker} />
                        <YourShares width={50} index={index} count={count} price={price} trackedCompanies={this.props.trackedCompanies} saveShares={this.props.saveShares} ticker={this.props.activeTicker} userHasShares={userHasShares} />
                    </div>
                    <div className="flex flex-row dashed-border-bottom dashed-border-top">
                        <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1d'} interval={10} title='1 Day' rightDivider={true} />
                        <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' />
                    </div>
                    <div className="flex flex-row">
                        <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' rightDivider={true} />
                        <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'5y'} interval={20} title='5 Year' />
                    </div>
                    <Systems />
                </div>
            )
        }

    }
}

export default Loaf;