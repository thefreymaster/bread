import React, { Component, Fragment } from 'react';
import Metric from "../Metric";
import NoShares from './NoShares';
import { Button } from 'antd';
import classnames from 'classnames';
import AddShares from './AddShares';
import { getPrice } from '../../../api/StatsAPI';
import { GREEN, RED } from '../../../Constants';


class YourShares extends Component {
    showAddShares = () => {
        this.setState({
            showAddShares: true
        })
    }
    hideAddShares = () => {
        this.setState({
            showAddShares: false
        })
    }
    saveSharesAndCloseAddShares = (price, count) => {
        this.hideAddShares();
        this.props.saveShares(price, count);
    }
    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            let data = getPrice(this.props.ticker);
            data.then(response => {
                this.setState({
                    currentPrice: response,
                })
            })
        }
    }
    componentWillMount() {
        if (this.props.ticker) {
            let data = getPrice(this.props.ticker);
            data.then(response => {
                this.setState({
                    currentPrice: response,
                })
            })
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            showAddShares: false,
            currentPrice: ''
        }
    }
    render() {
        if (this.props.userHasShares && !this.state.showAddShares) {
            return (
                <div className={classnames("loaf-component flex flex-column width-50", { 'hide': this.state.showAddShares })}>
                    <div className='flex flex-row'>
                        <div className='width-60'>
                            <Metric titleFontSize={36} title="Your Shares" labelFontSize={21} label={this.props.count + " Shares"} />
                        </div>
                        <div className='width-40 flex-center flex'>
                            <Button onClick={this.showAddShares} className="width100 loaf-button">Add Shares</Button>
                        </div>
                    </div>
                    <div className='flex-grow'></div>
                    <div className="flex flex-row">
                        <div className='width-50'>
                            <Metric number duration={1.5} fontFamily={'Open Sans'} titleFontSize={48} prefix="$" title={this.props.price * this.props.count} label="Initial Cost" />
                        </div>
                        <div className='width-50'>
                            <Metric number color={((this.props.count * this.state.currentPrice)-(this.props.price * this.props.count)) > 0 ? GREEN : RED}  duration={2.5} fontFamily={'Open Sans'} titleFontSize={48} prefix="$" title={((this.props.count * this.state.currentPrice)-(this.props.price * this.props.count))} label="Total Return" />
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className='width-50'>
                            <Metric decimals={2} number duration={2} fontFamily={'Open Sans'} align='flex-start' titleFontSize={28} prefix="$" title={this.props.price} label="Per Share Price" />
                        </div>
                        <div className='width-50'>
                            <Metric decimals={2} number duration={1.5}
                             color={((this.props.count * this.state.currentPrice)-(this.props.price * this.props.count))/(this.props.price * this.props.count) > 0 ? GREEN : RED} fontFamily={'Open Sans'} titleFontSize={28} title={((this.props.count * this.state.currentPrice)-(this.props.price * this.props.count))/(this.props.price * this.props.count)*100} suffix="%" label="Total Change" />
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.showAddShares) {
            return (
                <div className={classnames("loaf-component flex flex-column width-50 flex-center show-zoom-animation", { 'hide': this.props.userHasShares })}>
                    <AddShares ticker={this.props.ticker} saveShares={this.saveSharesAndCloseAddShares} hideAddShares={this.hideAddShares} />
                </div>
            )
        }
        else {
            return (
                <div className={classnames("loaf-component flex flex-column width-50 flex-center show-zoom-animation", { 'hide': this.props.userHasShares })}>
                    <NoShares showAddShares={this.showAddShares} />
                </div>
            )
        }
    }
}

export default YourShares;