import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import Loader from 'react-loader-spinner'

import { getAllSymbols } from '../../api/SymbolsAPI';
import { getQuickQuotes } from '../../api/StatsAPI';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import classnames from 'classnames';
import { RED, GREEN } from '../../Constants';
import LineChart from './../LineChart/LineChart';
import { Badge } from 'antd';

class Companies extends Component {
    openAddCompanySideBar = () => {
        this.setState({
            open: true
        })
    }
    closeAddCompanySideBar = () => {
        this.setState({
            open: false,
        })
    }
    getColor(company) {
        if (this.state.quickQuotes[company.symbol]) {
            if (this.state.quickQuotes[company.symbol].quote.changePercent > 0) {
                return GREEN;
            }
            else {
                return RED;
            }
        }
    }
    getPercentAndPrice(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return (this.state.quickQuotes[company.symbol].quote.changePercent * 100).toFixed(2) + '% • $' + (this.state.quickQuotes[company.symbol].quote.latestPrice)
        }
    }
    getYTD(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return (this.state.quickQuotes[company.symbol].quote.ytdChange * 100).toFixed(2) + '% • YTD'
        }
    }
    get52WeekHigh(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return '$' + (this.state.quickQuotes[company.symbol].quote.week52High).toFixed(2) + ' • 52 H'
        }
    }
    get52WeekLow(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return '$' + (this.state.quickQuotes[company.symbol].quote.week52Low).toFixed(2) + ' • 52 L'
        }
    }

    constructor(props) {
        super(props)
        this.state = { open: false, fetchQuickQuotes: true }
    }
    componentDidMount() {
        let that = this;
        let data = getAllSymbols();
        data.then(response => {
            this.setState({
                symbols: response
            })
        })
        this.setState({
            fetchQuickQuotes: true
        })
        let symbols = []
        for (let symbol in that.props.trackedCompanies) {
            symbols.push(that.props.trackedCompanies[symbol].symbol)
        }
        let quote = getQuickQuotes(symbols);
        quote.then(response => {
            this.setState({
                quickQuotes: response,
                fetchQuickQuotes: false
            })
        })

    }
    componentWillReceiveProps(nextProps) {
        if (this.props.activeTicker !== nextProps.activeTicker && this.props.trackedCompanies.length > 0) {
            console.log(nextProps);
            this.setState({
                fetchQuickQuotes: true
            })
            let symbols = []
            let that = this;
            for (let symbol in that.props.trackedCompanies) {
                symbols.push(that.props.trackedCompanies[symbol].symbol)
            }
            let quote = getQuickQuotes(symbols);
            quote.then(response => {
                this.setState({
                    quickQuotes: response,
                    fetchQuickQuotes: false
                })
            })
        }
    }
    componentDidUpdate(prevProps) {
        let that = this;
        if (this.props.activeTicker !== prevProps.activeTicker) {
            let that = this;
            let data = getAllSymbols();
            data.then(response => {
                this.setState({
                    symbols: response
                })
            })
            this.setState({
                fetchQuickQuotes: true
            })
            let symbols = []
            for (let symbol in that.props.trackedCompanies) {
                symbols.push(that.props.trackedCompanies[symbol].symbol)
            }
            let quote = getQuickQuotes(symbols);
            quote.then(response => {
                this.setState({
                    quickQuotes: response,
                    fetchQuickQuotes: false
                })
            })
        }
    }

    render() {
        return (
            <div className='webkit-scroll' style={{ maxHeight: window.innerHeight - 84, overflowY: 'scroll', minWidth: '100%' }}>
                {
                    <Fragment>
                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            const that = this;
                            return (
                                <Link to="/quote">
                                    <div
                                        className={classnames('padding10 margin10 companies-button loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker, 'box-shadow-bottom': that.props.trackedCompanies.length !== parseInt(index) })}
                                        onClick={() => { this.props.setActiveTicker(company.symbol, company, false, index); this.closeAddCompanySideBar() }}>
                                        <Metric
                                            fontFamily={'Open Sans'}
                                            fontWeight={900}
                                            titleFontSize={14}
                                            title={company.symbol}
                                            center={this.props.screen.xs || this.props.screen.sm ? true : false}
                                        />
                                        <Metric
                                            fontFamily={'Open Sans'}
                                            fontWeight={600}
                                            titleFontSize={12}
                                            color={!this.state.quickQuotes ? null : this.getColor(company)}
                                            title={!this.state.quickQuotes ? null : this.getPercentAndPrice(company)}
                                            labelFontSize={11}
                                            label={company.name}
                                            center={this.props.screen.xs || this.props.screen.sm ? true : false}
                                        />
                                        {
                                            (this.props.screen.xs || this.props.screen.sm) && company.symbol.toUpperCase() === that.props.activeTicker
                                                ?
                                                <div className={'flex flex-column flex-center'}>
                                                    <LineChart
                                                        ticker={that.props.activeTicker}
                                                        timeframe={'ytd'}
                                                        interval={2}
                                                        title='YTD'
                                                        width={'100%'} />
                                                        <div className={'flex flex-row'}>
                                                            <Badge count={!this.state.quickQuotes ? null : this.getYTD(company)} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', margin: 5 }} />
                                                            <Badge count={!this.state.quickQuotes ? null : this.get52WeekHigh(company)} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', margin: 5 }} />
                                                            <Badge count={!this.state.quickQuotes ? null : this.get52WeekLow(company)} style={{ backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset', margin: 5 }} />
                                                        </div>
                                                    
                                                </div>
                                                :
                                                null
                                        }
                                    </div>
                                </Link>
                            )
                        })}
                        <div className="marginBottom54"></div>
                    </Fragment>
                }
                <Link to="/add">
                    <div className={classnames('padding10 add-new-button', { 'add-button-button-desktop': !this.props.screen.xs && !this.props.screen.sm })}>
                        <Button onClick={this.openAddCompanySideBar} className="width100 loaf-button">{this.props.screen.xs || this.props.screen.sm ? 'Track' : 'Track New Company'}</Button>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Companies;
