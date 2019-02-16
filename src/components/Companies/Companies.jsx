import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import Loader from 'react-loader-spinner'

import { getAllSymbols } from '../../api/SymbolsAPI';
import { getQuickQuotes } from '../../api/StatsAPI';
import { Link } from "react-router-dom";
import Metric from '../Body/Metric';
import classnames from 'classnames';
import { RED, GREEN } from '../../Constants'

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
            if(this.state.quickQuotes[company.symbol].quote.changePercent > 0)
            {
                return GREEN;
            }
            else {
                return RED;
            }
        }
    }
    getPercentAndPrice(company) {
        if (this.props.screen.xs || this.props.screen.sm) {
            return ''
        }
        else {
            if (this.state.quickQuotes[company.symbol]) {
                return (this.state.quickQuotes[company.symbol].quote.changePercent * 100).toFixed(2) + '% • $' + (this.state.quickQuotes[company.symbol].quote.latestPrice)
            }
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
            <div style={{ maxHeight: window.innerHeight - 84, overflowY: 'scroll' }}>
                {
                    <Fragment>
                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            const that = this;
                            return (
                                <Link to="/quote">
                                    <div 
                                        className={classnames('padding10 margin10 companies-button loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker, 'box-shadow-bottom': that.props.trackedCompanies.length !== parseInt(index)})} 
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
                                            title={this.props.screen.xs || this.props.screen.sm || !this.state.quickQuotes ? null : this.getPercentAndPrice(company)}
                                            labelFontSize={11}
                                            label={this.props.screen.xs || this.props.screen.sm ? null : company.name}
                                            center={this.props.screen.xs || this.props.screen.sm ? true : false}
                                        />

                                    </div>
                                </Link>
                            )
                        })}
                        <div className="marginBottom54"></div>
                    </Fragment>
                }
                <Link to="/add">
                    <div className='padding10 add-new-button'>
                        <Button onClick={this.openAddCompanySideBar} className="width100 loaf-button">{this.props.screen.xs || this.props.screen.sm ? 'Track' : 'Track New Company'}</Button>
                    </div>
                </Link>
            </div>
        )
    }
}

export default Companies;
