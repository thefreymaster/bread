import React from 'react';
import Metric from '../Body/Metric';
import ChangeBadge from '../ChangeBadge/ChangeBadge';
import None from './None';

const PortfolioStatItem = (props) => {
    if (Object.keys(props.stat).length === 0) {
        return <None title='None' label='No Winners Today' />
    }
    else {
        return (
            <div className='flex flex-row width-100'>
                <div className='flex flex-column width-100'>
                    <Metric
                        fontFamily={'Open Sans'}
                        fontWeight={900}
                        titleFontSize={12}
                        color={props.color}
                        prefix={'$'}
                        decimals={2}
                        duration={1}
                        number
                        center
                        label={props.label}
                        labelFontSize={11}
                    />
                    <Metric
                        title={props.stat.symbol}
                        label={props.stat.name}
                        fontWeight={900}
                        duration={1}
                        decimals={2}
                        center
                        color={props.color}
                        titleFontSize={24}
                        prefix={'$'} />

                    <div className='flex flex-badge flex-center'>
                        <ChangeBadge
                            count={'$' + parseFloat(props.stat.change ? props.stat.change : 0).toFixed(2)}
                            backgroundColor={props.color}
                            fontSize={14}
                            company={props.stat} />
                    </div>
                </div>

            </div>
        )
    }
}

export default PortfolioStatItem;