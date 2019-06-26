import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getChartData } from '../../api/ChartAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY } from './../../Constants';
import Metric from './../Body/Metric';
import classnames from 'classnames';
import './LineChart.css';
import { LoafContext } from './../../LoafContext';
import { Icon } from '../../../node_modules/antd';

class LineChart extends Component {
    static contextType = LoafContext;
    determineGraphColor = (data) => {
        if (data[0].data[data[0].data.length - 1]) {
            if (data[0].data[data[0].data.length - 1].changeOverTime > 0) {
                return GREEN;
            }
            else {
                return RED;
            }
        }
        else {
            return GREY;
        }
    }
    getGraphPercentChange = () => {
        let { data } = this.state.data[0];
        let length = data.length - 1;

        if (data[length] && data[length].changeOverTime) {
            let is = data[length].y;
            let of = data[0].y;
            let change
            if(is && of)
            {
                change = (is-of)/of;
                change = change*100;
                change = change.toFixed(2);
                change = change + '%'
            }
            return change;
        }
        else{
            return 'N/A';
        }
    }
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        let data = getChartData(this.props.ticker, this.props.timeframe, this.props.interval);
        data.then(response => {
            this.setState({ data: response })
        })
    }
    componentWillUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            let data = getChartData(prevProps.ticker, this.props.timeframe, this.props.interval);
            data.then(response => {
                this.setState({ data: response })
            })
        }
    }
    render() {

        if (!this.state.data)
            return (
                <div className="flex flex-column flex-center show-zoom-animation" style={{ height: 200, width: this.props.width }}>
                    {/* <Loader
                        type="Bars"
                        color="#000000a6"
                        height="20"
                        width="20"
                    /> */}
                    <Icon style={{fontSize: 32}} type="warning" />
                    <span>Service Unavailable</span>
                </div>
            )
        else {
            return (
                <div className={classnames("flex flex-column flex-center-start show-zoom-animation", { 'dashed-border-right': this.props.rightDivider })} style={{ height: ((window.innerHeight - 95) * 0.60) * 0.50, width: this.props.width }}>

                    <div className={classnames('', { 'absolute': this.context.screen.md || this.context.screen.lg || this.context.screen.xl })}>
                        <Metric color={this.determineGraphColor(this.state.data)} fontFamily={'Open Sans'} fontWeight={900} titleFontSize={18} label={this.props.title} labelFontSize={14} center title={this.getGraphPercentChange()} />
                    </div>

                    <ResponsiveLine
                        data={this.state.data}
                        margin={{
                            "top": 50,
                            "right": 40,
                            "bottom": 50,
                            "left": 40
                        }}
                        xScale={{
                            "type": "point"
                        }}
                        yScale={{
                            "type": "linear",
                            "stacked": true,
                            "min": "auto",
                            "max": "auto"
                        }}
                        axisTop={null}
                        axisRight={null}
                        axisBottom={null}
                        axisLeft={null}
                        enableGridX={false}
                        enableGridY={false}
                        colors={this.determineGraphColor(this.state.data)}
                        dotSize={0}
                        dotColor="inherit:darker(0.3)"
                        dotBorderWidth={0}
                        dotBorderColor="#ffffff"
                        enableDotLabel={false}
                        dotLabel="y"
                        dotLabelYOffset={-12}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}

                    />
                </div>
            )
        }
    }
}

export default LineChart;