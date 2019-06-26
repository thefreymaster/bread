import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Settings from '../components/Settings/Settings';
import AddCompany from '../components/Companies/AddCompany/AddCompany';
import Choices from '../components/Choices/Choices';
import Login from '../components/Login/Login';
import GetStarted from '../components/GetStarted/GetStarted';
import Portfolio from '../components/Portfolio/PortfolioLink';
import Companies from '../components/Companies/Companies';
import Body from '../components/Body/Body';

const BRouter = (props) => {
    const { containsSubdomain, isFetching, isLoggedIn, screen, trackedCompanies } = props;
    const mobile = screen.xs || screen.sm ? true : false
    const desktop = screen.md || screen.lg || screen.xl ? true : false

    return (
        <Switch>
            <Route path="/add" render={props => <AddCompany />} />
            <Route path="/choices" render={props => trackedCompanies.length === 0 ? <Choices /> : <Redirect to={'/quote'} />} />
            <Route path="/login" render={props => localStorage.getItem('LOAF_USER') ? <Redirect to={'/quote'} /> : <Login />} />
            <Route path="/rise" render={props => <GetStarted />} />
            <Route path="/quote/:symbol" render={props =>
                trackedCompanies.length === 0
                    ?
                    <AddCompany />
                    :
                    desktop
                        ?
                        <div>BODY PLACEHOLDER</div>
                        // <Body
                        //     saveShares={saveShares}
                        //     setActiveTicker={setActiveTicker}
                        //     screen={props.screen}
                        //     removeCompanyFromTrackedCompanies={removeCompanyFromTrackedCompanies}
                        //     trackedCompanies={props.trackedCompanies}
                        //     activeTicker={state.activeTicker}
                        //     activeTickerIndex={state.activeTickerIndex}
                        // />
                        :
                        <div>COMPANIES PLACEHOLDER</div>
                        // <Companies activeTicker={state.activeTicker} />
            }
            />
            <Route exact path="/quote" render={props => <Redirect to={'/portfolio'} />} />
            <Route path="/portfolio" render={props => trackedCompanies.length === 0 ? <AddCompany /> : <Portfolio />} />
            <Route path="/settings" render={props =>
                trackedCompanies.length === 0 && !localStorage.getItem('LOAF_USER')
                    ?
                    <Redirect
                        to={'/rise'}
                    />
                    :
                    <Settings />
            }
            />
            <Route path="/" render={props =>
                trackedCompanies.length === 0 && !localStorage.getItem('LOAF_USER')
                    ?
                    <Redirect
                        to={'/rise'}
                    />
                    :
                    <Redirect to={'/portfolio'} />
            }
            />
            <Route path="/*" render={() => <Redirect to="/" />} />
        </Switch>
    )
}


const mapStateToProps = state => {
    let { meta, screen, trackedCompanies } = state;
    let { isLoggedIn, isFetching, containsSubdomain } = meta;
    return {
        isLoggedIn: isLoggedIn,
        isFetching: isFetching,
        containsSubdomain: containsSubdomain,
        screen,
        trackedCompanies
    };
};

export default connect(
    mapStateToProps,
    null,
)(BRouter);

