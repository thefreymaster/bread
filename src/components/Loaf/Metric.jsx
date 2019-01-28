import React from 'react';
import CountUp from 'react-countup';

function Metric(props) {
    const inline = {
        title: {
            fontSize: props.titleFontSize,
            color: props.color,
            fontFamily: props.fontFamily ? props.fontFamily : null
        },
        label: {
            fontSize: props.labelFontSize,
            marginTop: props.labelCloseToTitle ? -20 : 0,
        },
        parent: {
            alignItems: props.align,
            paddingLeft: props.paddingleft ? 10 : 0,
        }
    }
    return (
        <div style={inline.parent} className="flex flex-column">
            {
                props.number
                    ?
                    <CountUp 
                        style={inline.title} 
                        prefix={props.prefix} 
                        separator="," 
                        suffix={props.suffix} 
                        className="price-metric" 
                        decimals={2} 
                        decimal="." 
                        start={0} 
                        duration={props.duration}
                        end={props.title} />
                    :
                    <div style={inline.title} className="price-metric">{props.title}</div>
            }
            <div style={inline.label} className="loaf-label">{props.label}</div>
        </div>
    )
}
export default Metric;