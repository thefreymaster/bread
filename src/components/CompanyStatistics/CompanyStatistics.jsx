import React, { Component } from 'react';
import Metric from '../Loaf/Metric';
import { List } from 'antd';
import { getBatchData } from '../../HTTP/StatsAPI';
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
    componentWillMount() {
        let data = getBatchData(this.props.activeTicker, 'quote,stats');
        data.then(response => {
            this.setState({
                stats: response.stats,
                quote: response.quote,
                data: [
                    {
                        title: response.quote.latestVolume.toLocaleString(navigator.language, { minimumFractionDigits: 0 }),
                        label: 'Latest Volume',
                    },
                    {
                        title: parseFloat(response.quote.week52High).toFixed(2),
                        label: '52 Week High',
                    },
                    {
                        title: response.quote.week52Low,
                        label: '52 Week Low',
                    },
                    {
                        title: parseFloat(response.quote.ytdChange*100).toFixed(2) + '%',
                        label: 'Change YTD',
                    },
                    {
                        title: parseFloat(response.stats.profitMargin).toFixed(2) + '%',
                        label: 'Profit Margin',
                    },
                ]
            })
        })
    }
    componentDidUpdate(prevProps) {
        if(this.props.activeTicker !== prevProps.activeTicker) // Check if it's a new user, you can also use some unique property, like the ID
        {
            let data = getBatchData(this.props.activeTicker, 'quote,stats');
            data.then(response => {
                this.setState({
                    stats: response.stats,
                    quote: response.quote,
                    data: [
                        {
                            title: response.quote.latestVolume.toLocaleString(navigator.language, { minimumFractionDigits: 0 }),
                            label: 'Latest Volume',
                        },
                        {
                            title: parseFloat(response.quote.week52High).toFixed(2),
                            label: '52 Week High',
                        },
                        {
                            title: response.quote.week52Low,
                            label: '52 Week Low',
                        },
                        {
                            title: parseFloat(response.quote.ytdChange*100).toFixed(2) + '%',
                            label: 'Change YTD',
                        },
                        {
                            title: parseFloat(response.stats.profitMargin).toFixed(2) + '%',
                            label: 'Profit Margin',
                        },
                    ]
                })
            })
        }
    } 
    render() {
        if(!this.state.data)
            return null
        else{
            return (
                <div className="padding10">
                    <List
                        itemLayout="horizontal"
                        dataSource={this.state.data}
                        renderItem={item => (
                            <List.Item>
                                <Metric paddingleft titleFontSize={18} title={item.title} labelFontSize={11} label={item.label} />
                            </List.Item>
                        )}
                    />
                </div>
            )
        }
    }
}

export default CompanyStatistics;
