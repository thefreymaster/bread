import React, { Component } from 'react';
import Metric from "../Metric";
import { getBatchData } from './../../../HTTP/StatsAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED } from '../../../Constants';

class Today extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {

            let data = getBatchData(this.props.ticker, 'quote,price,stats');
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
        let data = getBatchData(this.props.ticker, 'quote,price,stats');
        data.then(response => {
            this.setState({
                stats: response.stats,
                price: response.price,
                quote: response.quote,
            })
        })
    }
    render() {
        if (!this.state.stats)
            return (
                <div className="flex flex-row flex-center show-zoom-animation" style={{ height: 200, width: '50%' }}>
                    <Loader
                        type="ThreeDots"
                        color="#000000a6"
                        height="20"
                        width="20"
                    />
                </div>
            )
        else {
            return (
                <div className="loaf-component flex flex-column width-50 border-right">
                    <Metric titleFontSize={72} title={this.state.stats.symbol} labelFontSize={24} label={this.state.stats.companyName} labelCloseToTitle={true} />
                    <div className="flex flex-row">
                        <div className='width-60'>
                            <Metric
                                title={'$' + parseFloat(this.state.price).toFixed(2)}
                                label="Latest Price"
                                color={this.state.quote.changePercent > 0 ? GREEN : RED} />
                        </div>
                        <Metric
                            title={parseFloat(this.state.quote.changePercent * 100).toFixed(2) + '%'}
                            color={this.state.quote.changePercent > 0 ? GREEN : RED}
                            label="Percent Change Today" />
                    </div>
                </div>
            )
        }
    }
}

export default Today;