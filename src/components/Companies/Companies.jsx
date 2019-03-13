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
import { determineIfMarketsAreOpen, getMinutesOfDay, getHourOfDay, getDayOfWeek } from './../HelperFunctions/Helper';
import { LoafContext } from './../../LoafContext';
import Systems from './../Body/Systems';
import io from 'socket.io-client'
import LineChart from './../LineChart/LineChart';
import PortfolioLink from '../Portfolio/PortfolioLink';
import { withRouter } from 'react-router-dom';
// https://ws-api.iextrading.com/1.0/tops
// "AAPL,ADBE,AMD,ATVI,CMG,CRM,DBX,FDX,GE,HD,IBM,INTC,JD,LMT,MDB,MMM,MRVL,MSFT,NFLX,NOC,NVDA,RDFN,ROKU,SHOP,SPOT,TEAM,TGT,TTWO,TWLO,WB"

const filter = 'ytdChange,changePercent,week52High,week52Low,latestPrice,previousClose,extendedPrice,companyName,symbol'

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
            if (this.state.quickQuotes[company.symbol].quote.changePercent === 0) {
                return GREY
            }
            else if (this.state.quickQuotes[company.symbol].quote.changePercent > 0) {
                return GREEN;
            }
            else if (this.state.quickQuotes[company.symbol].quote.changePercent < 0) {
                return RED;
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
    determineChange = (shares, price, quote) => {
        return '$' + parseFloat((shares * quote) - (shares * price)).toFixed(2)
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
        if (messageJSON) {
            setTimeout(() => {
                if (messageJSON.symbol) {
                    _quickQuotes[messageJSON.symbol].quote.latestPrice = messageJSON.lastSalePrice;
                    _quickQuotes[messageJSON.symbol].showUpdate = true;

                    that.setState({ quickQuotes: _quickQuotes }, () => {
                        setTimeout(() => {
                            _quickQuotes[messageJSON.symbol].showUpdate = false;
                            that.setState({ quickQuotes: _quickQuotes })
                        }, 1000);
                    })
                }

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
            realTimeStreaming: true,
            determineIfMarketsAreOpen: determineIfMarketsAreOpen,
            minute: getMinutesOfDay(),
            hour: getHourOfDay(),
            day: getDayOfWeek(),
        }
        this.state.socket.on('message', message => this.state.realTimeStreaming ? this.update(message) : null)


    }
    findIndex = (symbol) => {
        for (let index of Object.keys(this.props.trackedCompanies)) {
            if (this.props.trackedCompanies[index].symbol === symbol) {
                this.props.setActiveTicker(symbol, '', false, index);
                notification.destroy()
            }
        }
    }
    componentWillMount() {
        let that = this;
        if (!this.state.quickQuotes) {
            this.setState({
                quickQuotes: this.context.quotes
            })
        }
        let socketSymbols = '';
        for (let symbol in that.props.trackedCompanies) {
            socketSymbols = socketSymbols + that.props.trackedCompanies[symbol].symbol + ',';
        }
        socketSymbols = socketSymbols.substring(0, socketSymbols.length - 1);
        that.state.socket.on('connect', () => {
            that.state.socket.emit('subscribe', socketSymbols)
        })
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.activeTicker !== nextProps.activeTicker && this.props.trackedCompanies.length > 0) {
            this.setState({
                quickQuotes: this.context.quotes
            })
        }
    }

    componentDidUpdate(prevProps) {
        let that = this;
        if (this.props.activeTicker !== prevProps.activeTicker) {
            that.setState({
                quickQuotes: this.context.quotes
            })
        }
    }

    render() {
        const mobile = this.context.screen.xs || this.context.screen.sm ? true : false
        const desktop = this.context.screen.md || this.context.screen.lg || this.context.screen.xl ? true : false

        return (
            <div className='webkit-scroll' style={{ maxHeight: desktop ? window.innerHeight - 84 : window.innerHeight - 64, overflowY: 'scroll', minWidth: '100%' }}>
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
                                    <div class="marginBottom26"></div>
                                </Fragment>
                        }
                        {
                            this.context.quotes && (!this.context.screen.xs && !this.context.screen.sm)
                                ?
                                <PortfolioLink
                                    screen={this.props.screen}
                                    activeTicker={this.props.activeTicker}
                                    trackedCompanies={this.props.trackedCompanies}
                                    setActiveTicker={this.props.setActiveTicker}
                                    quickQuotes={this.state.quickQuotes}
                                />
                                : null
                        }
                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            const userHasShares = this.props.trackedCompanies[index].shares.hasShares
                            const count = this.props.trackedCompanies[index].shares.count;
                            const price = this.props.trackedCompanies[index].shares.price;

                            const that = this;
                            return (
                                <Link to="/quote" key={company.symbol} onClick={() => { this.props.setActiveTicker(company.symbol, company, false, index) }}>
                                    <div
                                        className={classnames('padding10 margin10 companies-button loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker, 'box-shadow-bottom': that.props.trackedCompanies.length !== parseInt(index) })}>
                                        <div className={classnames("flex flex-row")}>
                                            <div className={'flex flex-column width-100'}>
                                                <div className={classnames("flex flex-row")}>
                                                    <div className={classnames("flex flex-column")}>
                                                        <Metric
                                                            fontFamily={'Open Sans'}
                                                            fontWeight={900}
                                                            titleFontSize={14}
                                                            title={company.symbol}
                                                            label={!that.state.quickQuotes ? null : that.state.quickQuotes[company.symbol] !== undefined ? that.state.quickQuotes[company.symbol].quote.companyName : null}
                                                            center={false}
                                                        />
                                                        <Metric
                                                            fontFamily={'Open Sans'}
                                                            fontWeight={900}
                                                            titleFontSize={11}
                                                            backgroundColor={!that.state.quickQuotes ? null : that.setBackgroundColor(company, !that.state.quickQuotes[company.symbol] ? false : that.state.quickQuotes[company.symbol].showUpdate)}
                                                            color={!that.state.quickQuotes ? null : that.getColor(company)}
                                                            title={!that.state.quickQuotes ? null : that.getPercentAndPrice(company)}
                                                            labelFontSize={11}
                                                            center={false}
                                                        />
                                                    </div>
                                                    <div className='flex felx-grow'></div>
                                                    {!that.state.quickQuotes
                                                        ? null
                                                        : that.state.quickQuotes[company.symbol]
                                                            ? <div className={'flex flex-badge flex-column'}>
                                                                <ChangeBadge
                                                                    backgroundColor={that.determineColor(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                                    company={company}
                                                                    width={75}
                                                                    count={that.determineText(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                                />
                                                                <ChangeBadge
                                                                    backgroundColor={that.determineColor(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                                    company={company}
                                                                    width={75}
                                                                    count={that.determineChange(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote.latestPrice)}
                                                                />
                                                            </div>
                                                            : null
                                                    }
                                                </div>

                                                {
                                                    that.props.activeTicker === company.symbol && (that.context.screen.xs || that.context.screen.sm)
                                                        ?
                                                        <Fragment>
                                                            <div className="shares-divider"></div>
                                                            <LineChart
                                                                ticker={that.props.activeTicker}
                                                                timeframe={'6m'}
                                                                interval={2}
                                                                title='Change 6 Month'
                                                                screen={that.context.screen}
                                                                width={'100%'} />
                                                            <YourShares
                                                                width={100}
                                                                index={index}
                                                                count={count}
                                                                price={price}
                                                                trackedCompanies={that.props.trackedCompanies}
                                                                saveShares={that.props.saveShares}
                                                                ticker={that.props.activeTicker}
                                                                userHasShares={userHasShares} />
                                                        </Fragment>
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
                        <div className={classnames({ "marginBottom54": mobile, "marginBottom64": desktop })}></div>
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

export default withRouter(Companies);
