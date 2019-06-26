import React from 'react';
import Metric from '../../Body/Metric'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from 'react-router'
import { updateUserCompanyData } from '../../../api/FirebaseAPI';


const SearchedCompanies = (props) => {
    const { addOneCompanyToTrackedCompanies, history, trackedCompanies } = props;
    if (!props.searchedCompanies)
        return null
    else
        return (
            props.searchedCompanies.map((company, index) => {
                if (index < 10)
                    return (
                        <div className=" loaf-button-hover-action paddingTop10 paddingLeft10 paddingButtom10" onClick={() => addOneCompanyToTrackedCompanies(company, trackedCompanies, history)}>
                            <Metric center fontFamily={'Open Sans'} fontWeight={900} titleFontSize={14} title={company.symbol} labelFontSize={11} />
                        </div>

                    )
            })
        )
}

const mapStateToProps = state => {
    let { trackedCompanies } = state;
    return {
        trackedCompanies: trackedCompanies
    };
};

const mapDispachToProps = dispatch => {
    return {
        addOneCompanyToTrackedCompanies: (company, trackedCompanies, history) => {
            company['shares'] = [{ price: '', count: '', hasShares: false }];
            trackedCompanies.push(company);
            if (localStorage.getItem('LOAF_USER')){
                let userID = JSON.parse(localStorage.getItem('LOAF_USER')).uid;
                updateUserCompanyData(userID, trackedCompanies, dispatch);
                dispatch({ type: "ADD_ONE_COMPANY_TO_TRACKED_COMPANIES", company, history });

                // history.go('/quote/' + company.symbol);
            }
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispachToProps
)(withRouter(SearchedCompanies));