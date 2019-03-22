import React from 'react'
import { Avatar } from 'antd';
import { IEXTOKEN, POSITIVE_WORDS, NEGATIVE_WORDS, GREY } from './../../Constants';

const Article = (props) => {
    const determineIcon = (headline) => {
        let wordFound;
        let positive = false;
        let negative = false;
        POSITIVE_WORDS.forEach(element => {
            wordFound = headline.includes(element)
            if (wordFound)
                positive = true;
        });
        NEGATIVE_WORDS.forEach(element => {
            wordFound = headline.includes(element)
            if (wordFound)
                negative = true;
        });
        if (positive && !negative)
            return 'rise'
        if (!positive && negative)
            return 'fall'
        if (positive && negative)
            return 'heat-map'
        else{
            return 'paper-clip'
        }

    }
    const inline = {
        title: {
            fontSize: 11,
            fontWeight: 900
        },
        source: {
            fontSize: 10,
            fontWeight: 300
        },
        datetime: {
            fontSize: 10,
            fontWeight: 300,
            marginLeft: 20
        },
        subtitle: {
            fontSize: 8,
            fontWeight: 100
        }
    }
    const buildSummary = (summary) => {
        if (summary === 'No summary available.')
            return null;
        else
            return props.article.summary;
    }
    return (
        <div style={{ paddingLeft: 20, paddingRight: 20, paddingButtom: 15, minWidth: '100%' }}>
            <div className="flex flex-center" style={{marginBottom: 10}}>
                <Avatar style={{color: GREY}} icon={determineIcon(props.article.headline)} />
            </div>
            <div style={inline.title}>{props.article.headline}</div>
            <div className="flex flex-row">
                <div style={inline.source}>{props.article.source}</div>
                <div style={inline.datetime}>{Date(props.article.datetime * 1000).substring(0, 15)}</div>
            </div>
            <div style={inline.subtitle}>{buildSummary(props.article.summary)}</div>
            {
                props.index !== props.length - 1
                    ?
                    <div className="shares-divider"></div>
                    :
                    null
            }
        </div>
    )
}

export default Article;