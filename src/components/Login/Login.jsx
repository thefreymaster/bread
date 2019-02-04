import React, { Component } from 'react';
import Metric from '../Body/Metric';
import { Button } from 'antd';
import { signinWithGoogle } from './../../api/FirebaseAPI';

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
                left: this.props.screen.xs || this.props.screen.sm ? 100 : 200,
            }
        }
        return (
            <div style={inline.addcompany}>
                <Metric
                    fontWeight={500}
                    titleFontSize={54}
                    title={'Sign / Register'}
                    labelFontSize={18}
                    label={'Save your tracked companies for good by creating an account.'}
                    center={true}
                />
                <div className='padding10 width-40 flex flex-center margin-auto'>
                    <Button onClick={() => signinWithGoogle()} className="width100 loaf-button">{this.props.screen.xs || this.props.screen.sm ? 'Track' : 'Sign In with Google'}</Button>
                </div>
            </div>
        )
    }
}

export default Login;
