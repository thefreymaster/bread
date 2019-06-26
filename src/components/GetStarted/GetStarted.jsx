import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import Metric from '../Body/Metric';
import { Button } from 'antd';
import { Redirect } from "react-router-dom";
import { signinWithGoogle } from '../../api/FirebaseAPI';



class GetStarted extends Component {
    render() {
        const inline = {
            getstarted: {
                height: window.innerHeight - 84,
                position: 'relative',
                top: -80
            }
        }
        const { handleSignInWithGoogle, history } = this.props;
        return (
            <div style={inline.getstarted} className="flex flex-center flex-column">
                <Metric
                    fontWeight={500}
                    titleFontSize={72}
                    title={'Bread'}
                    labelFontSize={18}
                    label={'Track stocks, find trends, rise above the grain'}
                    center={true}
                />
                <div className='padding10 width-40 flex-center'>
                    <Button size="large" style={{ borderRadius: 50 }} onClick={() => handleSignInWithGoogle(history)} className="width100 loaf-button">{'Get Started'}</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    let { active, trackedCompanies } = state;
    return {
        age: state.age,
        active: active,
        trackedCompanies,
    };
};

const mapDispachToProps = dispatch => {
    return {
        handleSignInWithGoogle: (history) => signinWithGoogle(history, dispatch),
    };
};
export default connect(
    mapStateToProps,
    mapDispachToProps
)(withRouter(GetStarted));
