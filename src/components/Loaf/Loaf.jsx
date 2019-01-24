import React, { Component, Fragment } from 'react';
import "./Loaf.css";
import Today from './Today/Today';
import YourShares from './YourShares/YourShares';


class Loaf extends Component {
    render() {
        return(
            <div className="flex flex-row">
                <Today />   
                <YourShares userHasShares={true}/>
            </div>
        )
    }
}

export default Loaf;