import React from 'react';
import CountUp from 'react-countup';
import { Icon } from 'antd'

function Metric(props) {
    const inline = {
        title: {
            fontSize: props.titleFontSize,
            color: props.color,
            fontFamily: props.fontFamily ? props.fontFamily : null,
            fontWeight: props.fontWeight ? props.fontWeight : null,
            textAlign: props.center ? 'center' : 'left',
            transition: 'text-align 300ms ease-in-out, background-color 200ms ease-in-out',
            backgroundColor: props.backgroundColor ? props.backgroundColor : null
        },
        label: {
            fontSize: props.labelFontSize,
            marginTop: props.labelCloseToTitle ? -20 : 0,
            textAlign: props.center ? 'center' : 'left',
        },
        parent: {
            alignItems: props.align,
            paddingLeft: props.paddingleft ? 10 : 0,
            width: props.width
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
                        decimals={props.decimals} 
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