import React, { Component } from 'react';
import { Button } from 'antd';
import { getAllSymbols } from '../../../api/SymbolsAPI';
import { Input } from 'antd';
import SearchedCompanies from '../AddCompany/SearchedCompanies';
const Search = Input.Search;

class AddCompany extends Component {
    search = (value) => {
        let searchedCompanies = []
        for (let symbol of this.state.symbols) {
            if (symbol.symbol.toUpperCase().includes(value.toUpperCase())) {
                searchedCompanies.push(symbol)
            }
            else if (symbol.name.toUpperCase().includes(value.toUpperCase())) {
                searchedCompanies.push(symbol)
            }
        }
        this.setState({
            searchedCompanies: searchedCompanies
        })
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        let data = getAllSymbols();
        data.then(response => {
            this.setState({
                symbols: response
            })
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.activeTicker !== prevProps.activeTicker) {
            let data = getAllSymbols();
            data.then(response => {
                this.setState({
                    symbols: response
                })
            })
        }
    }
    render() {
        const inline = {
            addcompany: {
                left: this.props.screen.xs || this.props.screen.sm ? 100 : 200,
            }
        }
        return (
            <div className="add-company-component" style={inline.addcompany}>
                <div className="padding10">
                    <Search
                        autoFocus
                        placeholder="Search"
                        onSearch={value => this.search(value)}
                        style={{ width: '100%' }}
                    />
                </div>
                <SearchedCompanies closeAddCompanySideBar={this.props.closeAddCompanySideBar} setActiveTicker={this.props.setActiveTicker} searchedCompanies={this.state.searchedCompanies} />
            </div>
        )
    }
}

export default AddCompany;
