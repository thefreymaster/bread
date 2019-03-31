import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom'
import { Button, Icon } from 'antd';
import Metric from '../Body/Metric';
import { signOutUser } from './../../api/FirebaseAPI';
import LOAF from '../../assets/loaf.svg';

class Navigation extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <div className="flex flex-row flex-center-start">
                <Link to="/quote">
                    <div className="flex flex-row flex-center-start">
                        <img src={LOAF} className='logo' />
                        <div>{this.props.title}</div>
                    </div>
                </Link>
                <div className='flex-grow'></div>
                {
                    localStorage.getItem('LOAF_USER') === null
                        ?
                        <Fragment>
                            <Link to="/login">
                                <Button style={{ borderRadius: 50 }} className={'loaf-button open-sans'} type="default" icon="lock">Sign In</Button>
                            </Link>
                            <Link to="/login">
                                <Button className={'loaf-button open-sans'} style={{ marginLeft: 10, borderRadius: 50 }} type="default" icon="user-add">Register</Button>
                            </Link>
                        </Fragment>
                        :
                        <Fragment>
                            <Metric
                                fontWeight={500}
                                titleFontSize={14}
                                fontFamily={'Open Sans'}
                                title={this.props.screen.xs || this.props.screen.sm ? null : 'Hi there, ' + JSON.parse(localStorage.getItem('LOAF_USER')).displayName}
                                center={true}
                            />
                            <Link to="/settings">
                                <Button icon={'setting'} className={'loaf-button open-sans'} style={{ marginLeft: 10, borderRadius: 50 }} type="default"></Button>
                            </Link>
                        </Fragment>

                }
            </div>
        )
    }
}

export default Navigation;
