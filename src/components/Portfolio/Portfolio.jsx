import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import classnames from 'classnames';
import Systems from './../Body/Systems';
import Today from './../Body/Today/Today'
import { getPortfolioTotal } from '../../api/PortfolioAPI';
import { LoafContext } from './../../LoafContext';
import { GREEN, RED, GREY } from '../../Constants';
import { Icon, Badge } from 'antd';
import Loser from './Loser';
import Gainer from './Gainer';
import { getSymbolNews } from '../../api/NewsAPI';
import News from './News';
import PieGraph from './../PieGraph/PieGraph';
import { findIndex } from './../HelperFunctions/Helper';
import BarGraph from '../BarGraph/BarGraph';
import Loader from './../Load';


class Portfolio extends Component {
    calculatePortfolioTotal = () => {

    }
    componentDidMount() {
        let data = getPortfolioTotal(this.props.trackedCompanies, this.context.quotes);
        data.then(response => {
            this.setState({
                total: response.data.total,
                currentTotal: response.data.currentTotal,
                previousTotal: response.data.previousTotal,
                percentChange: response.data.percentChange,
                gainer: response.data.gainer,
                loser: response.data.loser,
                quotes: response.data.quotes
            }, () => {
                this.props.setActiveTicker('portfolio', '', false, -1);
                if (this.state.gainer.symbol) {
                    let news = getSymbolNews(this.state.gainer.symbol);
                    news.then(response => {
                        this.setState({
                            gainerNews: response
                        })
                    })
                }
                if (this.state.loser.symbol) {
                    let news = getSymbolNews(this.state.loser.symbol);
                    news.then(response => {
                        this.setState({
                            loserNews: response
                        })
                    })
                }
            })
        })

    }
    static contextType = LoafContext;
    constructor(props) {
        super(props)
        this.state = {
            total: '',
            currentTotal: '',
            percentChange: '',
            gainer: {},
            loser: {},
        }
    }
    render() {
        return (
            <div className="flex flex-column" style={{ marginRight: 15 }}>
                <div className='flex flex-row'>
                    <div className={"loaf-component flex flex-column flex-center border-right"} style={{ height: (window.innerHeight - 84) * 0.40, width: '50%' }}>
                        <Metric
                            title={this.state.currentTotal}
                            label="Portfolio Current Value"
                            number
                            center
                            fontWeight={900}
                            duration={1}
                            decimals={2}
                            color={this.state.currentTotal == 0 ? GREY : this.state.currentTotal > this.state.previousTotal ? GREEN : RED}
                            titleFontSize={56}
                            prefix={'$'} />
                        <div className="flex flex-row width-100">
                            <Metric
                                title={this.state.total}
                                label="Initial Cost"
                                number
                                center
                                width={'33%'}
                                titleFontSize={18}
                                fontWeight={900}
                                duration={1}
                                decimals={0}
                                fontFamily={'Open Sans'}
                                prefix={'$'} />
                            <Metric
                                title={!this.state.previousTotal ? 0 : this.state.currentTotal - this.state.previousTotal}
                                label="Change"
                                number
                                width={'33%'}
                                center
                                color={this.state.currentTotal == 0 ? GREY : this.state.currentTotal - this.state.previousTotal ? RED : GREEN}
                                titleFontSize={18}
                                fontWeight={900}
                                duration={1}
                                decimals={0}
                                fontFamily={'Open Sans'}
                                prefix={'$'} />
                            <Metric
                                title={this.state.percentChange}
                                label="Change Today"
                                titleFontSize={18}
                                fontWeight={900}
                                duration={1}
                                color={this.state.percentChange > 0 ? GREEN : RED}
                                center
                                number
                                width={'33%'}
                                decimals={2}
                                suffix={'%'}
                                fontFamily={'Open Sans'} />
                        </div>

                    </div>
                    <div className={"loaf-component flex flex-column flex-start-center"} style={{ height: (window.innerHeight - 84) * 0.40, width: '50%' }}>
                        {/* <Link to="/quote" onClick={() => this.props.setActiveTicker(this.state.gainer.symbol, this.state.gainer, false, findIndex(this.state.gainer.symbol, this.props.trackedCompanies))}> */}
                        <Gainer gainer={this.state.gainer} />
                        {/* </Link> */}
                        <div className="shares-divider width-100"></div>
                        {/* <Link to="/quote"> */}
                        <Loser loser={this.state.loser} />
                        {/* </Link> */}
                    </div>
                </div>
                <div className='flex flex-row'>
                    <div className="flex flex-column dashed-border-top width-60 dashed-border-right">
                        {
                            !this.state.quotes ? <div className="flex flex-row flex-center show-zoom-animation" style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                                <Loader
                                    type="Bars"
                                    color="#000000a6"
                                    height="20"
                                    width="20"
                                />
                            </div> : <PieGraph width={'100%'} change={this.state.percentChange} currentTotal={this.state.currentTotal} data={this.props.trackedCompanies} quotes={this.state.quotes} />
                        }
                    </div>
                    <div className="flex flex-column dashed-border-top width-40">
                        {
                            !this.state.quotes ? <div className="flex flex-row flex-center show-zoom-animation" style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                                <Loader
                                    type="Bars"
                                    color="#000000a6"
                                    height="20"
                                    width="20"
                                />
                            </div> : <BarGraph width={'100%'} total={this.state.total} change={this.state.percentChange} currentTotal={this.state.currentTotal} data={this.props.trackedCompanies} quotes={this.state.quotes} />
                        }
                    </div>
                </div>

                <Systems />

            </div>
        )
    }
}

export default Portfolio;