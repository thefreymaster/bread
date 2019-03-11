import React from 'react'
import './CompanyLogo.css';

function CompanyLogo(props){
    return(
        <img className='company-logo' src={'https://storage.googleapis.com/iex/api/logos/' + props.symbol.toUpperCase() + '.png'}/>
    )
}

export default CompanyLogo;