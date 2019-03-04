import React from 'react';
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import { GREY } from './../../Constants';

const None = (props) => (
    <div className='flex flex-row width-100'>
        <div className='flex flex-column'>
            <Metric
                title={props.title}
                label={props.label}
                fontWeight={900}
                duration={1}
                decimals={2}
                color={GREY}
                titleFontSize={32}
                fontFamily={'Open Sans'}
                prefix={'$'} />
        </div>
        <div className='flex flex-badge'>
            <ChangeBadge
                count={'None'}
                backgroundColor={GREY}
                fontSize={14}
                company={props.loser} />
        </div>
    </div>
)

export default None;