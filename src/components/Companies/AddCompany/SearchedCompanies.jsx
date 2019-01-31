import React from 'react';
import Metric from '../../Loaf/Metric'

function SearchedCompanies(props) {
    if (!props.searchedCompanies)
        return null
    else
        return (
            props.searchedCompanies.map((company, index) => {
                if(index < 5)
                return (
                    <div className=" loaf-button-hover-action paddingTop10 paddingLeft10 paddingButtom10" onClick={() => {props.setActiveTicker(company.symbol, company, true); props.closeAddCompanySideBar()}}>
                        <Metric fontFamily={'Open Sans'} fontWeight={900} titleFontSize={14} title={company.name} labelFontSize={11} label={company.symbol} />
                    </div>
                )
            })
        )
}
export default SearchedCompanies;