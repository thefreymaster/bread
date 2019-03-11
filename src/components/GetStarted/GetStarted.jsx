import React, { Component } from 'react';
import Metric from '../Body/Metric';
import { Button } from 'antd';
import {  Redirect } from "react-router-dom";



class GetStarted extends Component {
    redirect = () => {
        this.setState({
            redirect: true
        })
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        const inline = {
            getstarted: {
                height: window.innerHeight - 84,
                position: 'relative',
                top: -80
            }
        }
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
                <div className='padding10 width-60'>
                    <Button  style={{borderRadius: 50}} onClick={this.redirect} className="width100 loaf-button">{'Get Rising'}</Button>
                    {!this.state.redirect ? null : <Redirect to='/add' />}
                </div>
            </div>
        )
    }
}

export default GetStarted;