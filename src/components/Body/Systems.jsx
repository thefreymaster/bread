import React, { Component } from 'react';
import { Badge } from 'antd';
import { getIEXStatus, getBreadStatus } from './../../api/SystemsAPI';
import { getDayOfWeek, getHourOfDay, getMinutesOfDay, determineIfMarketsAreOpen } from './../HelperFunctions/Helper';
import { LoafContext } from './../../LoafContext';
import {GREY} from './../../Constants';

class Systems extends Component {
    componentWillMount() {
        let that = this;
        let data = getIEXStatus();
        data.then(response => {
            that.setState({
                status: response,
                minute: getMinutesOfDay(),
                hour: getHourOfDay(),
                day: getDayOfWeek(),
            }, () => {
                let bread = getBreadStatus();
                bread.then(response => {
                    that.setState({
                        bread: response
                    })
                })
            })
        })
    }
    static contextType = LoafContext;

    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        const inline = {
            systems: {
                position: 'absolute',
                width: window.innerWidth-340
            }
        }
        if (!this.state.status)
            return null
        else
            return (
                <div style={inline.systems} className='systems flex flex-row flex-center'>

                    {
                        this.state.status.status === 'up'
                            ?
                            <Badge offset={[0, 0]} status="processing" text="All Systems Operational" />
                            :
                            <Badge offset={[0, 0]} status="error" text="Experiencing Problems" />
                    }
                    <div className='paddingL10'></div>
                    {
                        determineIfMarketsAreOpen(this.state.day, this.state.hour, this.state.minute)
                            ?
                            <Badge offset={[0, 0]} status="processing" text="Markets Currently Open" />
                            :
                            <Badge offset={[0, 0]} status="error" text="Markets Currently Closed" />
                    }
                </div>
            )
    }
}

export default Systems;