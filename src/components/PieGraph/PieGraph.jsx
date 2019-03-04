import React, { Component } from 'react';
import { ResponsivePie } from '@nivo/pie'
import { getChartData } from '../../api/ChartAPI';
import Loader from 'react-loader-spinner'
import { GREEN, RED, GREY } from './../../Constants';
import Metric from './../Body/Metric';
import classnames from 'classnames';
import { LoafContext } from './../../LoafContext';

class PieGraph extends Component {
    componentWillMount(){
        let that = this;
        let data = [];
        for(let company of this.props.data){
            console.log(company)
            data.push({
                id: company.symbol,
                label: company.name,
                value: (((company.shares.count * that.props.quotes[company.symbol].quote.latestPrice)/that.props.currentTotal)*100).toFixed(2)
            })
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
                    <ResponsivePie
                        data={this.state.data}
                        margin={{
                            "top": 40,
                            "right": 80,
                            "bottom": 80,
                            "left": 40
                        }}
                        innerRadius={0.5}
                        padAngle={0.7}
                        cornerRadius={3}
                        colors={this.props.change > 0 ? 'greens' : 'reds'}
                        colorBy="id"
                        borderWidth={0}
                        borderColor="inherit:darker(0.2)"
                        radialLabelsSkipAngle={10}
                        radialLabelsTextXOffset={6}
                        radialLabelsTextColor="#333333"
                        radialLabelsLinkOffset={0}
                        radialLabelsLinkDiagonalLength={16}
                        radialLabelsLinkHorizontalLength={24}
                        radialLabelsLinkStrokeWidth={1}
                        radialLabelsLinkColor="inherit"
                        slicesLabelsSkipAngle={10}
                        slicesLabelsTextColor="#333333"
                        sliceLabel={(data) => {return data.value + '%'}}
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        defs={[
                            {
                                "id": "dots",
                                "type": "patternDots",
                                "background": "inherit",
                                "color": "rgba(255, 255, 255, 0.3)",
                                "size": 4,
                                "padding": 1,
                                "stagger": true
                            },
                            {
                                "id": "lines",
                                "type": "patternLines",
                                "background": "inherit",
                                "color": "rgba(255, 255, 255, 0.3)",
                                "rotation": -45,
                                "lineWidth": 6,
                                "spacing": 10
                            }
                        ]}
                        fill={[
                            {
                                "match": {
                                    "id": "ruby"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "c"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "go"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "python"
                                },
                                "id": "dots"
                            },
                            {
                                "match": {
                                    "id": "scala"
                                },
                                "id": "lines"
                            },
                            {
                                "match": {
                                    "id": "lisp"
                                },
                                "id": "lines"
                            },
                            {
                                "match": {
                                    "id": "elixir"
                                },
                                "id": "lines"
                            },
                            {
                                "match": {
                                    "id": "javascript"
                                },
                                "id": "lines"
                            }
                        ]}
                       
                    />
                </div>
            )
        }
    }
}

export default PieGraph;