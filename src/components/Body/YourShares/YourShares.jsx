import React, { Component } from 'react';
import Metric from "../Metric";
import NoShares from './NoShares';
import { Button, Slider } from 'antd';
import classnames from 'classnames';
import AddShares from './AddShares';
import { getPrice } from '../../../api/StatsAPI';
import { GREEN, RED, GREY } from '../../../Constants';
import { LoafContext } from './../../../LoafContext';
import { getPercentChangeGeneric } from '../../HelperFunctions/Helper';
import BuyShares from './BuyShares';

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
        const marks = {
            [this.props.week52Low]: {
                style: {
                    color: RED,
                    fontSize: 11,
                },
                label: <strong>{'$' + this.props.week52Low}</strong>,
            },
            [this.state.currentPrice]: {
                style: {
                    color: GREY,
                    fontSize: 11,
                    position: 'relative',
                    top: -35,
                },
                label: <strong>{'$' + this.state.currentPrice}</strong>,
            },
            [this.props.week52High]: {
                style: {
                    color: GREEN,
                    fontSize: 11,
                },
                label: <strong>{'$' + this.props.week52High}</strong>,
            },
        };
        if (!this.state.showAddShares) {
            return (
                <div style={inline.component} className={classnames("flex flex-column border-top flex-center-vertically width-" + this.props.width, {
                    'hide': this.state.showAddShares,
                    'loaf-component': this.context.screen.md || this.context.screen.lg || this.context.screen.xl,
                    'loaf-component-mobile': this.context.screen.xs || this.context.screen.sm
                })}>
                    <div className={classnames('flex flex-row', { 'shares-divider': this.context.screen.xs || this.context.screen.sm })}>
                        <div className='width-60'>
                            <Metric titleFontSize={mobile ? 14 : 24} title="Your Shares" labelFontSize={mobile ? 12 : 16} label={this.props.count === '' ? '0 Shares' : this.props.count + " Shares"} />
                        </div>
                        <div className='width-40 flex-center flex'>
                            <Button style={{ borderRadius: 50 }} onClick={this.showAddShares} className="width100 loaf-button">Add Shares</Button>
                        </div>
                    </div>
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
                                color={getPercentChangeGeneric(this.props.count * this.state.currentPrice, this.props.price * this.props.count) > 0 ? GREEN : RED} fontFamily={'Open Sans'} titleFontSize={18} title={getPercentChangeGeneric(this.props.count * this.state.currentPrice, this.props.price * this.props.count)} suffix="%" label="Total Change" />
                        </div>
                    </div>
                    {
                        !this.context.screen.xs && !this.context.screen.sm
                            ? <div className="shares-divider">
                                <Slider max={this.props.week52High * 0.3 + this.props.week52High} disabled range marks={marks} defaultValue={[0, 0]} />
                            </div>
                            : null
                    }
                    <BuyShares />
                </div>
            )
        }
        else if (this.state.showAddShares) {
            return (
                <div className={classnames("loaf-component flex flex-column flex-center show-zoom-animation border-top", { 'hide': this.props.userHasShares, 'width-50': desktop, 'width-100': mobile })}>
                    <AddShares ticker={this.props.ticker} saveShares={this.saveSharesAndCloseAddShares} hideAddShares={this.hideAddShares} />
                </div>
            )
        }
    }
}

export default YourShares;