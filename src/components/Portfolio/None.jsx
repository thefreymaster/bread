import React from 'react';
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import { GREY } from './../../Constants';

const None = (props) => (
    <div className='flex flex-row width-100 flex-center'>
        <div className='flex flex-column'>
            <Metric
                title={props.title}
                label={props.label}
                fontWeight={900}
                duration={1}
                decimals={2}
                color={GREY}
                center={props.center}
                titleFontSize={props.titleFontSize}
                fontFamily={'Open Sans'}
                prefix={'$'} />
        </div>
        {
            props.badge
                ?
                <div className='flex flex-badge'>
                    <ChangeBadge
                        count={'None'}
                        backgroundColor={GREY}
                        fontSize={14}
                        company={props.loser} />
                </div>
                :
                null
        }
    </div>
)

export default None;