import React, { Component } from 'react';
import Metric from "../Metric";
import { getBatchData } from './../../../api/StatsAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY, LIGHT_GREEN, LIGHT_RED } from '../../../Constants';
import { getDayOfWeek, getHourOfDay, getMinutesOfDay, determineIfMarketsAreOpen } from './../../HelperFunctions/Helper';
import { getPercentChange } from '../../HelperFunctions/Helper';
import { Button, Badge } from '../../../../node_modules/antd';
import classnames from 'classnames'
import io from 'socket.io-client'
import { LoafContext } from './../../../LoafContext';
import { debug } from 'util';

const filter = 'changePercent,latestPrice,symbol,companyName,previousClose,close'

class Today extends Component {
    getColor(percept) {
        if (percept) {
            if (percept > 0) {
                return GREEN;
            }
            else if (percept < 0) {
                return RED;
            }
            else {
                return GREY;
            }
        }
    }
    setBackgroundColor = () => {
        if (this.state.showUpdate && this.state.quote) {
            let change = getPercentChange(this.state.quote);
            change = parseFloat(change);

            if (change > 0) {
                return LIGHT_GREEN;
            }
            else {
                return LIGHT_RED;
            }
        }
    }
    update = (message) => {
        let that = this;
        let price = that.state.price;
        let showUpdate = that.state.showUpdate;
        let messageJSON = JSON.parse(message)
        let change;
        let previousPrice;
        let previousChange;
        if (messageJSON) {
            setTimeout(() => {
                price = messageJSON.lastSalePrice;
                showUpdate = true;
                previousPrice = this.state.price;
                previousChange = this.state.change;
                that.setState({ price, showUpdate, previousPrice, previousChange }, () => {
                    setTimeout(() => {
                        showUpdate = false;
                        that.setState({ showUpdate })

                    }, 1000);
                })
            }, 500);
        }
    }
    static contextType = LoafContext;
    constructor(props) {
        super(props)
        this.state = {
            socket: io('https://ws-api.iextrading.com/1.0/tops'),
            showUpdate: false,
            previousPrice: 0,
            previousChange: 0
        }
        this.state.socket.on('message', message => this.update(message))

    }
    componentDidUpdate(prevProps) {
        let that = this;
        if (this.props.ticker !== prevProps.ticker) {
            this.state.socket.emit('unsubscribe', prevProps.ticker)
        }
    }
    componentWillMount() {
        let that = this;
        if (this.props.ticker) {
            that.state.socket.on('connect', () => {
                that.state.socket.emit('subscribe', this.props.ticker)
            })
        }
    }
    render() {
        const mobile = this.context.screen.xs || this.context.screen.sm ? true : false
        const desktop = this.context.screen.md || this.context.screen.lg || this.context.screen.xl ? true : false
        if (!this.context.quotes)
            return (
                <div className="flex flex-row flex-center show-zoom-animation" style={{ height: 200, width: '50%' }}>
                    <Loader
                        type="Bars"
                        color="#000000a6"
                        height="20"
                        width="20"
                    />
                </div>
            )
        else {
            let quote = this.context.quotes[this.context.activeTicker].quote;
            return (
                <div className={"loaf-component flex flex-column flex-center border-top border-right"} style={{ width: '50%' }}>
                    <Metric
                        titleFontSize={64}
                        center
                        title={quote.symbol}
                        labelFontSize={18}
                        label={quote.companyName}
                        labelCloseToTitle={true} />
                    <div className="flex flex-row">
                        <div className={classnames({ 'width-100': mobile, 'width-50': desktop })} style={{ marginRight: 25 }}>
                            <Metric
                                title={parseFloat(quote.latestPrice).toFixed(2)}
                                label="Latest Price"
                                number
                                start={quote.previousPrice}
                                fontWeight={900}
                                duration={1}
                                decimals={2}
                                fontFamily={'Open Sans'}
                                prefix={'$'} />
                        </div>
                        <div className='width-50'>
                            <Metric
                                number
                                suffix={'%'}
                                decimals={2}
                                duration={1}
                                fontWeight={900}
                                fontFamily={'Open Sans'}
                                start={quote.previousChange}
                                title={quote.changePercent*100}
                                color={this.getColor(parseFloat(quote.changePercent))}
                                label="Percent Change Today" />
                        </div>
                    </div>
                    {
                        this.props.trackedCompanies.length !== 1
                            ?
                            <div style={{position: 'relative', bottom: -14}} className="flex flex-center-end width100">
                                <Button style={{ borderRadius: 50, minWidth: '100%' }} onClick={() => this.props.removeCompanyFromTrackedCompanies(this.props.ticker)}>Untrack Company</Button>
                            </div>
                            :
                            null
                    }
                </div>
            )
        }
    }
}

export default Today;