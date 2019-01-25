import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

import AddCompany from './components/AddCompany/AddCompany';
import Loaf from './components/Loaf/Loaf';
import CompanyStatistics from './components/CompanyStatistics/CompanyStatistics';

const {
  Header, Footer, Sider, Content,
} = Layout;

class App extends Component {
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
      activeTicker: 'aapl'
    }
  }
  render() {
    return (
      <main>
        <Layout>
          <Header style={{ marginBottom: 20 }}>Loaf</Header>
          <Layout style={{ minHeight: window.innerHeight - 84 }}>
            <Sider className="left-sider">
              <AddCompany />
            </Sider>
            <Content>
              <Loaf activeTicker={this.state.activeTicker} />
            </Content>
            {
              this.state.screen.lg || this.state.screen.xl ?
                <Sider className="right-sider">
                  <CompanyStatistics />
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
