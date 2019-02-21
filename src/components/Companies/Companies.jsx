import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import Loader from 'react-loader-spinner'

import { getAllSymbols } from '../../api/SymbolsAPI';
import { getQuickQuotes } from '../../api/StatsAPI';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import CompanyLogo from './../CompanyLogo/CompanyLogo';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import classnames from 'classnames';
import { RED, GREEN, GREY } from '../../Constants';
import LineChart from './../LineChart/LineChart';
import { Badge } from 'antd';
import { calculateTotalChange } from './../HelperFunctions/Helper';
import { openConnection, subscribeToUpdates, listenToUpdates } from './../HelperFunctions/Socket';

import io from 'socket.io-client'

// https://ws-api.iextrading.com/1.0/tops
// "AAPL,ADBE,AMD,ATVI,CMG,CRM,DBX,FDX,GE,HD,IBM,INTC,JD,LMT,MDB,MMM,MRVL,MSFT,NFLX,NOC,NVDA,RDFN,ROKU,SHOP,SPOT,TEAM,TGT,TTWO,TWLO,WB"

const filter = 'ytdChange,changePercent,week52High,week52Low,latestPrice,previousClose'
// const socket = io('https://ws-api.iextrading.com/1.0/tops')

// socket.on('message', message => console.log(JSON.parse(message)))





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
            else if (this.state.quickQuotes[company.symbol].quote.changePercent < 0) {
                return RED;
            }
            else {
                return GREY;
            }
        }
    }
    getPercentAndPrice(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return ((this.state.quickQuotes[company.symbol].quote.latestPrice - this.state.quickQuotes[company.symbol].quote.previousClose)/this.state.quickQuotes[company.symbol].quote.latestPrice * 100).toFixed(2) + '% • $' + (this.state.quickQuotes[company.symbol].quote.latestPrice)
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
    determineText = (shares, price, quote) => {
        if ((shares * quote) - (shares * price) === 0) {
            return 'No Equity'
        }
        else if ((shares * quote) - (shares * price) > 0) {
            return 'Equity Gain';
        }
        else {
            return 'Equity Loss';
        }
    }
    determineColor = (shares, price, quote) => {
        if ((shares * quote) - (shares * price) === 0) {
            return GREY
        }
        else if ((shares * quote) - (shares * price) > 0) {
            return GREEN;
        }
        else {
            return RED;
        }
    }
    update = (message) => {
        let that = this;
        let _quickQuotes = that.state.quickQuotes;
        let messageJSON = JSON.parse(message)
        _quickQuotes[messageJSON.symbol].quote.latestPrice = messageJSON.lastSalePrice;
        that.setState({quickQuotes: _quickQuotes})
    }

    constructor(props) {
        super(props)
        this.state = { 
            open: false, 
            fetchQuickQuotes: true,
            socket: io('https://ws-api.iextrading.com/1.0/tops')
        }
        this.state.socket.on('message', message => this.update(message))


    }
    componentDidMount() {
        let that = this;


        this.setState({
            fetchQuickQuotes: true
        })
        let symbols = [];
        let socketSymbols = '';
        for (let symbol in that.props.trackedCompanies) {
            symbols.push(that.props.trackedCompanies[symbol].symbol)
            socketSymbols = socketSymbols + that.props.trackedCompanies[symbol].symbol + ',';
        }
        let quote = getQuickQuotes(symbols, filter);
        socketSymbols = socketSymbols.substring(0, socketSymbols.length - 1);
        that.state.socket.on('connect', () => {
            that.state.socket.emit('subscribe', socketSymbols)
        })

        quote.then(response => {
            that.setState({
                quickQuotes: response,
                fetchQuickQuotes: false
            })
        })


    }
    componentWillReceiveProps(nextProps) {
        if (this.props.activeTicker !== nextProps.activeTicker && this.props.trackedCompanies.length > 0) {
            this.setState({
                fetchQuickQuotes: true
            })
            let symbols = []
            let that = this;
            for (let symbol in that.props.trackedCompanies) {
                symbols.push(that.props.trackedCompanies[symbol].symbol)
            }
            let quote = getQuickQuotes(symbols, filter);
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
            this.setState({
                fetchQuickQuotes: true
            })
            let symbols = []
            for (let symbol in that.props.trackedCompanies) {
                symbols.push(that.props.trackedCompanies[symbol].symbol)
            }
            let quote = getQuickQuotes(symbols, filter);
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
                        <div className={classnames('padding10 your-companies')}>
                            <Metric
                                fontFamily={'Open Sans'}
                                fontWeight={900}
                                titleFontSize={11}
                                title={'Your Tracked Companies'}
                                center={false}
                            />
                        </div>
                        <div class="marginBottom26"></div>
                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            const that = this;
                            return (
                                <Link to="/quote" key={company.symbol}>
                                    <div
                                        className={classnames('padding10 margin10 companies-button loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker, 'box-shadow-bottom': that.props.trackedCompanies.length !== parseInt(index) })}
                                        onClick={() => { this.props.setActiveTicker(company.symbol, company, false, index); this.closeAddCompanySideBar() }}>
                                        <div className={classnames({ "flex flex-row": !this.props.screen.xs && !this.props.screen.sm })}>
                                            {/* <div className={'flex flex-center'}>
                                                <CompanyLogo symbol={company.symbol} />
                                            </div> */}
                                            <div className={'flex flex-column'}>
                                                <Metric
                                                    fontFamily={'Open Sans'}
                                                    fontWeight={900}
                                                    titleFontSize={14}
                                                    title={company.symbol}
                                                    center={this.props.screen.xs || this.props.screen.sm ? true : false}
                                                />
                                                <Metric
                                                    fontFamily={'Open Sans'}
                                                    fontWeight={900}
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
                                                                screen={this.props.screen}
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
                                            {!this.state.quickQuotes || (this.props.screen.xs || this.props.screen.sm) ? null
                                                :
                                                <div className={'flex flex-badge flex-column'}>
                                                    <ChangeBadge
                                                        backgroundColor={this.determineColor(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                        company={company}
                                                        count={this.determineText(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)} />
                                                    {/* <ChangeBadge 
                                                    backgroundColor={this.determineColor(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)} 
                                                    company={company} 
                                                    count={calculateTotalChange(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)} /> */}
                                                </div>
                                            }

                                        </div>

                                    </div>
                                </Link>
                            )
                        })}
                        <div className="marginBottom54"></div>
                    </Fragment>
                }
                <Link to="/add">
                    <div className={classnames('padding10 add-new-button', { 'add-button-button-desktop': !this.props.screen.xs && !this.props.screen.sm })}>
                        <Button onClick={this.openAddCompanySideBar} style={{ borderRadius: 50 }} className="width100 radius50 loaf-button">{this.props.screen.xs || this.props.screen.sm ? 'Track' : 'Track New Company'}</Button>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Companies;
