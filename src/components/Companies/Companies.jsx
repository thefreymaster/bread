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
    getPercentAndPrice(company) {
        if (this.props.screen.xs || this.props.screen.sm) {
            return ''
        }
        else {
            if(this.state.quickQuotes[company.symbol])
            {
                return (this.state.quickQuotes[company.symbol].quote.changePercent * 100).toFixed(2) + '% • $' + (this.state.quickQuotes[company.symbol].quote.latestPrice)
            }
        }
    }

    constructor(props) {
        super(props)
        this.state = { open: false, fetchQuickQuotes: true }
    }
    componentWillMount() {
        let that = this;
        let data = getAllSymbols();
        data.then(response => {
            this.setState({
                symbols: response
            })
        })
        
    }
    componentDidUpdate(prevProps) {
        let that = this;
        if (this.props.trackedCompanies !== prevProps.trackedCompanies) {
            let symbols = []
            this.setState({
                fetchQuickQuotes: true
            })
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
                {!this.props.trackedCompanies || this.state.fetchQuickQuotes
                    ?
                    <div className="flex flex-center" style={{ height: window.innerHeight - 82 }}>
                        <Loader
                            type="Bars"
                            color="#000000a6"
                            height="20"
                            width="20"
                        />
                    </div>
                    :
                    <Fragment>
                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            const that = this;
                            return (
                                <Link to="/quote">
                                    <div className={classnames('padding10 loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === that.props.activeTicker, 'box-shadow-bottom': that.props.trackedCompanies.length !== parseInt(index) + 1 })} onClick={() => { this.props.setActiveTicker(company.symbol, company, false, index); this.closeAddCompanySideBar() }}>
                                        <Metric
                                            fontFamily={'Open Sans'}
                                            fontWeight={900}
                                            titleFontSize={16}
                                            title={company.symbol}
                                            center={this.props.screen.xs || this.props.screen.sm ? true : false}
                                        />
                                        <Metric
                                            fontFamily={'Open Sans'}
                                            fontWeight={500}
                                            titleFontSize={14}
                                            // color={this.state.quickQuotes[company.symbol].quote.changePercent > 0 ? GREEN : RED}
                                            title={this.props.screen.xs || this.props.screen.sm ? null : this.getPercentAndPrice(company)}
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
