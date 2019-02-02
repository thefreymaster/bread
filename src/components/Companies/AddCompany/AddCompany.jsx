import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { getAllSymbols } from '../../../api/SymbolsAPI';
import { Input } from 'antd';
import SearchedCompanies from '../AddCompany/SearchedCompanies';
const Search = Input.Search;

class AddCompany extends Component {
    search = (e) => {
        let searchedCompanies = []
        for (let symbol of this.state.symbols) {
            if (symbol.symbol.toUpperCase().includes(e.target.value.toUpperCase())) {
                searchedCompanies.push(symbol)
            }
            else if (symbol.name.toUpperCase().includes(e.target.value.toUpperCase())) {
                searchedCompanies.push(symbol)
            }
        }
        this.setState({
            searchedCompanies: searchedCompanies
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            symbolsFetched: false
        }
    }
    componentWillMount() {
        let data = getAllSymbols();
        data.then(response => {
            this.setState({
                symbols: response,
                symbolsFetched: true,
            })
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.activeTicker !== prevProps.activeTicker) {
            this.setState({
                symbolsFetched: false,
            })
            let data = getAllSymbols();
            data.then(response => {
                this.setState({
                    symbols: response,
                    symbolsFetched: true,
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
            <div style={inline.addcompany}>
                <div className="padding10">
                    <Search
                        addonBefore={this.state.symbolsFetched ? null : <Icon type="loading" />}
                        disabled={!this.state.symbolsFetched}
                        autoFocus
                        placeholder="Search"
                        onKeyUp={e => this.search(e)}
                        style={{ width: '100%' }}
                    />
                </div>
                <SearchedCompanies setActiveTicker={this.props.setActiveTicker} searchedCompanies={this.state.searchedCompanies} />
            </div>
        )
    }
}

export default AddCompany;
