import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button, notification, Icon } from 'antd';
import YourShares from './../Body/YourShares/YourShares';
import { getQuickQuotes } from '../../api/StatsAPI';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import classnames from 'classnames';
import { RED, GREEN, GREY, LIGHT_RED, LIGHT_GREEN } from '../../Constants';
import { determineIfMarketsAreOpen } from './../HelperFunctions/Helper';
import { LoafContext } from './../../LoafContext';
import Systems from './../Body/Systems';
import io from 'socket.io-client'

// https://ws-api.iextrading.com/1.0/tops
// "AAPL,ADBE,AMD,ATVI,CMG,CRM,DBX,FDX,GE,HD,IBM,INTC,JD,LMT,MDB,MMM,MRVL,MSFT,NFLX,NOC,NVDA,RDFN,ROKU,SHOP,SPOT,TEAM,TGT,TTWO,TWLO,WB"

const filter = 'ytdChange,changePercent,week52High,week52Low,latestPrice,previousClose,extendedPrice,companyName,symbol'
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
    getPercentChange(quote) {
        return ((quote.latestPrice - quote.previousClose) / quote.latestPrice * 100).toFixed(2)
    }
    getPercentAndPrice(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return this.getPercentChange(this.state.quickQuotes[company.symbol].quote) + '% • $' + (this.state.quickQuotes[company.symbol].quote.latestPrice)
        }
    }
    setBackgroundColor(company, showUpdate) {
        if (this.state.quickQuotes[company.symbol] && showUpdate) {
            if (this.state.quickQuotes[company.symbol].quote.changePercent > 0) {
                return LIGHT_GREEN;
            }
            else if (this.state.quickQuotes[company.symbol].quote.changePercent < 0) {
                return LIGHT_RED;
            }
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
        // console.log(JSON.parse(message))
        let change;
        if (messageJSON && _quickQuotes[messageJSON.symbol]) {
            setTimeout(() => {
                _quickQuotes[messageJSON.symbol].quote.latestPrice = messageJSON.lastSalePrice;
                _quickQuotes[messageJSON.symbol].showUpdate = true;

                that.setState({ quickQuotes: _quickQuotes }, () => {
                    setTimeout(() => {
                        _quickQuotes[messageJSON.symbol].showUpdate = false;
                        that.setState({ quickQuotes: _quickQuotes })
                    }, 1000);
                })
            }, 500);
        }
    }
    static contextType = LoafContext;
    constructor(props) {

        super(props)
        this.state = {
            open: false,
            fetchQuickQuotes: true,
            socket: io('https://ws-api.iextrading.com/1.0/tops'),
            realTimeStreaming: true
        }
        this.state.socket.on('message', message => this.state.realTimeStreaming ? this.update(message) : null)


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
            let change;
            for (let [key] of Object.entries(response)) {
                change = that.getPercentChange(response[key].quote);
                if (change > 5 && determineIfMarketsAreOpen()) {
                    notification.success({
                        message: response[key].quote.companyName,
                        description: key + ' is up ' + that.getPercentChange(response[key].quote) + '% today.',
                        onClick: () => {
                            this.findIndex(key)
                        },
                        duration: 10,
                        icon: <Icon type="rise" style={{ color: GREEN }} />,
                    });
                }
                if (change < -5 && determineIfMarketsAreOpen()) {
                    notification.warning({
                        message: response[key].quote.companyName,
                        description: key + ' is down ' + that.getPercentChange(response[key].quote) + '% today.',
                        onClick: () => {
                            this.findIndex(key)
                        },
                        duration: 10,
                        icon: <Icon type="fall" style={{ color: RED }} />,
                    });
                }
            }
            that.setState({
                quickQuotes: response,
                fetchQuickQuotes: false
            })
        })


    }
    findIndex = (symbol) => {
        for (let index of Object.keys(this.props.trackedCompanies)) {
            if (this.props.trackedCompanies[index].symbol === symbol) {
                this.props.setActiveTicker(symbol, '', false, index);
                notification.destroy()
            }
        }
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
        const mobile = this.context.screen.xs || this.context.screen.sm ? true : false
        const desktop = this.context.screen.md || this.context.screen.lg || this.context.screen.xl ? true : false

        return (
            <div className='webkit-scroll' style={{ maxHeight: window.innerHeight - 84, overflowY: 'scroll', minWidth: '100%' }}>
                {
                    <Fragment>
                        {
                            this.context.screen.xs || this.context.screen.sm
                                ?
                                null
                                :
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
                                    {/* <Switch checkedChildren={<Icon type="check" />} unCheckedChildren={<Icon type="close" />} defaultChecked /> */}
                                    <div class="marginBottom26"></div>
                                </Fragment>
                        }

                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            const userHasShares = this.props.trackedCompanies[index].shares.hasShares
                            const count = this.props.trackedCompanies[index].shares.count;
                            const price = this.props.trackedCompanies[index].shares.price;
                    
                            const that = this;
                            return (
                                <Link to="/quote" key={company.symbol}>
                                    <div
                                        className={classnames('padding10 margin10 companies-button loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker, 'box-shadow-bottom': that.props.trackedCompanies.length !== parseInt(index) })}
                                        onClick={() => { this.props.setActiveTicker(company.symbol, company, false, index); this.closeAddCompanySideBar() }}>
                                        <div className={classnames("flex flex-row")}>
                                            <div className={'flex flex-column width-100'}>
                                                <div className={classnames("flex flex-row")}>
                                                    <div className={classnames("flex flex-column")}>
                                                        <Metric
                                                            fontFamily={'Open Sans'}
                                                            fontWeight={900}
                                                            titleFontSize={14}
                                                            title={company.symbol}
                                                            label={company.name}
                                                            center={false}
                                                        />
                                                        <Metric
                                                            fontFamily={'Open Sans'}
                                                            fontWeight={900}
                                                            titleFontSize={12}
                                                            backgroundColor={!this.state.quickQuotes ? null : this.setBackgroundColor(company, !this.state.quickQuotes[company.symbol] ? false : this.state.quickQuotes[company.symbol].showUpdate)}
                                                            color={!this.state.quickQuotes ? null : this.getColor(company)}
                                                            title={!this.state.quickQuotes ? null : this.getPercentAndPrice(company)}
                                                            labelFontSize={11}
                                                            center={false}
                                                        />
                                                    </div>
                                                    {!this.state.quickQuotes ?
                                                        null
                                                        :
                                                        this.state.quickQuotes[company.symbol]
                                                            ?
                                                            <div className={'flex flex-badge flex-column'}>
                                                                <ChangeBadge
                                                                    backgroundColor={this.determineColor(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                                    company={company}
                                                                    count={this.determineText(company.shares.count, company.shares.price, this.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                                />
                                                            </div>
                                                            :
                                                            null
                                                    }
                                                </div>

                                                {
                                                    this.props.activeTicker === company.symbol && (this.context.screen.xs || this.context.screen.sm)
                                                        ?
                                                        <YourShares
                                                            width={100}
                                                            index={index}
                                                            count={count}
                                                            price={price}
                                                            trackedCompanies={this.props.trackedCompanies}
                                                            saveShares={this.props.saveShares}
                                                            ticker={this.props.activeTicker}
                                                            userHasShares={userHasShares} />
                                                        :
                                                        null
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                        {
                            this.context.screen.xs || this.context.screen.sm
                                ?
                                <Systems position='inline' />
                                : 
                                null
                        }
                        <div className={classnames({"marginBottom48": mobile, "marginBottom64": desktop})}></div>
                    </Fragment>
                }
                <Link to="/add">
                    <div className={classnames('padding10 add-new-button add-new-button', { 'add-button-button-desktop': !this.props.screen.xs && !this.props.screen.sm, 'add-new-button-mobile': this.props.screen.xs || this.props.screen.sm })}>
                        <Button onClick={this.openAddCompanySideBar} style={{ borderRadius: 50 }} className="width100 radius50 loaf-button">{'Track New Company'}</Button>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Companies;
