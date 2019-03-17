import React, { Component } from 'react'
import { Steps, Icon } from 'antd';
import { GREEN, GREY, RED, LIGHT_GREY } from './../../Constants';
import { getRecommendations } from './../../api/StatsAPI';
import { LoafContext } from './../../LoafContext';
import Metric from '../Body/Metric';

const Step = Steps.Step;

class Recomendations extends Component {
    getCurrentStep = () => {
        if(this.state.buy > this.state.sell && this.state.buy > this.state.hold)
            return 0
        else if(this.state.hold > this.state.buy && this.state.hold > this.state.sell)
            return 1
        else
            return 2
    }
    componentWillMount() {
        let that = this;
        let recomendation = getRecommendations(this.context.activeTicker);
        recomendation.then((response) => {
            console.log(response)
            if (response.length > 0) {
                that.setState({
                    buy: response[0].ratingBuy,
                    sell: response[0].ratingSell,
                    hold: response[0].ratingHold,
                    total: response[0].ratingBuy + response[0].ratingSell + response[0].ratingHold,
                    complete: true
                })
            }
            else {
                that.setState({
                    complete: 'none'
                })
            }
        })
    }
    static contextType = LoafContext;

    constructor(props) {
        super(props);
        this.state = {
            complete: false
        }
    }

    render() {
        if (!this.state.complete)
            return null
        else if (this.state.complete === 'none') {
            return (
                <Metric
                    title="Sorry!"
                    label="No recomendations available"
                    center
                    width={'100%'}
                    titleFontSize={18}
                    fontWeight={900}
                    duration={1}
                    decimals={0}
                    fontFamily={'Open Sans'}
                    prefix={'$'} />
            )
        }
        else
            return (
                <div className="flex flex-center show-zoom-animation">
                    <Steps direction="vertical" current={this.getCurrentStep()}>
                        <Step title="Buy" icon={<Icon style={{ color: this.state.buy > this.state.sell && this.state.buy > this.state.hold ? GREEN : LIGHT_GREY }} type="plus-circle" />} description={`${this.state.buy} out of ${this.state.total} say buy`} />
                        <Step title="Hold" icon={<Icon style={{ color: this.state.hold > this.state.buy && this.state.hold > this.state.sell ? GREY : LIGHT_GREY }} type="pause-circle" />} description={`${this.state.hold} out of ${this.state.total} say hold`} />
                        <Step title="Sell" icon={<Icon style={{ color: this.state.sell > this.state.buy && this.state.sell > this.state.hold ? RED : LIGHT_GREY }} type="minus-circle" />} description={`${this.state.sell} out of ${this.state.total} say sell`} />
                    </Steps>
                </div>
            )
    }
}
export default Recomendations;