import React from 'react'
import Article from './Article';

const News = (props) => {
    if (!props.news)
        return null;
    else
        return (
            <div style={{ paddingTop: 20, paddingBottom: 20 }}>
                {props.news.map((article, index) => {
                    if (props.news.length === 0)
                        return (
                            <div className="flex flex-center">
                                <p>No New Found</p>
                            </div>
                        )
                    else
                        return (
                            <Article article={article} index={index} length={props.news.length} />
                        )
                })}
            </div>
        )
}

export default News;