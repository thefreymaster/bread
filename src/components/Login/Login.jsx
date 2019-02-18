import React, { Component } from 'react';
import Metric from '../Body/Metric';
import { Button } from 'antd';
import { signinWithGoogle, readUserCompanyData } from './../../api/FirebaseAPI';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";


class Login extends Component {
    loginWithGoogle = () => {

    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const inline = {
            addcompany: {
                height: window.innerHeight - 84,
                left: this.props.screen.xs || this.props.screen.sm ? 100 : 200,
            }
        }
        const trackedCompanies = this.props.trackedCompanies;
        return (
            <div style={inline.addcompany} className="flex flex-center flex-column">
                <Metric
                    fontWeight={500}
                    titleFontSize={36}
                    title={'Sign / Register'}
                    labelFontSize={12}
                    label={'Save your tracked companies for good by creating an account.'}
                    center={true}
                />
                {localStorage.getItem('LOAF_USER')
                    ?
                    null
                    :
                    <div className='padding10 width-60 flex'>
                        <Button  style={{borderRadius: 50}} onClick={() => signinWithGoogle(trackedCompanies)} className="width100 loaf-button">{'Sign In with Google'}</Button>
                        {/* <Button onClick={() => readUserCompanyData(JSON.parse(localStorage.getItem('LOAF_USER')).uid)} className="width100 loaf-button">{this.props.screen.xs || this.props.screen.sm ? 'Track' : 'Read User Datas'}</Button> */}
                        {/* <Redirect to="/quote" /> */}
                    </div>
                }
            </div>
        )
    }
}

export default Login;
