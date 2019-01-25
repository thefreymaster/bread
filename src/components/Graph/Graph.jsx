import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import { getChartData } from '../../HTTP/ChartAPI';


class LineGraph extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentWillMount() {
        let data = getChartData(this.props.ticker, this.props.timeframe, this.props.interval);
        data.then(response => {
            this.setState({ data: response })
        })
    }
    render() {
        if (!this.state.data)
            return null;
        else {
            return (
                <div className="flex flex-row" style={{ height: 200, width: '50%' }}>
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
                        colors={this.props.color}
                        dotSize={10}
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

export default LineGraph;