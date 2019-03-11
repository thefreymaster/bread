import React, { Component } from 'react';
import Metric from "../Metric";
import NoShares from './NoShares';
import { Button } from 'antd';
import classnames from 'classnames';
import AddShares from './AddShares';
import { getPrice } from '../../../api/StatsAPI';
import { GREEN, RED } from '../../../Constants';
import { LoafContext } from './../../../LoafContext';


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
    static contextType = LoafContext;
    constructor(props) {
        super(props);
        this.state = {
            showAddShares: false,
            currentPrice: ''
        }
    }
    render() {
        const inline = {
            component: {
                height: !this.context.screen.xs || !this.context.screen.sm ? null : (window.innerHeight - 84) * 0.40
            }
        }
        const mobile = this.context.screen.xs || this.context.screen.sm ? true : false
        const desktop = this.context.screen.md || this.context.screen.lg || this.context.screen.xl ? true : false

        if (this.props.userHasShares && !this.state.showAddShares) {
            return (
                <div style={inline.component} className={classnames("flex flex-column width-" + this.props.width, {
                    'hide': this.state.showAddShares,
                    'loaf-component': this.context.screen.md || this.context.screen.lg || this.context.screen.xl,
                    'loaf-component-mobile': this.context.screen.xs || this.context.screen.sm
                })}>
                    <div className={classnames('flex flex-row', {'shares-divider': this.context.screen.xs || this.context.screen.sm})}>
                        <div className='width-60'>
                            <Metric titleFontSize={mobile ? 14 : 36} title="Your Shares" labelFontSize={mobile ? 12 : 21} label={this.props.count + " Shares"} />
                        </div>
                        <div className='width-40 flex-center flex'>
                            <Button style={{ borderRadius: 50 }} onClick={this.showAddShares} className="width100 loaf-button">Add Shares</Button>
                        </div>
                    </div>
                    {/* <div className='flex-grow'></div> */}
                    <div className="flex flex-row shares-divider">
                        <div className='width-25'>
                            <Metric fontWeight={900} number duration={1} fontFamily={'Open Sans'} titleFontSize={18} prefix="$" title={this.props.price * this.props.count} label="Initial Cost" />
                        </div>
                        <div className='width-25'>
                            <Metric fontWeight={900} number color={((this.props.count * this.state.currentPrice) - (this.props.price * this.props.count)) > 0 ? GREEN : RED} duration={1} fontFamily={'Open Sans'} titleFontSize={18} prefix="$" title={((this.props.count * this.state.currentPrice) - (this.props.price * this.props.count))} label="Total Return" />
                        </div>
                        <div className='width-25'>
                            <Metric fontWeight={900} decimals={2} number duration={1} fontFamily={'Open Sans'} align='flex-start' titleFontSize={18} prefix="$" title={this.props.price} label="Per Share" />
                        </div>
                        <div className='width-25'>
                            <Metric fontWeight={900} decimals={2} number duration={1}
                                color={((this.props.count * this.state.currentPrice) - (this.props.price * this.props.count)) / (this.props.price * this.props.count) > 0 ? GREEN : RED} fontFamily={'Open Sans'} titleFontSize={18} title={((this.props.count * this.state.currentPrice) - (this.props.price * this.props.count)) / (this.props.price * this.props.count) * 100} suffix="%" label="Total Change" />
                        </div>
                    </div>
                </div>
            )
        }
        else if (this.state.showAddShares) {
            return (
                <div className={classnames("loaf-component flex flex-column flex-center show-zoom-animation", { 'hide': this.props.userHasShares, 'width-50': desktop, 'width-100': mobile })}>
                    <AddShares ticker={this.props.ticker} saveShares={this.saveSharesAndCloseAddShares} hideAddShares={this.hideAddShares} />
                </div>
            )
        }
        else {
            return (
                <div className={classnames("loaf-component flex flex-column width-50 flex-center show-zoom-animation", { 'hide': this.props.userHasShares, 'width-50': desktop, 'width-100': mobile  })}>
                    <NoShares showAddShares={this.showAddShares} />
                </div>
            )
        }
    }
}

export default YourShares;