import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getChartData } from '../../api/ChartAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED } from './../../Constants';


class LineChart extends Component {
    determineGraphColor = (data) => {
        if (data[0].data[data[0].data.length - 1].changeOverTime > 0) {
            return GREEN;
        }
        else {
            return RED;
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
                <div className="flex flex-column flex-center-start show-zoom-animation" style={{ height: (window.innerHeight-84)*0.3, width: this.props.width }}>
                    <div className='absolute open-sans grey size20'>{this.props.title}</div>
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
                        dotBorderWidth={2}
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