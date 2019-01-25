import React, { Component } from 'react';
import '../Companies/AddCompany/AddCompany.css';
import { Button } from 'antd';
import { getAllSymbols } from '../../HTTP/SymbolsAPI';
import AddCompany from '../Companies/AddCompany/AddCompany';

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
        this.state = {open: false}
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
            <div className="padding10">
                {
                    this.state.open
                    ?
                    null
                    :
                    <Button onClick={this.openAddCompanySideBar} className="width100 loaf-button">Add Company</Button>
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
