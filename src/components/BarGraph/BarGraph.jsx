import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar'
import { getChartData } from '../../api/ChartAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY } from './../../Constants';
import Metric from './../Body/Metric';
import classnames from 'classnames';
import { LoafContext } from './../../LoafContext';

class BarGraph extends Component {
    componentWillMount() {
        let that = this;
        let data = [];
        if (this.props.total !== 0) {
            data.push(
                {
                    "country": "Breakdown",
                    "Initial": (this.props.total).toFixed(2),
                    "Change": (this.props.currentTotal - this.props.total).toFixed(2),
                }
            )
        }
        that.setState({
            data: data
        })
    }
    static contextType = LoafContext;
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {

        if (!this.props.data)
            return (
                <div className="flex flex-row flex-center show-zoom-animation" style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                    <Loader
                        type="Bars"
                        color="#000000a6"
                        height="20"
                        width="20"
                    />
                </div>
            )
        else if (this.state.data.length === 0) {
            return (
                <div className="flex flex-row flex-center show-zoom-animation" style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                    <Metric
                        title={'No Investments'}
                        label="Add shares on a companys page to see data here"
                        center
                        titleFontSize={18}
                        fontWeight={900}
                        duration={1}
                        decimals={0}
                        fontFamily={'Open Sans'} />
                </div>
            )

        }
        else {
            return (
                <div className={classnames("flex flex-column flex-center show-zoom-animation", { 'dashed-border-right': this.props.rightDivider })} style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                    <ResponsiveBar
                        data={this.state.data}
                        keys={[
                            "Initial",
                            "Change"
                        ]}
                        indexBy="country"
                        margin={{
                            "top": 20,
                            "right": 130,
                            "bottom": 70,
                            "left": 60
                        }}
                        padding={0.3}
                        colors={this.props.currentTotal - this.props.total > 0 ? 'greens' : 'reds'}
                        borderColor="inherit:darker(1.6)"
                        axisLeft={{
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "$ Amount",
                            "legendPosition": "middle",
                            "legendOffset": -50
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
                        label={(data) => { return '$' + data.value }}
                        labelTextColor="inherit:darker(1.6)"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        legends={[
                            {
                                "dataFrom": "keys",
                                "anchor": "bottom-right",
                                "direction": "column",
                                "justify": false,
                                "translateX": 120,
                                "translateY": 0,
                                "itemsSpacing": 2,
                                "itemWidth": 100,
                                "itemHeight": 20,
                                "itemDirection": "left-to-right",
                                "itemOpacity": 0.85,
                                "symbolSize": 20,
                                "effects": [
                                    {
                                        "on": "hover",
                                        "style": {
                                            "itemOpacity": 1
                                        }
                                    }
                                ]
                            }
                        ]}
                    />
                </div>
            )
        }
    }
}

export default BarGraph;