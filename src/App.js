import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';
import classnames from 'classnames';

import Companies from './components/Companies/Companies';
import Loaf from './components/Loaf/Loaf';
import CompanyStatistics from './components/CompanyStatistics/CompanyStatistics';

const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component {
  setActiveTicker = (value, company, addCompanyToTrackedList, index) => {
    if(index === undefined){
      index = 0;
    }
    this.setState({
      activeTicker: value,
      activeTickerIndex: parseInt(index)
    }, addCompanyToTrackedList ? this.addCompanyToTrackedCompanies(company) : null)
  }
  saveShares = (price, count) => {
    let that = this;
    let _trackedCompanies = that.state.trackedCompanies;
    for(let index of _trackedCompanies.keys())
    {
      if(_trackedCompanies[index].symbol === this.state.activeTicker){
        _trackedCompanies[index].shares = { price: price, count: count, hasShares: true };
        localStorage.setItem("trackedCompanies", JSON.stringify(_trackedCompanies));
        that.setState({
          trackedCompanies: _trackedCompanies
        })
      }
    }

}
  addCompanyToTrackedCompanies = (company) => {
    let _trackedCompanies = this.state.trackedCompanies;
    company['shares'] = {price: '', count: '', hasShares: false};
    _trackedCompanies.push(company)
    localStorage.setItem("trackedCompanies", JSON.stringify(_trackedCompanies));
    
    this.setState({
      trackedCompanies: _trackedCompanies
    })
  }
  removeCompanyFromTrackedCompanies = (symbol) => {
    let that = this;
    let _trackedCompanies = that.state.trackedCompanies;
    for(let [index, item] of _trackedCompanies.entries()){
      if(item.symbol === symbol)
      {
        _trackedCompanies.splice(index, 1)
        localStorage.setItem("trackedCompanies", JSON.stringify(_trackedCompanies));
        that.setState({
          trackedCompanies: _trackedCompanies
        }, () => {
          if(index === _trackedCompanies.length){
            that.setActiveTicker(that.state.trackedCompanies[index-1].symbol, that.state.trackedCompanies[index-1], false)
          }
          else{
            that.setActiveTicker(that.state.trackedCompanies[index].symbol, that.state.trackedCompanies[index], false)
          }
        })
      }
    }
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
      activeTicker: '',
      trackedCompanies: []
    }
  }
  render() {
    return (
      <main>
        <Layout>
          <Header style={{ marginBottom: 20 }}>Loaf</Header>
          <Layout style={{ minHeight: window.innerHeight - 84 }}>
            <Sider className={classnames("left-sider paddingLeft10 paddingRight10", {"left-sider-small" : this.state.screen.xs || this.state.screen.sm})} style={{maxHeight: window.innerHeight-84}}>
              <Companies screen={this.state.screen} activeTicker={this.state.activeTicker} trackedCompanies={this.state.trackedCompanies} setActiveTicker={this.setActiveTicker} />
            </Sider>
            <Content>
              <Loaf 
               saveShares={this.saveShares}
               screen={this.state.screen} 
               removeCompanyFromTrackedCompanies={this.removeCompanyFromTrackedCompanies} 
               trackedCompanies={this.state.trackedCompanies} 
               activeTicker={this.state.activeTicker}
               activeTickerIndex={this.state.activeTickerIndex} />
            </Content>
            {
              this.state.screen.lg || this.state.screen.xl ?
                <Sider className="right-sider padding10">
                  <CompanyStatistics activeTicker={this.state.activeTicker}/>
                </Sider>
                :
                null
            }

          </Layout>
        </Layout>
      </main>
    );
  }
  componentDidMount() {
    if(localStorage.getItem("trackedCompanies"))
    {
      let _trackedCompanies = JSON.parse(localStorage.getItem("trackedCompanies"));
      this.setState({
        trackedCompanies: _trackedCompanies
      }, this.setActiveTicker(_trackedCompanies[0].symbol, _trackedCompanies[0], false))
    }
    this.checkDeviceSize();
    window.addEventListener('resize', () => {
      this.checkDeviceSize();
    })
    setTimeout(() => {
      window.location.reload()
    }, 3600000);
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
    console.log(this.state)
  }
}

export default App;
