import React from 'react';
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import None from './None';
import { GREEN } from './../../Constants';

const Gainer = (props) => {
    if (Object.keys(props.gainer).length === 0) {
        return <None titleFontSize={32} title='None' label='No Winners Today' badge />
    }
    else {
        return (
            <div className='flex flex-row width-100'>
                <div className='flex flex-column'>
                    <Metric
                        title={props.gainer.symbol}
                        label={props.gainer.name}
                        fontWeight={900}
                        duration={1}
                        decimals={2}
                        color={GREEN}
                        titleFontSize={32}
                        prefix={'$'} />
                    <Metric
                        fontFamily={'Open Sans'}
                        fontWeight={900}
                        titleFontSize={12}
                        color={GREEN}
                        prefix={'$'}
                        decimals={2}
                        duration={1}
                        number
                        title={props.gainer.price}
                        label='Gainer'
                        labelFontSize={11}
                        center={false}
                    />
                </div>
                <div className='flex flex-grow'></div>
                <div className='flex flex-badge'>
                    <ChangeBadge
                        count={parseFloat(props.gainer.changePercent ? props.gainer.changePercent : 0).toFixed(2) + '%'}
                        backgroundColor={GREEN}
                        fontSize={14}
                        company={props.gainer} />
                </div>
            </div>
        )
    }
}

export default Gainer;