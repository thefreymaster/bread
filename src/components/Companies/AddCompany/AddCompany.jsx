import React, { Component } from 'react';
import { Button, Icon, AutoComplete } from 'antd';
import { getAllSymbols } from '../../../api/SymbolsAPI';
import { Input } from 'antd';
import Metric from '../../Body/Metric';
import SearchedCompanies from '../AddCompany/SearchedCompanies';
import classnames from 'classnames';
import { LoafContext } from '../../../LoafContext';
const Search = Input.Search;

class AddCompany extends Component {
    search = (e) => {
        let searchedCompanies = []
        for (let symbol of this.state.symbols) {
            if(e.target.value.length === 1){
                if (symbol.symbol.toUpperCase().includes(e.target.value.toUpperCase()) && symbol.symbol.length === 1) {
                    searchedCompanies.push(symbol)
                }
            }
            else if (symbol.symbol.toUpperCase().includes(e.target.value.toUpperCase()) && symbol.symbol.length >= 2 && e.target.value.length >= 2) {
                searchedCompanies.push(symbol)
            }
            else if (symbol.symbol.toUpperCase().includes(e.target.value.toUpperCase()) && symbol.symbol.length >= 3 && e.target.value.length >= 3) {
                searchedCompanies.push(symbol)
            }
            else if (symbol.symbol.toUpperCase().includes(e.target.value.toUpperCase()) && symbol.symbol.length >= 4 && e.target.value.length >= 4) {
                searchedCompanies.push(symbol)
            }
        }
        this.setState({
            searchedCompanies: searchedCompanies
        })
    }
    static contextType = LoafContext;
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
        }
    }
    render() {
        const inline = {
            addcompany: {
                height: window.innerHeight - 84,
                left: this.context.screen.xs || this.context.screen.sm ? 100 : 200,
            }
        }
        return (
            <div style={inline.addcompany}>
                <Metric
                    fontWeight={500}
                    titleFontSize={36}
                    title={'Find a Company'}
                    labelFontSize={12}
                    label={'Search by a valid company symbol'}
                    center={true}
                />
                <div className={classnames("padding10 flex margin-auto", { 'width-40': this.context.screen.md || this.context.screen.lg || this.context.screen.xl, 'width-100': this.context.screen.xs || this.context.screen.sm })}>
                    <Search
                        addonBefore={this.state.symbolsFetched ? null : <Icon type="loading" />}
                        disabled={!this.state.symbolsFetched}
                        autoFocus
                        size="large"
                        placeholder="Search"
                        onKeyUp={e => this.search(e)}
                        style={{ width: '100%' }}
                    />
                </div>

                <SearchedCompanies setActiveTicker={this.context.activeTicker} searchedCompanies={this.state.searchedCompanies} />
            </div>
        )
    }
}

export default AddCompany;
