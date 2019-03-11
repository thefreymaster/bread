import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import { getAllSymbols } from '../../../api/SymbolsAPI';
import { Input } from 'antd';
import Metric from '../../Body/Metric';
import SearchedCompanies from '../AddCompany/SearchedCompanies';
import classnames from 'classnames';
const Search = Input.Search;

class AddCompany extends Component {
    search = (e) => {
        let searchedCompanies = []
        for (let symbol of this.state.symbols) {
            if (symbol.symbol.toUpperCase().includes(e.target.value.toUpperCase())) {
                searchedCompanies.push(symbol)
            }
            // else if (symbol.name.toUpperCase().includes(e.target.value.toUpperCase())) {
            //     searchedCompanies.push(symbol)
            // }
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
                height: window.innerHeight - 84,
                left: this.props.screen.xs || this.props.screen.sm ? 100 : 200,
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
                <div className={classnames("padding10 flex margin-auto", {'width-40': this.props.screen.md || this.props.screen.lg || this.props.screen.xl, 'width-100': this.props.screen.xs || this.props.screen.sm})}>
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

                <SearchedCompanies setActiveTicker={this.props.setActiveTicker} searchedCompanies={this.state.searchedCompanies} />
            </div>
        )
    }
}

export default AddCompany;
