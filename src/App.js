import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";

import './App.css';
import './Overrides.css'
import './Animations.css'
import 'antd/dist/antd.css';
import { Layout, message, notification, Icon } from 'antd';
import { writeUserData, getFirebaseAuthObject, readUserCompanyData, updateUserCompanyData, updateUserCompanyShareData } from './api/FirebaseAPI';
import { getQuickQuotes, getQuote } from './api/StatsAPI';

import { determineIfMarketsAreOpen, getDayOfWeek, getMinutesOfDay, getHourOfDay, getPercentChange, sortCompaniesAscending, sortCompaniesDescending, sortCompaniesABC, sortCompaniesYTDChange } from './components/HelperFunctions/Helper';

import classnames from 'classnames';

import Companies from './components/Companies/Companies';
import Body from './components/Body/Body';
import CompanyStatistics from './components/CompanyStatistics/CompanyStatistics';
import Navigation from './components/Navigation/Navigation';
import GetStarted from './components/GetStarted/GetStarted';
import NoMatch from './components/NoMatch/NoMatch';
import AddCompany from './components/Companies/AddCompany/AddCompany';
import Login from './components/Login/Login';
import Load from './components/Load';
import Metric from './components/Body/Metric';
import Portfolio from './components/Portfolio/Portfolio';
import { LoafContext } from './LoafContext';
import { showNotification } from './components/HelperFunctions/Notifications';
import RightSider from './components/RightSider/RightSider'
import { RED, GREEN } from './Constants';
import { getPortfolioTotal, getBest, getWorst } from './api/PortfolioAPI';
import Settings from './components/Settings/Settings';


const firebase = getFirebaseAuthObject();
const filter = 'ytdChange,changePercent,week52High,week52Low,latestPrice,previousClose,extendedPrice,companyName,symbol'


const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component {
  setActiveTicker = (value, company, addCompanyToTrackedList, index) => {
    if (index === undefined && addCompanyToTrackedList === false) {
      index = 0;
    }
    else if (addCompanyToTrackedList === true) {
      index = this.state.trackedCompanies.length;
    }
    this.setState({
      activeTicker: value,
      activeTickerIndex: parseInt(index)
    }, addCompanyToTrackedList ? this.addCompanyToTrackedCompanies(company) : null)
  }
  setActiveAfterSubmit = (value, company, index) => {
    if (index === undefined) {
      index = 0;
    }
    else {
      index = this.state.trackedCompanies.length;
    }
    this.setState({
      activeTicker: value,
      activeTickerIndex: parseInt(index)
    })
  }
  receiveDataFromChild = (portfolio) => {
    this.setState({
      portfolio: portfolio
    }, () => {
    })
  }
  saveShares = (price, count) => {
    let that = this;
    let _trackedCompanies = that.state.trackedCompanies;
    for (let index of _trackedCompanies.keys()) {
      if (_trackedCompanies[index].symbol === this.state.activeTicker) {
        if (localStorage.getItem('LOAF_USER')) {
          _trackedCompanies[index].shares = { price: price, count: count, hasShares: true };
          let userID = JSON.parse(localStorage.getItem('LOAF_USER')).uid;
          updateUserCompanyShareData(userID, _trackedCompanies, index)
        }
        else {
          _trackedCompanies[index].shares = { price: price, count: count, hasShares: true };
          localStorage.setItem("trackedCompanies", JSON.stringify(_trackedCompanies));
        }
        that.setState({
          trackedCompanies: _trackedCompanies
        })
      }
    }

  }
  addCompanyToTrackedCompanies = (symbol, company) => {
    let that = this;
    let _trackedCompanies = this.state.trackedCompanies;
    let quote = {};
    let quotes = {}
    company['shares'] = { price: '', count: '', hasShares: false };
    _trackedCompanies.push(company);
    if (localStorage.getItem('LOAF_USER')) {
      let userID = JSON.parse(localStorage.getItem('LOAF_USER')).uid;
      updateUserCompanyData(userID, _trackedCompanies);
      quote = getQuote(company.symbol);
      quote.then((response) => {
        quotes = that.state.quotes;
        if (!quotes) {
          quotes = { [response.symbol]: { quote: response } }
        }
        else {
          quotes = Object.assign(quotes, { [response.symbol]: { quote: response } })
        }
        that.setState({
          quotes: quotes
        }, () => {
          that.setActiveAfterSubmit(symbol, company)
        })
      })
    }
    else {
      localStorage.setItem("trackedCompanies", JSON.stringify(_trackedCompanies));
      quote = getQuote(company.symbol);
      quote.then((response) => {
        quotes = that.state.quotes;
        if (!quotes) {
          quotes = { [response.symbol]: { quote: response } }
        }
        else {
          quotes = Object.assign(quotes, { [response.symbol]: { quote: response } })
        }
        that.setState({
          quotes: quotes
        }, () => {
          that.setActiveAfterSubmit(symbol, company)
        })
      })
    }
    message.success(company.symbol + ' successfully added to account.');
    this.setState({
      trackedCompanies: _trackedCompanies
    })
  }
  removeCompanyFromTrackedCompanies = (symbol) => {
    let that = this;
    let _trackedCompanies = that.state.trackedCompanies;
    for (let [index, item] of _trackedCompanies.entries()) {
      if (item.symbol === symbol) {
        _trackedCompanies.splice(index, 1);
        if (localStorage.getItem('LOAF_USER')) {
          let userID = JSON.parse(localStorage.getItem('LOAF_USER')).uid;
          updateUserCompanyData(userID, _trackedCompanies)
        }
        else {
          localStorage.setItem("trackedCompanies", JSON.stringify(_trackedCompanies));
        }
        message.success(item.symbol + ' successfully removed from your account.');

        that.setState({
          trackedCompanies: _trackedCompanies,
          activeTickerIndex: index === 0 ? index : index - 1
        }, () => {
          if (index === _trackedCompanies.length) {
            that.setActiveTicker(that.state.trackedCompanies[index - 1].symbol, that.state.trackedCompanies[index - 1], false, index - 1)
          }
          else {
            that.setActiveTicker(that.state.trackedCompanies[index].symbol, that.state.trackedCompanies[index], false, index)
          }
        })
      }
    }
  }
  fetchingTrackedCompanies = () => {
    this.setState({
      fetchingTrackedCompanies: true
    })
  }

  fetchingTrackedCompaniesComplete = () => {
    this.setState({
      fetchingTrackedCompanies: false
    })
  }
  constructor() {
    super()
    this.state = {
      screen: {
        xs: false,
        sm: false,
        md: false,
        lg: false,
        xl: false,
      },
      fetchingTrackedCompanies: false,
      activeTicker: '',
      trackedCompanies: [],
      minute: getMinutesOfDay(),
      hour: getHourOfDay(),
      day: getDayOfWeek(),
      determineIfMarketsAreOpen: determineIfMarketsAreOpen
    }
  }

  render() {
    if (this.state.fetchingTrackedCompanies)
      return <Load />;
    else {
      return (
        <LoafContext.Provider
          value={{
            addCompanyToTrackedCompanies: this.addCompanyToTrackedCompanies,
            account: JSON.parse(localStorage.getItem('LOAF_USER')),
            activeTicker: this.state.activeTicker,
            screen: this.state.screen,
            trackedCompanies: this.state.trackedCompanies,
            setActiveTicker: this.setActiveTicker,
            quotes: this.state.quotes,
            sortAscending: this.sortAscending,
            sortDecending: this.sortDecending,
            sortABC: this.sortABC,
            sortYTD: this.sortYTD,
            portfolio: this.state.portfolio
          }}>
          <BrowserRouter>
            <main>
              <Layout>
                <Header style={{ marginBottom: this.state.screen.xs || this.state.screen.sm ? 0 : 20 }}>
                  <Navigation title={'Bread'} screen={this.state.screen} />
                </Header>
                <Layout style={{ minHeight: window.innerHeight - 64 }}>
                  {this.state.screen.xs || this.state.screen.sm
                    ?
                    <Switch>
                      <Route path="/add" render={props => <AddCompany
                        setActiveTicker={this.setActiveTicker}
                        trackedCompanies={this.state.trackedCompanies}
                        screen={this.state.screen}
                        firebase={firebase} />
                      } />
                      <Route path="/login" render={props =>
                        localStorage.getItem('LOAF_USER')
                          ?
                          <Redirect
                            to={'/quote'}
                          />
                          :
                          <Login
                            setActiveTicker={this.setActiveTicker}
                            trackedCompanies={this.state.trackedCompanies}
                            screen={this.state.screen} />
                      } />
                      <Route path="/rise" render={props => <GetStarted />
                      } />
                      <Route path="/quote" render={props =>
                        this.state.trackedCompanies.length === 0
                          ?
                          <AddCompany
                            setActiveTicker={this.setActiveTicker}
                            trackedCompanies={this.state.trackedCompanies}
                            screen={this.state.screen}
                            firebase={firebase} />
                          :
                          <div className={'flex flex-center'} style={{ height: window.innerHeight - 64 }}>
                            <Companies screen={this.state.screen} activeTicker={this.state.activeTicker} trackedCompanies={this.state.trackedCompanies} setActiveTicker={this.setActiveTicker} />
                          </div>}
                      />
                      <Route path="/" render={props =>
                        this.state.trackedCompanies.length === 0 && !localStorage.getItem('LOAF_USER')
                          ?
                          <Redirect
                            to={'/rise'}
                          />
                          :
                          <Redirect
                            to={'/quote'}
                          />}
                      />

                    </Switch>
                    :
                    <Fragment>
                      {this.state.trackedCompanies.length === 0 && this.state.fetchingTrackedCompanies === false
                        ?
                        null
                        :
                        <Sider className={classnames("left-sider", { "left-sider-small": this.state.screen.xs || this.state.screen.sm, "left-sider-large": this.state.screen.md || this.state.screen.lg || this.state.screen.xl })} style={{ maxHeight: window.innerHeight - 84 }}>
                          <Companies
                            screen={this.state.screen}
                            activeTicker={this.state.activeTicker}
                            trackedCompanies={this.state.trackedCompanies}
                            setActiveTicker={this.setActiveTicker} />
                        </Sider>

                      }
                      <Content>
                        <Switch>
                          <Route path="/add" render={props => <AddCompany
                            setActiveTicker={this.setActiveTicker}
                            trackedCompanies={this.state.trackedCompanies}
                            screen={this.state.screen}
                            firebase={firebase} />
                          } />
                          <Route path="/login" render={props =>
                            localStorage.getItem('LOAF_USER')
                              ?
                              <Redirect
                                to={'/quote'}
                              />
                              :
                              <Login
                                setActiveTicker={this.setActiveTicker}
                                trackedCompanies={this.state.trackedCompanies}
                                screen={this.state.screen} />
                          } />
                          <Route path="/rise" render={props => <GetStarted />
                          } />
                          <Route path="/quote" render={props =>
                            this.state.trackedCompanies.length === 0
                              ?
                              <AddCompany
                                setActiveTicker={this.setActiveTicker}
                                trackedCompanies={this.state.trackedCompanies}
                                screen={this.state.screen}
                                firebase={firebase} />
                              :
                              <Body
                                saveShares={this.saveShares}
                                setActiveTicker={this.setActiveTicker}
                                screen={this.state.screen}
                                removeCompanyFromTrackedCompanies={this.removeCompanyFromTrackedCompanies}
                                trackedCompanies={this.state.trackedCompanies}
                                activeTicker={this.state.activeTicker}
                                activeTickerIndex={this.state.activeTickerIndex}
                              />}
                          />
                          <Route path="/portfolio" render={props =>
                            this.state.trackedCompanies.length === 0
                              ?
                              <AddCompany
                                setActiveTicker={this.setActiveTicker}
                                trackedCompanies={this.state.trackedCompanies}
                                screen={this.state.screen}
                                firebase={firebase} />
                              :
                              <Portfolio
                                screen={this.state.screen}
                                sendDataToParent={this.receiveDataFromChild}
                                activeTicker={this.state.activeTicker}
                                trackedCompanies={this.state.trackedCompanies}
                                setActiveTicker={this.setActiveTicker} />
                          }
                          />
                          <Route path="/settings" render={props =>
                            this.state.trackedCompanies.length === 0 && !localStorage.getItem('LOAF_USER')
                              ?
                              <Redirect
                                to={'/rise'}
                              />
                              :
                              <Settings />
                          }
                          />
                          <Route path="/" render={props =>
                            this.state.trackedCompanies.length === 0 && !localStorage.getItem('LOAF_USER')
                              ?
                              <Redirect
                                to={'/rise'}
                              />
                              :
                              <Redirect
                                to={'/quote'}
                              />}
                          />


                        </Switch>
                      </Content>
                      {
                        this.state.trackedCompanies.length === 0 && this.state.fetchingTrackedCompanies === false
                          ?
                          null
                          :
                          this.state.screen.lg || this.state.screen.xl ?
                            <Sider className="right-sider paddingLeft10 paddingRight10">
                              <RightSider activeTicker={this.state.activeTicker} />
                            </Sider>
                            :
                            null
                      }
                    </Fragment>
                  }
                </Layout>
              </Layout>
            </main>
          </BrowserRouter>
        </LoafContext.Provider>
      );
    }



  }
  sortAscending = () => {
    localStorage.setItem('COMPANIES_SORT', 'ASCENDING')
    let trackedCompanies = sortCompaniesAscending(this.state.trackedCompanies);
    this.setState({
      trackedCompanies: trackedCompanies
    }, () => {
      if (this.state.activeTicker !== "portfolio")
        this.setActiveTicker(trackedCompanies[0].symbol, trackedCompanies[0], false, 0)
    })
  }
  sortDecending = () => {
    localStorage.setItem('COMPANIES_SORT', 'DESCENDING')
    let trackedCompanies = sortCompaniesDescending(this.state.trackedCompanies);
    this.setState({
      trackedCompanies: trackedCompanies
    }, () => {
      if (this.state.activeTicker !== "portfolio")
        this.setActiveTicker(trackedCompanies[0].symbol, trackedCompanies[0], false, 0)
    })
  }
  sortABC = () => {
    localStorage.setItem('COMPANIES_SORT', 'ABC')
    let trackedCompanies = sortCompaniesABC(this.state.trackedCompanies);
    this.setState({
      trackedCompanies: trackedCompanies
    }, () => {
      if (this.state.activeTicker !== "portfolio")
        this.setActiveTicker(trackedCompanies[0].symbol, trackedCompanies[0], false, 0)
    })
  }

  sortYTD = () => {
    localStorage.setItem('COMPANIES_SORT', 'YTD')
    let trackedCompanies = sortCompaniesYTDChange(this.state.trackedCompanies);
    this.setState({
      trackedCompanies: trackedCompanies
    }, () => {
      if (this.state.activeTicker !== "portfolio")
        this.setActiveTicker(trackedCompanies[0].symbol, trackedCompanies[0], false, 0)
    })
  }

  componentDidMount() {
    if (localStorage.getItem('LOAF_USER')) {
      this.fetchingTrackedCompanies();
      if (!localStorage.getItem('LOAF_WELCOME_SHOWN')) {
        showNotification('Hi ya!', 'Welcome in, ' + JSON.parse(localStorage.getItem('LOAF_USER')).displayName, 'blue', 'smile');
        localStorage.setItem('LOAF_WELCOME_SHOWN', true)
      }
      let userID = JSON.parse(localStorage.getItem('LOAF_USER')).uid;
      let _trackedCompanies = readUserCompanyData(userID);
      _trackedCompanies = _trackedCompanies.then((companies) => {
        if (companies) {
          companies.sort(function (a, b) {
            if (a.symbol < b.symbol) { return -1; }
            if (a.symbol > b.symbol) { return 1; }
            return 0;
          })
          this.setState({
            trackedCompanies: companies,
          }, () => {
            this.getQuotesData();
          })
        }
      });
    }
    else if (localStorage.getItem("trackedCompanies")) {
      this.fetchingTrackedCompanies();
      let _trackedCompanies = JSON.parse(localStorage.getItem("trackedCompanies"));
      _trackedCompanies.sort(function (a, b) {
        if (a.symbol < b.symbol) { return -1; }
        if (a.symbol > b.symbol) { return 1; }
        return 0;
      })

      this.setState({
        trackedCompanies: _trackedCompanies,
      }, () => {
        this.setActiveTicker(_trackedCompanies[0].symbol, _trackedCompanies[0], false)
        this.getQuotesData();
      })
    }
    this.checkDeviceSize();
    window.addEventListener('resize', () => {
      this.checkDeviceSize();
    })
    setTimeout(() => {
      window.location.reload()
    }, 3600000);


  }
  getQuotesData = () => {
    let that = this;
    let symbols = [];
    for (let symbol in that.state.trackedCompanies) {
      symbols.push(that.state.trackedCompanies[symbol].symbol)
    }
    let index = 0;
    let quote = getQuickQuotes(symbols, filter);
    let trackedCompanies = that.state.trackedCompanies;
    let market = that.state.determineIfMarketsAreOpen(this.state.day, this.state.hour, this.state.minute);
    quote.then(response => {
      let change;
      for (let [key] of Object.entries(response)) {
        change = getPercentChange(response[key].quote);
        trackedCompanies[index]['quote'] = response[key].quote;
        if (parseFloat(change) > 5 && market) {
          notification.success({
            message: response[key].quote.companyName,
            description: key + ' is up ' + getPercentChange(response[key].quote) + '% today.',
            onClick: () => {
              this.findIndex(key)
            },
            duration: 5,
            icon: <Icon type="rise" style={{ color: GREEN }} />,
          });
        }
        if (parseFloat(change) < -5 && market) {
          notification.warning({
            message: response[key].quote.companyName,
            description: key + ' is down ' + getPercentChange(response[key].quote) + '% today.',
            onClick: () => {
              this.findIndex(key)
            },
            duration: 5,
            icon: <Icon type="fall" style={{ color: RED }} />,
          });
        }
        index++;
      }

      that.setState({
        quotes: response,
        trackedCompanies: trackedCompanies,
      }, () => {
        this.getPortfolioData();
      })
      that.fetchingTrackedCompaniesComplete();
    })
  }
  getPortfolioData = () => {
    let that = this;
    let data = getPortfolioTotal(that.state.trackedCompanies, that.state.quotes);
    data.then(response => {
      that.setState({
        portfolio: response.data
      })
    })
  }
  checkDeviceSize() {
    if (window.innerWidth < 600) {
      this.setState({
        screen: {
          xs: true,
          sm: false,
          md: false,
          lg: false,
          xl: false,
        }
      })
    }
    if (window.innerWidth >= 600 && window.innerWidth < 960) {
      this.setState({
        screen: {
          xs: false,
          sm: true,
          md: false,
          lg: false,
          xl: false,
        }
      })
    }
    if (window.innerWidth >= 960 && window.innerWidth < 1280) {
      this.setState({
        screen: {
          xs: false,
          sm: false,
          md: true,
          lg: false,
          xl: false,
        }
      })
    }
    if (window.innerWidth >= 1280 && window.innerWidth < 1920) {
      this.setState({
        screen: {
          xs: false,
          sm: false,
          md: false,
          lg: true,
          xl: false,
        }
      })
    }
    if (window.innerWidth >= 1920) {
      this.setState({
        screen: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: true,
        }
      })
    }
  }
}

export default App;
