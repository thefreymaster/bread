import React, { Fragment } from 'react';
import Metric from '../Metric';
import { Button } from 'antd';

function NoShares(props){
    return(
        <div className="flex flex-column">
            <div style={{paddingBottom: 20}}>
                <Metric align='center' titleFontSize={48} title="No Shares" label="Add shares you own here" />
            </div>
            <Button className="width100 loaf-button">Add Shares</Button>
        </div>
    )
}
export default NoShares;