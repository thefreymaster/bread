import React from 'react'
import Metric from '../Body/Metric';
import { GREEN, RED, GREY } from '../../Constants';


const PortfolioToday = (props) => {
    let {currentTotal, previousTotal, percentChange, total} = props;
    return (
        <div className={"loaf-component flex flex-column flex-center border-right"} style={{ height: (window.innerHeight - 84) * 0.40, width: '50%' }}>
            <Metric
                title={currentTotal}
                label="Portfolio Current Value"
                number
                center
                fontWeight={900}
                duration={1}
                decimals={2}
                color={currentTotal == 0 ? GREY : currentTotal > previousTotal ? GREEN : RED}
                titleFontSize={56}
                prefix={'$'} />
            <div className="flex flex-row width-100">
                <Metric
                    title={total}
                    label="Initial Cost"
                    number
                    center
                    width={'33%'}
                    titleFontSize={18}
                    fontWeight={900}
                    duration={1}
                    decimals={0}
                    fontFamily={'Open Sans'}
                    prefix={'$'} />
                <Metric
                    title={!previousTotal ? 0 : currentTotal - previousTotal}
                    label="Change Today"
                    number
                    width={'33%'}
                    center
                    color={percentChange > 0 ? GREEN : RED}
                    titleFontSize={18}
                    fontWeight={900}
                    duration={1}
                    decimals={0}
                    fontFamily={'Open Sans'}
                    prefix={'$'} />
                <Metric
                    title={percentChange}
                    label="Change Today"
                    titleFontSize={18}
                    fontWeight={900}
                    duration={1}
                    color={percentChange > 0 ? GREEN : RED}
                    center
                    number
                    width={'33%'}
                    decimals={2}
                    suffix={'%'}
                    fontFamily={'Open Sans'} />
            </div>
        </div>
    )
}

export default PortfolioToday;