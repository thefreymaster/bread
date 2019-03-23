import React from 'react'
import Article from './Article';

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
            </div>
        )
}

export default News;