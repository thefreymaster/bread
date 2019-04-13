import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import classnames from 'classnames';
import "./Body.css";
import Today from './Today/Today';
import YourShares from './YourShares/YourShares';
import LineChart from '../LineChart/LineChart';
import Systems from './Systems';
import Recomendations from '../Recomendations/Recomendations';
import GetRecomendations from '../Recomendations/GetRecomendations';
import { getCompanyNews } from './../../api/NewsAPI';
import News from './../News/News';
import { LoafContext } from '../../LoafContext';
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom';
import { findIndex, searchForSymbol } from './../HelperFunctions/Helper';
import { getAllSymbols } from '../../api/SymbolsAPI';


class Bread extends Component {
    newsIsLoading = () => {
        this.setState({
            newsIsLoading: true
        })
    }
    newsComplete = () => {
        this.setState({
            newsIsLoading: false
        })
    }
    showRecomendations = () => {
        this.setState({
            getRecomendations: true
        })
    }
    receiveUpdateFromChild = (obj) => {
        this.setState({ ...obj })
    }
    componentWillMount() {
        let { pathname } = this.props.location;
        let containsSymbol = pathname.indexOf('/quote/');
        let urlParamIndex = -1;
        if (containsSymbol !== -1) {
            let symbol = pathname.substring(7, pathname.length)
            this.props.trackedCompanies.map((company, index) => {
                if (company.symbol === (symbol).toUpperCase()) {
                    urlParamIndex = index
                }
            })
            if (urlParamIndex === -1) {
                let symbols = getAllSymbols()
                symbols.then((response) => {
                    let company = searchForSymbol(response, symbol)
                    this.context.addCompanyToTrackedCompanies((symbol).toUpperCase(), company, true);

                })
            }
            else {
                this.context.setActiveTicker((symbol).toUpperCase(), this.props.trackedCompanies[urlParamIndex], false, urlParamIndex);
                this.newsIsLoading()
                let news = getCompanyNews(this.props.trackedCompanies[urlParamIndex].symbol);
                news.then(response => {
                    let newsFiltered = [];
                    let index = 0;
                    if (response !== undefined) {
                        response.forEach(element => {
                            if (index < 4) {
                                newsFiltered.push(element);
                            }
                            index++;
                        });
                        this.setState({
                            news: newsFiltered
                        });
                    }
                    this.newsComplete();
                })
            }
        }
        else {
            
            // this.props.setActiveTicker(this.props.trackedCompanies[0].symbol, this.props.trackedCompanies[0], false);
            // this.newsIsLoading()
            // let news = getCompanyNews(this.props.trackedCompanies[0].symbol);
            // news.then(response => {
            //     let newsFiltered = [];
            //     let index = 0;
            //     if (response !== undefined) {
            //         response.forEach(element => {
            //             if (index < 4) {
            //                 newsFiltered.push(element);
            //             }
            //             index++;
            //         });
            //     }
            //     this.setState({
            //         news: newsFiltered
            //     });
            //     this.newsComplete();
            // })
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.activeTicker !== prevProps.activeTicker && prevProps.activeTicker !== '') {
            this.newsIsLoading()
            this.setState({
                getRecomendations: false
            })
            let news = getCompanyNews(this.props.activeTicker);
            news.then(response => {
                let newsFiltered = [];
                let index = 0;
                if (response !== undefined) {

                    response.forEach(element => {
                        if (index < 4) {
                            newsFiltered.push(element);
                        }
                        index++;
                    });
                    this.setState({
                        news: newsFiltered
                    })
                }
                this.newsComplete();
            })
        }
    }
    static contextType = LoafContext;

    constructor(props) {
        super(props);
        this.state = {
            green: "#2ec061",
            red: "#c61515",
            getRecomendations: false,
            newsIsLoading: false,
            news: []
        }
    }
    render() {
        const mobile = this.context.screen.xs || this.context.screen.sm ? true : false
        const desktop = this.context.screen.md || this.context.screen.lg || this.context.screen.xl ? true : false

        if ((this.props.activeTickerIndex === undefined || this.props.trackedCompanies.length === 0 || mobile))
            return null;
        else if (!this.context.quotes[this.context.activeTicker])
            return null;
        else {
            const index = this.props.activeTickerIndex;
            const userHasShares = this.props.trackedCompanies[index].shares.hasShares
            const count = this.props.trackedCompanies[index].shares.count;
            const price = this.props.trackedCompanies[index].shares.price;
            let { quote } = this.context.quotes[this.context.activeTicker];

            return (
                <div className="flex flex-column" style={{ marginRight: 15, height: window.innerHeight - 95 }}>
                    <div style={{ height: (window.innerHeight - 95)*0.4 }} className={classnames("flex", { "flex-column": this.props.screen.xs, "flex-row": !this.props.screen.xs || !this.props.screen.sm })}>
                        <Today sendUpdateToParent={this.receiveUpdateFromChild} screen={this.props.screen} trackedCompanies={this.props.trackedCompanies} removeCompanyFromTrackedCompanies={this.props.removeCompanyFromTrackedCompanies} ticker={this.props.activeTicker} />
                        <YourShares
                            week52High={quote.week52High}
                            week52Low={quote.week52Low}
                            price={quote.price}
                            width={50}
                            index={index}
                            count={count}
                            price={price}
                            trackedCompanies={this.props.trackedCompanies}
                            saveShares={this.props.saveShares}
                            ticker={this.props.activeTicker}
                            userHasShares={userHasShares} />
                    </div>
                    <div style={{ height: (window.innerHeight - 95)*0.6 }} className='flex flex-row'>
                        <div className="flex flex-column dashed-border-top width-50">
                            <div className="flex flex-row dashed-border-bottom width-100">
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1d'} interval={8} title='1 Day' rightDivider />
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'6m'} interval={2} title='6 Month' rightDivider />
                            </div>
                            <div className="flex flex-row width-100">
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'1y'} interval={5} title='1 Year' rightDivider />
                                <LineChart screen={this.props.screen} width={'50%'} ticker={this.props.activeTicker} timeframe={'5y'} interval={20} title='5 Year' rightDivider />
                            </div>
                        </div>
                        {
                            this.context.screen.lg || this.context.screen.xl
                                ?
                                <div className="flex flex-column width-20 dashed-border-top flex-center dashed-border-right">
                                    {
                                        this.state.getRecomendations
                                            ?
                                            <Recomendations />
                                            :
                                            <GetRecomendations showRecomendations={this.showRecomendations} />
                                    }
                                </div>
                                :
                                null
                        }

                        <div className={classnames('flex flex-column dashed-border-top news-container', { 
                                'width-30': this.context.screen.lg || this.context.screen.xl, 
                                'width-50': this.context.screen.xs || this.context.screen.sm || this.context.screen.md,
                                'flex-center-start': this.state.news.length > 0,
                                'flex-center': this.state.news.length === 0, })
                            }>
                            {<News news={this.state.news} />}
                        </div>
                    </div>
                    <Systems />
                </div>
            )
        }

    }
}
const mapStateToProps = state => {
    let { active } = state;
    return {
      age: state.age,
      active: active,
    };
  };
  
  const mapDispachToProps = dispatch => {
    return {
      onAgeUp: () => dispatch({ type: "AGE_UP", value: 1 }),
      onAgeDown: () => dispatch({ type: "AGE_DOWN", value: 1 })
    };
  };
  export default connect(
    mapStateToProps,
    mapDispachToProps
  )(withRouter(Bread));