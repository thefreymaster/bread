import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'



class LineGraph extends Component {
    constructor(props)
    {
        super(props)
    }
    render() {
        return (
            <div className="flex flex-row" style={{height:200, width: '50%'}}>
                <ResponsiveLine
                    data={[
                        {
                          "id": "japan",
                          "color": "hsl(155, 70%, 46%)",
                          "data": [
                            {
                              "x": "plane",
                              "y": 255
                            },
                            {
                              "x": "helicopter",
                              "y": 180
                            },
                            {
                              "x": "boat",
                              "y": 159
                            },
                            {
                              "x": "train",
                              "y": 84
                            },
                            {
                              "x": "subway",
                              "y": 50
                            },
                            {
                              "x": "bus",
                              "y": 88
                            },
                            {
                              "x": "car",
                              "y": 91
                            },
                            {
                              "x": "moto",
                              "y": 115
                            },
                            {
                              "x": "bicycle",
                              "y": 122
                            },
                            {
                              "x": "others",
                              "y": 202
                            }
                          ]
                        }
                      ]}
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
                    enableDotLabel={true}
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

export default LineGraph;