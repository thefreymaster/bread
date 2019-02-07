import React, { Component } from 'react';
import Metric from '../Body/Metric';
import { List } from 'antd';
import { getBatchData } from '../../api/StatsAPI';
import { GREEN, RED } from '../../Constants';

const data = [
    {
        title: '',
        label: 'Latest Volume',
    },
    {
        title: '',
        label: 'Volume Change since last trading day',
    },
    {
        title: '',
        label: '52 Week High',
    },
    {
        title: '',
        label: '52 Week Low',
    },
    {
        title: '',
        label: 'Profit Margin',
    },
];

class CompanyStatistics extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        if (this.props.activeTicker) {
            
            let data = getBatchData(this.props.activeTicker, 'quote,stats');
            data.then(response => {
                this.setState({
                    stats: response.stats,
                    quote: response.quote,
                    data: [
                        {
                            title: parseFloat(response.quote.latestVolume),
                            label: 'Latest Volume',
                            decimals: 0,
                            suffix: '',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.week52High).toFixed(2),
                            label: '52 Week High',
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.week52Low).toFixed(2),
                            label: '52 Week Low',
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.ytdChange * 100).toFixed(2),
                            label: 'Change YTD',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.profitMargin).toFixed(2),
                            label: 'Profit Margin',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                    ]
                })
            })
        }
    }
    componentDidUpdate(prevProps) {
        if (this.props.activeTicker !== prevProps.activeTicker) // Check if it's a new user, you can also use some unique property, like the ID
        {
            
            let data = getBatchData(this.props.activeTicker, 'quote,stats');
            data.then(response => {
                this.setState({
                    stats: response.stats,
                    quote: response.quote,
                    data: [
                        {
                            title: parseFloat(response.quote.latestVolume),
                            label: 'Latest Volume',
                            decimals: 0,
                            suffix: '',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.week52High).toFixed(2),
                            label: '52 Week High',
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.week52Low).toFixed(2),
                            label: '52 Week Low',
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.ytdChange * 100).toFixed(2),
                            label: 'Change YTD',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.profitMargin).toFixed(2),
                            label: 'Profit Margin',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                    ]
                })
            })
        }
    }
    render() {
        if (!this.state.data)
            return null
        else {
            return (
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Metric
                                    number
                                    fontFamily={'Open Sans'}
                                    fontWeight={900}
                                    paddingleft
                                    duration={item.duration}
                                    suffix={item.suffix}
                                    prefix={item.prefix}
                                    decimals={item.decimals}
                                    titleFontSize={14}
                                    title={item.title}
                                    labelFontSize={11}
                                    label={item.label} />
                            </List.Item>
                        )}
                    />
            )
        }
    }
}

export default CompanyStatistics;
