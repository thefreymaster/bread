import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router'

import '../Companies/AddCompany/AddCompany.css';
import { Button, notification, Badge, Tooltip } from 'antd';
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
// https://ws-api.iextrading.com/1.0/tops
// "AAPL,ADBE,AMD,ATVI,CMG,CRM,DBX,FDX,GE,HD,IBM,INTC,JD,LMT,MDB,MMM,MRVL,MSFT,NFLX,NOC,NVDA,RDFN,ROKU,SHOP,SPOT,TEAM,TGT,TTWO,TWLO,WB"

const filter = 'ytdChange,changePercent,week52High,week52Low,latestPrice,previousClose,extendedPrice,companyName,symbol'

class Companies extends Component {
    condense = () => {
        this.setState({
            condensed: false
        })
    }
    expand = () => {
        this.setState({
            condensed: true
        })
    }
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
        if (quote.latestPrice === quote.previousClose || quote.latestPrice === 0) {
            return 'Premarket'
        }
        else {
            return ((quote.latestPrice - quote.previousClose) / quote.latestPrice * 100).toFixed(2) + '%'
        }
    }
    getPrice(quote) {
        if (quote.latestPrice === 0) {
            return quote.extendedPrice;
        }
        else {
            return quote.latestPrice;
        }
    }
    getPercentAndPrice(company) {
        if (this.state.quickQuotes[company.symbol]) {
            return this.getPercentChange(this.state.quickQuotes[company.symbol].quote) + ' • $' + (this.getPrice(this.state.quickQuotes[company.symbol].quote))
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
        let latestPrice = quote.latestPrice === 0 || !determineIfMarketsAreOpen() ? quote.extendedPrice : quote.latestPrice;
        if ((shares * latestPrice) - (shares * price) === 0) {
            return 'No Equity'
        }
        else if ((shares * latestPrice) - (shares * price) > 0) {
            return 'Equity Gain';
        }
        else {
            return 'Equity Loss';
        }
    }
    determineChange = (shares, price, quote) => {
        let latestPrice = quote.latestPrice === 0 || !determineIfMarketsAreOpen() ? quote.extendedPrice : quote.latestPrice;
        return '$' + parseFloat((shares * latestPrice) - (shares * price)).toFixed(2)
    }
    determineColor = (shares, price, quote) => {
        let latestPrice = quote.latestPrice === 0 || !determineIfMarketsAreOpen() ? quote.extendedPrice : quote.latestPrice;

        if ((shares * latestPrice) - (shares * price) === 0) {
            return GREY
        }
        else if ((shares * latestPrice) - (shares * price) > 0) {
            return GREEN;
        }
        else {
            return RED;
        }
    }
    halt = () => {
        this.setState({
            realTimeStreaming: false
        })
    }
    update = (message) => {
        let that = this;
        let _quickQuotes = that.state.quickQuotes;
        let messageJSON = JSON.parse(message)
        let change;
        if (messageJSON && messageJSON.lastSalePrice !== _quickQuotes[messageJSON.symbol].quote.latestPrice) {
            console.log('Websockets Update')
            setTimeout(() => {
                if (messageJSON.symbol) {
                    _quickQuotes[messageJSON.symbol].quote.latestPrice = messageJSON.lastSalePrice;
                    _quickQuotes[messageJSON.symbol].showUpdate = true;
                    /*
                    if (localStorage.getItem('COMPANIES_SORT')) {
                        switch (localStorage.getItem('COMPANIES_SORT')) {
                            case 'ABC':
                                this.context.sortABC();
                                break;
                            case 'YTD':
                                this.context.sortYTD();
                                break;
                            case 'ASCENDING':
                                this.context.sortAscending();
                                break;
                            case 'DESCENDING':
                                this.context.sortDecending();
                                break;
                        }
                    }
                    */

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
            realTimeStreaming: false,
            determineIfMarketsAreOpen: determineIfMarketsAreOpen,
            minute: getMinutesOfDay(),
            hour: getHourOfDay(),
            day: getDayOfWeek(),
            condensed: false
        }
        this.state.socket.on('message', message => this.state.realTimeStreaming ? this.update(message) : null)
        this.condense = this.condense.bind(this);
        this.expand = this.expand.bind(this);

    }
    findIndex = (symbol) => {
        for (let index of Object.keys(this.context.trackedCompanies)) {
            if (this.context.trackedCompanies[index].symbol === symbol) {
                this.context.setActiveTicker(symbol, '', false, index);
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
        if (localStorage.getItem('COMPANIES_SORT')) {
            switch (localStorage.getItem('COMPANIES_SORT')) {
                case 'ABC':
                    this.context.sortABC();
                    break;
                case 'YTD':
                    this.context.sortYTD();
                    break;
                case 'ASCENDING':
                    this.context.sortAscending();
                    break;
                case 'DESCENDING':
                    this.context.sortDecending();
                    break;
            }
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
        if (this.props.activeTicker !== nextProps.activeTicker && this.context.trackedCompanies.length > 0) {
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

        const { trackedCompanies } = this.props;

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
                                    <div className={classnames('padding6 your-companies flex flex-row flex-center')}>
                                        <Metric
                                            fontFamily={'Open Sans'}
                                            fontWeight={900}
                                            titleFontSize={11}
                                            title={'Your Tracked Companies'}
                                            center={false}
                                        />
                                        <div className="flex flex-grow"></div>
                                        {
                                            this.state.realTimeStreaming
                                                ?
                                                <Tooltip placement="right" title={'Halt Real Time Streaming'}>
                                                    <Button onClick={this.halt} type="danger" size={'small'}>Halt</Button>
                                                </Tooltip>
                                                :
                                                <Badge count={'Streaming Halted'} style={{ backgroundColor: RED, opacity: .6 }} />
                                        }
                                    </div>
                                </Fragment>
                        }
                        {
                            this.context.quotes
                                &&
                                <PortfolioLink
                                    screen={this.context.screen}
                                    activeTicker={this.props.activeTicker}
                                    trackedCompanies={this.context.trackedCompanies}
                                    setActiveTicker={this.context.setActiveTicker}
                                    quickQuotes={this.state.quickQuotes}
                                />
                        }
                        <div className={'flex flex-row flex-space margin10'} style={{ marginTop: 10 }}>
                            {
                                this.context.screen.xs || this.context.screen.sm
                                    ?
                                    <Fragment>
                                        <Button size='large' onClick={this.context.sortABC} type="dashed" shape="circle" icon="font-colors" />
                                        <Button size='large' onClick={this.context.sortYTD} type="dashed" shape="circle" icon="calendar" />
                                        <Button size='large' style={{ color: GREEN }} onClick={this.context.sortDecending} type="dashed" shape="circle" icon="rise" />
                                        <Button size='large' style={{ color: RED }} onClick={this.context.sortAscending} type="dashed" shape="circle" icon="fall" />
                                    </Fragment>
                                    :
                                    <Fragment>
                                        <Tooltip placement="top" title={'Sort by ABC'}>
                                            <Button size='large' onClick={this.context.sortABC} type="dashed" shape="circle" icon="font-colors" />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'Sort by Best YTD Change'}>
                                            <Button size='large' onClick={this.context.sortYTD} type="dashed" shape="circle" icon="calendar" />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'Show Gainers First'}>
                                            <Button size='large' style={{ color: GREEN }} onClick={this.context.sortDecending} type="dashed" shape="circle" icon="rise" />
                                        </Tooltip>
                                        <Tooltip placement="top" title={'Show Losers First'}>
                                            <Button size='large' style={{ color: RED }} onClick={this.context.sortAscending} type="dashed" shape="circle" icon="fall" />
                                        </Tooltip>
                                        {
                                            this.state.condensed
                                                ?
                                                <Tooltip placement="top" title={'Expand Companies'}>
                                                    <Button size='large' onClick={this.condense} type="dashed" shape="circle" icon="fullscreen" />
                                                </Tooltip>
                                                :
                                                <Tooltip placement="top" title={'Condense Companies'}>
                                                    <Button size='large' onClick={this.expand} type="dashed" shape="circle" icon="fullscreen-exit" />
                                                </Tooltip>
                                        }
                                    </Fragment>
                            }

                        </div>
                        {trackedCompanies.map((company) => {
                            const { shares } = company;
                            const userHasShares = shares[0].hasShares
                            const count = shares[0].count;
                            const price = shares[0].price;
                            debugger;
                            const that = this;
                            if(!that.state.quickQuotes[company.symbol]){
                                return null;
                            }
                            return (
                                <Link to={`/quote/${company.symbol.toLowerCase()}`} key={company.symbol} onClick={() => { this.context.setActiveTicker(company.symbol, company, false) }}>
                                    <div
                                        className={classnames('padding10 companies-button loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker })}>
                                        <div className={classnames("flex flex-row")}>
                                            <div className={'flex flex-column width-100'}>
                                                <div className={classnames("flex flex-row")}>
                                                    <div className={classnames("flex flex-column")}>
                                                        <Metric
                                                            fontFamily={'Open Sans'}
                                                            fontWeight={900}
                                                            titleFontSize={14}
                                                            title={company.symbol}
                                                            label={!that.state.quickQuotes && this.state.condensed ? null : that.state.quickQuotes[company.symbol] !== undefined && !this.state.condensed ? that.state.quickQuotes[company.symbol].quote.companyName : null}
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
                                                                    backgroundColor={that.determineColor(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote)}
                                                                    company={company}
                                                                    width={75}
                                                                    count={that.determineText(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote)}
                                                                />
                                                                {
                                                                    this.state.condensed
                                                                        ?
                                                                        null
                                                                        :
                                                                        <ChangeBadge
                                                                            backgroundColor={that.determineColor(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote)}
                                                                            company={company}
                                                                            width={75}
                                                                            count={that.determineChange(company.shares.count, company.shares.price, that.state.quickQuotes[company.symbol].quote)}
                                                                        />
                                                                }



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
                        <div className={classnames({ "marginBottom54": mobile, "marginBottom64": desktop })}></div>
                    </Fragment>
                }
                <Link to="/add">
                    <div className={classnames('padding10 add-new-button add-new-button', { 'add-button-button-desktop': !this.context.screen.xs && !this.context.screen.sm, 'add-new-button-mobile': this.context.screen.xs || this.context.screen.sm })}>
                        <Button onClick={this.openAddCompanySideBar} style={{ borderRadius: 50 }} className="width100 radius50 loaf-button">{'Track New Company'}</Button>
                    </div>
                </Link>
            </div>
        )
    }
}


const mapStateToProps = state => {
    let { trackedCompanies } = state;
    return {
        trackedCompanies
    };
};

const mapDispachToProps = dispatch => {
    return {
        addOneCompanyToTrackedCompanies: (company, history) => {
            if (localStorage.getItem('LOAF_USER')){
                let userID = JSON.parse(localStorage.getItem('LOAF_USER')).uid;
                // updateUserCompanyData(userID, )
            }
            dispatch({ type: "ADD_ONE_COMPANY_TO_TRACKED_COMPANIES", company, history })
        }
    };
};

export default connect(
    mapStateToProps,
    null
)(withRouter(Companies));
