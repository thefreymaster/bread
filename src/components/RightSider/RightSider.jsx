import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, withRouter } from "react-router-dom";
import PortfolioStatistics from '../Portfolio/PortfolioStatistics';
import CompanyStatistics from '../CompanyStatistics/CompanyStatistics'


const RightSider = (props) => {
    if(props.location.pathname === '/portfolio'){
        return (
            <PortfolioStatistics activeTicker={props.activeTicker} />
        )
    }
    else if(props.location.pathname === '/quote'){
        return (
            <CompanyStatistics activeTicker={props.activeTicker} />
        )
    }
    else{
        return null
    }
}

export default withRouter(RightSider)