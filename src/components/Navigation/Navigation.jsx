import React, { Component } from 'react';
import { Button, Radio } from 'antd';

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
                <Button className={'loaf-button open-sans'} type="default" shape="round" icon="lock" size={'lg'}>Sign In</Button>
                <Button className={'loaf-button open-sans'} style={{marginLeft: 10}} type="default" shape="round" icon="user-add" size={'lg'}>Register</Button>
            </div>
        )
    }
}

export default Navigation;
