import React, { Component } from 'react';
import Metric from '../Body/Metric';
import { Button, Icon} from 'antd';
import { signinWithGoogle, readUserCompanyData } from './../../api/FirebaseAPI';
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { LoafContext } from '../../LoafContext';


class Login extends Component {
    static contextType = LoafContext;
    render() {
        const inline = {
            addcompany: {
                height: window.innerHeight - 84,
                left: this.context.screen.xs || this.context.screen.sm ? 100 : 200,
            }
        }
        const trackedCompanies = this.context.trackedCompanies;
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
                    <div className='padding10 width-60 flex flex-center'>
                        <Button 
                            style={{borderRadius: 50}} 
                            onClick={() => signinWithGoogle(trackedCompanies)} 
                            size={'large'} 
                            className="width-40 loaf-button"
                            icon={'google'}>
                            {'Sign In with Google'}
                        </Button>
                    </div>
                }
            </div>
        )
    }
}

export default Login;
