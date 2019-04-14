import React from 'react';
import { Button } from 'antd';

const Robinhood = 'http://share.robinhood.com/evanf47'

const Buy = () => {
    window.location.href = 'http://share.robinhood.com/evanf47';
}

const BuyShares = props => (
    <a href={Robinhood} target="_blank" style={{position: 'relative', bottom: 10}}>
        <div style={{ fontSize: 10, color: '#8080808c', textAlign: 'center' }}>Invite link helps fund Bread</div>
        <Button style={{ borderRadius: 50 }} className="width100 loaf-button">Buy Shares on Robinhood</Button>
    </a>
)
export default BuyShares;