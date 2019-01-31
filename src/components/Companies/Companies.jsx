import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import { getAllSymbols } from '../../api/SymbolsAPI';
import { getPrice } from '../../api/StatsAPI';
import AddCompany from '../Companies/AddCompany/AddCompany';
import Metric from '../Loaf/Metric';
import classnames from 'classnames';

class Companies extends Component {
    openAddCompanySideBar = () => {
        this.setState({
            open: true
        })
    }
    closeAddCompanySideBar = () => {
        this.setState({
            open: false
        })
    }
    constructor(props) {
        super(props)
        this.state = { open: false }
    }
    componentWillMount() {
        let data = getAllSymbols();
        data.then(response => {
            this.setState({
                symbols: response
            })
        })
    }
    render() {
        return (
            <div style={{ maxHeight: window.innerHeight - 84, overflowY: 'scroll' }}>
                {!this.props.trackedCompanies
                    ?
                    null
                    :
                    <Fragment>
                        {Object.keys(this.props.trackedCompanies).map((index) => {
                            const company = this.props.trackedCompanies[index];
                            return (
                                <div className={classnames('padding10 box-shadow-bottom loaf-button-hover-action', { 'active-loaf-button ': company.symbol.toUpperCase() === this.props.activeTicker })} onClick={() => { this.props.setActiveTicker(company.symbol, company, false, index); this.closeAddCompanySideBar() }}>
                                    <Metric
                                        fontFamily={'Open Sans'}
                                        fontWeight={900}
                                        titleFontSize={14}
                                        title={company.symbol}
                                        labelFontSize={11}
                                        label={this.props.screen.xs || this.props.screen.sm ? null : company.name}
                                        center={this.props.screen.xs || this.props.screen.sm ? true : false} />
                                </div>
                            )
                        })}
                        <div className="marginBottom54"></div>
                    </Fragment>
                }
                {
                    this.state.open
                        ?
                        null
                        :
                        <div className='padding10 add-new-button'>
                            <Button onClick={this.openAddCompanySideBar} className="width100 loaf-button">{this.props.screen.xs || this.props.screen.sm ? 'Track' : 'Track New Company'}</Button>
                        </div>
                }
                {
                    this.state.open
                        ?
                        <AddCompany
                            setActiveTicker={this.props.setActiveTicker}
                            closeAddCompanySideBar={this.closeAddCompanySideBar}
                            screen={this.props.screen}
                            activeTicker={this.state.activeTicker} />
                        :
                        null
                }
            </div>
        )
    }
}

export default Companies;
