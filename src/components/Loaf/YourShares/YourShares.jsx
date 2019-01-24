import React, { Component, Fragment } from 'react';
import Company from "../Today/Company";
import Ticker from "../Today/Ticker";
import Metric from "../Metric";
import NoShares from './NoShares';
import { Button } from 'antd';

class YourShares extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Fragment>
                {this.props.userHasShares
                    ?
                    <div className="loaf-component flex flex-column width-50">
                        <div className='flex flex-row'>
                            <div className='width-60'>
                                <Metric titleFontSize={36} title="Your Shares" labelFontSize={21} label="6 Shares" />
                            </div>
                            <div className='width-40 flex-center flex'>
                                <Button className="width100 loaf-button">Add Shares</Button>
                            </div>
                        </div>
                        <div className='flex-grow'></div>
                        <div className="flex flex-row">
                            <div className='width-33'>
                                <Metric align='flex-start' titleFontSize={32} title="$108.34" label="Average Price" />
                            </div>
                            <div className='width-33'>
                                <Metric align='center' titleFontSize={32} title="$354" label="Total Gain" />
                            </div>
                            <div className='width-33'>
                                <Metric align='center' titleFontSize={32} title="3.42%" label="Total Change" />
                            </div>
                        </div>
                    </div>
                    :
                    <div className="loaf-component flex flex-column width-50 flex-center">
                        <NoShares />
                    </div>

                }
            </Fragment>
        )
    }
}

export default YourShares;