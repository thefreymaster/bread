import React, { Component } from 'react';
import Metric from '../Loaf/Metric';
import { List } from 'antd';

const data = [
    {
        title: '20,043,434',
        label: 'Latest Volume',
    },
    {
        title: '0.61%',
        label: 'Volume Change since last trading day',
    },
    {
        title: '$233.47',
        label: '52 Week High',
    },
    {
        title: '$142.00',
        label: '52 Week Low',
    },
    {
        title: '22.45%',
        label: 'Profit Margin',
    },
];

class CompanyStatistics extends Component {
    render() {
        return (
            <div className="add-company-component">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                        <List.Item> 
                            <Metric paddingleft titleFontSize={18} title={item.title} labelFontSize={11} label="Latest Volume" />
                        </List.Item>
                    )}
                />
            </div>
        )
    }
}

export default CompanyStatistics;
