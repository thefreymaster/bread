import React from 'react';
import { Button } from 'antd';
import Metric from '../Body/Metric';

const GetRecomendations = (props) => {
    return (
        <div>
            <div className="width-100">
                <Metric
                    title="Recomendations"
                    label="Get Buy, Hold, and Sell Ratings"
                    center
                    width={'100%'}
                    titleFontSize={18}
                    fontWeight={900}
                    duration={1}
                    decimals={0}
                    fontFamily={'Open Sans'}
                    prefix={'$'} />
            </div>
            <div className="shares-divider"> </div>
            <Button onClick={props.showRecomendations} className="width100 loaf-button">Get Recomendations</Button>
        </div>
    )
}

export default GetRecomendations;