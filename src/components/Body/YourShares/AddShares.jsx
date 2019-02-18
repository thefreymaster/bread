import React, { Component } from 'react';
import Metric from '../Metric';
import { Button } from 'antd';
import { Input, Select, Icon } from 'antd';

class AddShares extends Component {
    handleOnChange = (e) => {
        this.setState({
            [e.target.id]: parseInt(e.target.value)
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            price: '',
            count: ''
        }
    }
    render() {
        return (
            <div className="flex flex-column">
                <div style={{ paddingBottom: 20 }}>
                    <Metric align='center' label="Add shares you own here" />
                    <div style={{ marginBottom: 16 }}>
                        <Input id={'count'} onChange={this.handleOnChange} addonBefore="Shares" allowClear placeholder="23" />
                    </div>
                    <div>
                        <Input id={'price'} onChange={(e) => this.handleOnChange(e)} addonBefore="Price Per Share" allowClear placeholder="145.43" />
                    </div>
                </div>
                <div className={'flex flex-row'}>
                    <div className='paddingRight10 width-50'>
                        <Button style={{borderRadius: 50}} disabled={this.state.price.length === 0 || this.state.count.length === 0} onClick={() => this.props.saveShares(this.state.price, this.state.count, this.props.ticker)} className="width100 loaf-button">Save</Button>
                    </div>
                    <div className='paddingLeft10 width-50'>
                        <Button style={{borderRadius: 50}} onClick={() => this.props.hideAddShares()} className="width100 loaf-button">Cancel</Button>
                    </div>
                </div>
            </div>
        )
    }

}
export default AddShares;