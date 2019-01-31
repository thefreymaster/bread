import React, { Component } from 'react';
import Metric from "../Metric";
import { getBatchData } from './../../../api/StatsAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED } from '../../../Constants';
import { Button } from '../../../../node_modules/antd';

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
        if (this.props.ticker) {
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
                                title={parseFloat(this.state.price).toFixed(2)}
                                label="Latest Price"
                                number
                                decimals={2}
                                fontFamily={'Open Sans'}
                                prefix={'$'} />
                        </div>
                        <Metric
                            number
                            suffix={'%'}
                            decimals={2}
                            fontFamily={'Open Sans'}
                            title={parseFloat(this.state.quote.changePercent * 100).toFixed(2)}
                            color={parseFloat(this.state.quote.changePercent).toFixed(2) > 0 ? GREEN : RED}
                            label="Percent Change Today" />
                    </div>
                    {
                        this.props.trackedCompanies.length !== 1
                            ?
                            <div className="paddingTop10 flex flex-center-end ">
                                <Button onClick={() => this.props.removeCompanyFromTrackedCompanies(this.props.ticker)} className={'width-50'}>Remove Company</Button>
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