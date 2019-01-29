import React, { Component, Fragment } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import { getAllSymbols } from '../../HTTP/SymbolsAPI';
import { getPrice } from '../../HTTP/StatsAPI';
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
            <div style={{maxHeight: window.innerHeight-84, overflowY: 'scroll'}}>
                {!this.props.trackedCompanies
                    ?
                    null
                    :
                    <Fragment>
                        {this.props.trackedCompanies.map((company) => {
                            return (
                                <div className={company.symbol.toUpperCase() === this.props.activeTicker ? 'active-loaf-button paddingTop10 paddingLeft10 paddingButtom10' : 'loaf-button-hover-action paddingTop10 paddingLeft10 paddingButtom10'} onClick={() => {this.props.setActiveTicker(company.symbol, company, false); this.closeAddCompanySideBar()}}>
                                    <Metric fontFamily={'Open Sans'} fontWeight={900} titleFontSize={14} title={company.symbol} labelFontSize={10} label={company.name} />
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
                        <div className='padding10 add-new-button'>
                            <Button onClick={this.openAddCompanySideBar} className="width100 loaf-button">Add New Company</Button>
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
