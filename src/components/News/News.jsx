import React from 'react'
import Article from './Article';
import { Icon } from 'antd'

const News = (props) => {
    if (!props.news)
        return null;
    else
        return (
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                {props.news.map((article, index) => {
                    return (
                        <Article article={article} index={index} length={props.news.length} />
                    )
                })}
                {
                    props.news.length === 0
                        ?
                        <div className="flex flex-column">
                            <Icon style={{fontSize: 24}} type="info-circle" />
                            <p>No News Available</p>
                        </div>
                        :
                        null
                }
            </div>
        )
}

export default News;