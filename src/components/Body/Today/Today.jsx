import React, { Component } from 'react';
import Metric from "../Metric";
import { getBatchData } from './../../../api/StatsAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY } from '../../../Constants';
import { Button } from '../../../../node_modules/antd';

class Today extends Component {
    getColor(percept) {
        if (percept) {
            if (percept > 0) {
                return GREEN;
            }
            else if (percept < 0) {
                return RED;
            }
            else{
                return GREY;
            }
        }
    }
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
                        type="Bars"
                        color="#000000a6"
                        height="20"
                        width="20"
                    />
                </div>
            )
        else {
            return (
                <div className="loaf-component flex flex-column width-50 border-right" style={{ height: (window.innerHeight-84)*0.40, width: '50%' }}>
                    <Metric titleFontSize={72} title={this.state.stats.symbol} labelFontSize={24} label={this.state.stats.companyName} labelCloseToTitle={true} />
                    <div className="flex flex-row">
                        <div className='width-60'>
                            <Metric
                                title={parseFloat(this.state.price).toFixed(2)}
                                label="Latest Price"
                                number
                                duration={1}
                                decimals={2}
                                fontFamily={'Open Sans'}
                                prefix={'$'} />
                        </div>
                        <Metric
                            number
                            suffix={'%'}
                            decimals={2}
                            duration={1}
                            fontFamily={'Open Sans'}
                            title={parseFloat(this.state.quote.changePercent * 100).toFixed(2)}
                            color={this.getColor(parseFloat(this.state.quote.changePercent))}
                            label="Percent Change Today" />
                    </div>
                    {
                        this.props.trackedCompanies.length !== 1
                            ?
                            <div className="paddingTop10 flex flex-center-end ">
                                <Button style={{borderRadius: 50}} onClick={() => this.props.removeCompanyFromTrackedCompanies(this.props.ticker)} className={'width-50'}>Remove Company</Button>
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