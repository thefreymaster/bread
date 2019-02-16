import React, { Component } from 'react';
import Metric from '../Body/Metric';
import { List } from 'antd';
import { getBatchData } from '../../api/StatsAPI';
import { GREEN, RED } from '../../Constants';


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
                            title: parseFloat(response.quote.week52High).toFixed(2),
                            label: '52 Week High',
                            color: response.quote.week52High > 0 ? GREEN : RED,
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.week52Low).toFixed(2),
                            color: response.quote.week52Low > 0 ? GREEN : RED,
                            label: '52 Week Low',
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.week52change).toFixed(2),
                            color: response.stats.week52change > 0 ? GREEN : RED,
                            label: '52 Week Change',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.ytdChange * 100).toFixed(2),
                            label: 'Change YTD',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            color: response.quote.ytdChange > 0 ? GREEN : RED,
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.profitMargin).toFixed(2),
                            color: response.stats.profitMargin > 0 ? GREEN : RED,
                            label: 'Profit Margin',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.priceToSales).toFixed(2),
                            label: 'Price To Sales',
                            color: response.stats.priceToSales > 0 ? GREEN : RED,
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.latestVolume),
                            label: 'Latest Volume',
                            decimals: 0,
                            suffix: '',
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
                            title: parseFloat(response.quote.week52High).toFixed(2),
                            label: '52 Week High',
                            color: response.quote.week52High > 0 ? GREEN : RED,
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.week52Low).toFixed(2),
                            color: response.quote.week52Low > 0 ? GREEN : RED,
                            label: '52 Week Low',
                            decimals: 2,
                            suffix: '',
                            prefix: '$',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.week52change).toFixed(2),
                            color: response.stats.week52change > 0 ? GREEN : RED,
                            label: '52 Week Change',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.ytdChange * 100).toFixed(2),
                            label: 'Change YTD',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            color: response.quote.ytdChange > 0 ? GREEN : RED,
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.profitMargin).toFixed(2),
                            color: response.stats.profitMargin > 0 ? GREEN : RED,
                            label: 'Profit Margin',
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.stats.priceToSales).toFixed(2),
                            label: 'Price To Sales',
                            color: response.stats.priceToSales > 0 ? GREEN : RED,
                            decimals: 2,
                            suffix: '%',
                            prefix: '',
                            duration: 1
                        },
                        {
                            title: parseFloat(response.quote.latestVolume),
                            label: 'Latest Volume',
                            decimals: 0,
                            suffix: '',
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
                                    color={item.color}
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
