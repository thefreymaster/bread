import React from 'react'
import { Badge } from 'antd';
import { RED, GREEN, GREY } from './../../Constants';
import CompanyLogo from '../CompanyLogo/CompanyLogo';

function ChangeBadge(props){
    if(props.company.shares){
        return(
            <Badge 
                style={{backgroundColor: props.backgroundColor, opacity: 0.6, fontSize: 9, margin: 2}} 
                count={props.count} />
        )
    }
}

export default ChangeBadge;