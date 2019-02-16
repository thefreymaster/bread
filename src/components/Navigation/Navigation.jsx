import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Button } from 'antd';
import Metric from '../Body/Metric';
import { signOutUser } from './../../api/FirebaseAPI';

class Navigation extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="flex flex-row flex-center-start">
                <div>{this.props.title}</div>
                <div className='flex-grow'></div>
                {
                    localStorage.getItem('LOAF_USER') === null
                        ?
                        <Fragment>
                            <Link to="/login">
                                <Button className={'loaf-button open-sans'} type="default" shape="round" icon="lock" size={'lg'}>Sign In</Button>
                            </Link>
                            <Link to="/login">
                                <Button className={'loaf-button open-sans'} style={{ marginLeft: 10 }} type="default" shape="round" icon="user-add" size={'lg'}>Register</Button>
                            </Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Metric
                                fontWeight={500}
                                titleFontSize={14}
                                fontFamily={'Open Sans'}
                                title={'Hi there, ' + JSON.parse(localStorage.getItem('LOAF_USER')).displayName}
                                center={true}
                            />
                            <Button onClick={signOutUser} className={'loaf-button open-sans'} style={{ marginLeft: 10 }} type="default" shape="round" size={'lg'}>Sign Out</Button>
                        </Fragment>

                }
            </div>
        )
    }
}

export default Navigation;
