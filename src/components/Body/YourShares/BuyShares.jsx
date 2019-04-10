import React from 'react';
import { Button } from 'antd';

const Buy = () => {
    window.location.href = 'http://share.robinhood.com/evanf47';
}

const BuyShares = props => (
    <Button style={{borderRadius: 50}} onClick={Buy} className="width100 loaf-button">Buy Shares on Robinhood</Button>
)
export default BuyShares;