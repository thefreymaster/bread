import React from 'react';
import { Button } from 'antd';
import Metric from '../Body/Metric';
import { Steps, Icon } from 'antd';
import { LIGHT_GREY } from './../../Constants';
const Step = Steps.Step;


const GetRecomendations = (props) => {
    return (
        <div>
            <div className="width-100">
                <Metric
                    title="Should You Buy"
                    label="Buy, Hold, or Sell"
                    center
                    width={'100%'}
                    titleFontSize={14}
                    fontWeight={900}
                    duration={1}
                    decimals={0}
                    fontFamily={'Open Sans'}
                    prefix={'$'} />
            </div>
            <div className="shares-divider"> </div>
            <Button onClick={props.showRecomendations} className="width100 loaf-button">Get</Button>
            <div style={{marginTop: 10, paddingTop: 10}}> </div>
            <Steps>
                <Step icon={<Icon style={{ color: LIGHT_GREY }} type="login" />} />
                <Step icon={<Icon style={{ color: LIGHT_GREY }} type="sync" />} />
                <Step icon={<Icon style={{ color: LIGHT_GREY }} type="logout" />} />
            </Steps>
        </div>
    )
}

export default GetRecomendations;