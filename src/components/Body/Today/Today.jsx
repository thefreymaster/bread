import React, { Component } from 'react';
import Metric from "../Metric";
import { getBatchData } from './../../../api/StatsAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY, LIGHT_GREEN, LIGHT_RED } from '../../../Constants';
import { getPercentChange } from '../../HelperFunctions/Helper';
import { Button } from '../../../../node_modules/antd';
import classnames from 'classnames'
import io from 'socket.io-client'
import { LoafContext } from './../../../LoafContext';

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
        if (messageJSON) {
            setTimeout(() => {
                price = messageJSON.lastSalePrice;
                showUpdate = true;

                that.setState({price, showUpdate}, () => {
                    setTimeout(() => {
                        showUpdate = false;
                        that.setState({showUpdate})

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
            showUpdate: false
        }
        this.state.socket.on('message', message => this.update(message))

    }
    componentDidUpdate(prevProps) {
        let that = this;
        if (this.props.ticker !== prevProps.ticker) {
            // this.state.socket.emit('unsubscribe', prevProps.ticker)
            let data = getBatchData(this.props.ticker, 'quote,price,stats', filter);
            data.then(response => {
                this.setState({
                    stats: response.stats,
                    price: response.price,
                    quote: response.quote,
                })
            })
        }
    }
    componentWillMount() {
        let that = this;
        if (this.props.ticker) {
            // that.state.socket.on('connect', () => {
            //     that.state.socket.emit('subscribe', this.props.ticker)
            // })
            let data = getBatchData(this.props.ticker, 'quote,price,stats', filter);
            data.then(response => {
                this.setState({
                    stats: response.stats,
                    price: response.price,
                    quote: response.quote,
                })
            })
        }
    }
    render() {
        const mobile = this.context.screen.xs || this.context.screen.sm ? true : false
        const desktop = this.context.screen.md || this.context.screen.lg || this.context.screen.xl ? true : false

        if (!this.state.stats)
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
            return (
                <div className={"loaf-component flex flex-column flex-center border-right"} style={{ height: (window.innerHeight - 84) * 0.40, width: '50%' }}>
                    <Metric 
                        titleFontSize={72} 
                        center
                        title={this.state.quote.symbol} 
                        labelFontSize={24} 
                        label={this.state.stats.companyName} 
                        labelCloseToTitle={true} />
                    <div className="flex flex-row">
                        <div className={classnames({'width-100': mobile, 'width-60': desktop})} style={{marginRight: 25}}>
                            <Metric
                                title={parseFloat(this.state.price).toFixed(2)}
                                label="Latest Price"
                                number
                                fontWeight={900}
                                duration={1}
                                decimals={2}
                                fontFamily={'Open Sans'}
                                prefix={'$'} />
                        </div>
                        <div className='width-100'>
                            <Metric
                                number
                                suffix={'%'}
                                decimals={2}
                                duration={1}
                                fontWeight={900}
                                fontFamily={'Open Sans'}
                                title={getPercentChange(this.state.quote)}
                                color={this.getColor(parseFloat(this.state.quote.changePercent))}
                                label="Percent Change Today" />
                        </div>
                    </div>
                    {
                        this.props.trackedCompanies.length !== 1
                            ?
                            <div className="paddingTop10 flex flex-center-end ">
                                <Button style={{ borderRadius: 50 }} onClick={() => this.props.removeCompanyFromTrackedCompanies(this.props.ticker)}>Untrack Company</Button>
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