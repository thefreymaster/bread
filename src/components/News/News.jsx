import React from 'react'

const News = (props) => {
    const inline = {
        title: {
            fontSize: 11,
            fontWeight: 900
        },
        subtitle: {
            fontSize: 8,
            fontWeight: 100
        }
    }
    return(
        <div style={{paddingLeft: 20, paddingRight: 20, paddingTop: 15, paddingButtom: 15}}>
            <div style={inline.title}>{props.article.headline}</div>
            <div style={inline.subtitle}>{(props.article.summary).substring(0, 200) + '...'}</div>
        </div>
    )
}

export default News;