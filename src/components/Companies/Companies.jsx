import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import { getAllSymbols } from '../../HTTP/SymbolsAPI';
import AddCompany from '../Companies/AddCompany/AddCompany';
import Metric from '../Loaf/Metric';

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
            <div>
                {!this.props.trackedCompanies
                    ?
                    null
                    :
                    <Fragment>
                        {this.props.trackedCompanies.map((company) => {
                            return (
                                <div className={company.symbol.toUpperCase() === this.props.activeTicker ? 'active-loaf-button paddingTop10 paddingLeft10 paddingButtom10' : 'loaf-button-hover-action paddingTop10 paddingLeft10 paddingButtom10'} onClick={() => this.props.setActiveTicker(company.symbol, company, false)}>
                                    <Metric titleFontSize={12} title={company.name} labelFontSize={11} label={company.symbol} />
                                </div>
                            )
                        })}
                        <div className="marginBottom10"></div>
                    </Fragment>
                }
                {
                    this.state.open
                        ?
                        null
                        :
                        <div className='padding10'>
                            <Button onClick={this.openAddCompanySideBar} className="width100 loaf-button">Add Company</Button>
                        </div>
                }
                {
                    this.state.open
                        ?
                        <AddCompany setActiveTicker={this.props.setActiveTicker} closeAddCompanySideBar={this.closeAddCompanySideBar} activeTicker={this.state.activeTicker} />
                        :
                        null
                }
            </div>
        )
    }
}

export default Companies;
