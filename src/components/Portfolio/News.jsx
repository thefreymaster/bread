import React from 'react';
import Metric from '../Body/Metric';


const News = (props) => {
    if (!props.news)
        return null
    else
        
        return (     
            <Metric
                fontFamily={'Open Sans'}
                fontWeight={900}
                titleFontSize={11}
                title={props.news[props.news.length-1].headline}
                label={props.news[props.news.length-1].source}
                center={false}
            />
        )
}

export default News;