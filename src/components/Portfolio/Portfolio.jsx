import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import classnames from 'classnames';
import Systems from './../Body/Systems';
import Today from './../Body/Today/Today'
import { getPortfolioTotal } from '../../api/PortfolioAPI';

class Portfolio extends Component {
    calculatePortfolioTotal = () => {

    }
    componentDidMount() {
        let data = getPortfolioTotal(this.props.trackedCompanies);
        data.then(response => {
            console.log(response)
        })
    }
    constructor(props){
        super(props)
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
                        {/* <YourShares width={50} index={index} count={count} price={price} trackedCompanies={this.props.trackedCompanies} saveShares={this.props.saveShares} ticker={this.props.activeTicker} userHasShares={userHasShares} /> */}
                    </div>
                    <div className="flex flex-row dashed-border-bottom dashed-border-top">
                        {/* <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1d'} interval={10} title='1 Day' rightDivider={true} />
                        <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' /> */}
                    </div>
                    <div className="flex flex-row">
                        {/* <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' rightDivider={true} />
                        <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'5y'} interval={20} title='5 Year' /> */}
                    </div>
                    <Systems />
                </div>
            )
        }
    }
}

export default Portfolio;