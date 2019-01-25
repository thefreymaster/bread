import React from 'react';

function Metric(props) {
    const inline = {
        title: {
            fontSize: props.titleFontSize,
            color: props.color ? props.color : '#000000a6'
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
            <div style={inline.title} className="price-metric">{props.title}</div>
            <div style={inline.label} className="loaf-label">{props.label}</div>
        </div>
    )
}
export default Metric;