import React from 'react'
import { Badge } from 'antd';
import { RED, GREEN, GREY } from './../../Constants';
import CompanyLogo from '../CompanyLogo/CompanyLogo';

function ChangeBadge(props) {
    return (
        <Badge
            style={{ 
                backgroundColor: props.backgroundColor, 
                opacity: 0.6, 
                fontSize: props.fontSize ? props.fontSize : 9, margin: 2,
                width: props.width
            }}
            count={props.count} />
    )
}

export default ChangeBadge;