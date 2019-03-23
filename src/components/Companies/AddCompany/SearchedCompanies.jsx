import React from 'react';
import Metric from '../../Body/Metric'
import { Link } from "react-router-dom";


const SearchedCompanies = (props) => {
    if (!props.searchedCompanies)
        return null
    else
        return (
            props.searchedCompanies.map((company, index) => {
                if (index < 10)
                    return (
                        <Link to="/quote">
                            <div className=" loaf-button-hover-action paddingTop10 paddingLeft10 paddingButtom10" onClick={() => { props.addCompanyToTrackedCompanies(company.symbol, company, true) }}>
                                <Metric center fontFamily={'Open Sans'} fontWeight={900} titleFontSize={14} title={company.symbol} labelFontSize={11} />
                            </div>
                        </Link>

                    )
            })
        )
}
export default SearchedCompanies;