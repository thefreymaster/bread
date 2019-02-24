import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getChartData } from '../../api/ChartAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY } from './../../Constants';
import Metric from './../Body/Metric';
import classnames from 'classnames';
import './LineChart.css';
import { LoafContext } from './../../LoafContext';

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
        if (this.state.data[0].data[this.state.data[0].data.length - 1].changeOverTime) {
            return (this.state.data[0].data[this.state.data[0].data.length - 1].changeOverTime * 100).toFixed(2) + '%'
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
                <div className="flex flex-row flex-center show-zoom-animation" style={{ height: 200, width: this.props.width }}>
                    <Loader
                        type="Bars"
                        color="#000000a6"
                        height="20"
                        width="20"
                    />
                </div>
            )
        else {
            return (
                <div className={classnames("flex flex-column flex-center-start show-zoom-animation", { 'dashed-border-right': this.props.rightDivider })} style={{ height: (window.innerHeight - 84) * 0.27, width: this.props.width }}>
                    {
                        this.props.screen.xs || this.props.screen.sm
                            ?
                            null
                            :
                            <div className={classnames('', { 'absolute': this.context.screen.md || this.context.screen.lg || this.context.screen.xl })}>
                                <Metric color={this.determineGraphColor(this.state.data)} fontFamily={'Open Sans'} fontWeight={900} titleFontSize={18} label={this.props.title} labelFontSize={14} center title={this.getGraphPercentChange()} />
                            </div>
                    }
                    <ResponsiveLine
                        data={this.state.data}
                        margin={{
                            "top": 50,
                            "right": 110,
                            "bottom": 50,
                            "left": 60
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