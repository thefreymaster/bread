import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'
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
        data.push({
            breakdown: 'breakdown',
            ['Initial Cost']: that.props.total,
            ['GainOrLoss']: that.props.total-that.props.currentTotal
        })
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
                <div className={classnames("flex flex-column flex-center show-zoom-animation", { 'dashed-border-right': this.props.rightDivider })} style={{ height: (window.innerHeight - 84) * 0.54, width: this.props.width }}>
                    <ResponsiveBar
                        data={/* see data tab */}
                        keys={[
                            "Breakdown"
                        ]}
                        indexBy="breakdown"
                        margin={{
                            "top": 50,
                            "right": 130,
                            "bottom": 50,
                            "left": 60
                        }}
                        padding={0.3}
                        colors="nivo"
                        colorBy="id"
                        defs={[
                            {
                                "id": "dots",
                                "type": "patternDots",
                                "background": "inherit",
                                "color": "#38bcb2",
                                "size": 4,
                                "padding": 1,
                                "stagger": true
                            },
                            {
                                "id": "lines",
                                "type": "patternLines",
                                "background": "inherit",
                                "color": "#eed312",
                                "rotation": -45,
                                "lineWidth": 6,
                                "spacing": 10
                            }
                        ]}
                        fill={[
                            {
                                "match": {
                                    "id": "fries"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "sandwich"
                                },
                                "id": "lines"
                            }
                        ]}
                        borderColor="inherit:darker(1.6)"
                        axisTop=null
                        axisRight=null
                        axisBottom={{
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "country",
                            "legendPosition": "middle",
                            "legendOffset": 32
                        }}
                        axisLeft={{
                            "tickSize": 5,
                            "tickPadding": 5,
                            "tickRotation": 0,
                            "legend": "food",
                            "legendPosition": "middle",
                            "legendOffset": -40
                        }}
                        labelSkipWidth={12}
                        labelSkipHeight={12}
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