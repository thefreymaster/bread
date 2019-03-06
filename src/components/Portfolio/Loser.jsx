import React from 'react';
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import None from './None';
import { RED } from './../../Constants';

const Loser = (props) => {
    if (Object.keys(props.loser).length === 0) {
        return <None titleFontSize={32} title='None' label='No Losers Today' badge />
    }
    else {
        return (
            <div className='flex flex-row width-100'>
                <div className='flex flex-column'>
                    <Metric
                        title={props.loser.symbol}
                        label={props.loser.name}
                        fontWeight={900}
                        duration={1}
                        decimals={2}
                        color={RED}
                        titleFontSize={32}
                        prefix={'$'} />
                    <Metric
                        fontFamily={'Open Sans'}
                        fontWeight={900}
                        titleFontSize={12}
                        color={RED}
                        prefix={'$'}
                        decimals={2}
                        duration={1}
                        number
                        label='Loser'
                        title={props.loser.price ? props.loser.price : 0}
                        labelFontSize={11}
                        center={false}
                    />
                </div>
                <div className='flex flex-badge'>
                    <ChangeBadge
                        count={parseFloat(props.loser.changePercent ? props.loser.changePercent : 0).toFixed(2) + '%'}
                        backgroundColor={RED}
                        fontSize={14}
                        company={props.loser} />
                </div>
            </div>
        )
    }
}

export default Loser;