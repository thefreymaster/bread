const GREEN = '#22b573';
const LIGHT_GREEN = '#22b57375'
const RED = '#b31e08';
const LIGHT_RED = '#d37768'
const GREY = '#000000a6';
const LIGHT_GREY = '#00000038';
const YELLOW = '#e7be07';
const IEXENDPOINT = process.env.REACT_APP_IEX_ENDPOINT;
const IEXENDPOINTV1 = process.env.REACT_APP_IEX_ENDPOINT_V1;
const IEXTOKEN = '?token=' + process.env.REACT_APP_IEX_TOKEN;
const IEXTOKEN_WITHAND = '&token=' + process.env.REACT_APP_IEX_TOKEN

const POSITIVE_WORDS = ['strong', 'outperforming', 'gainers', 'leads', 'brilliant', 'increases', 'jumped', 'well', 'rises', 'unbelievable', 'king', 'rose', 'wow', 'buys', 'awarded', 'wins'];
const NEGATIVE_WORDS = ['sell', 'despite', 'pricey', 'frustrated', 'issues', 'struggles', 'layoffs', 'denies', 'restructure', 'beating', 'fears'];
const SECTORS = [
    {
        "type": "sector",
        "name": "Energy",
    },
    {
        "type": "sector",
        "name": "Utilities",
    },
    {
        "type": "sector",
        "name": "Real Estate",
    },
    {
        "type": "sector",
        "name": "Health Care",
    },
    {
        "type": "sector",
        "name": "Consumer Discretionary",
    },
    {
        "type": "sector",
        "name": "Technology",
    },
    {
        "type": "sector",
        "name": "Consumer Staples",
    },
    {
        "type": "sector",
        "name": "Communication Services",
    },
    {
        "type": "sector",
        "name": "Industrials",
    },
    {
        "type": "sector",
        "name": "Financials",
    },
    {
        "type": "sector",
        "name": "Materials",
    }
]

const FILTER = 'ytdChange,changePercent,week52High,week52Low,latestPrice,previousClose,extendedPrice,companyName,symbol'


export {
    GREEN,
    RED,
    GREY,
    LIGHT_GREY,
    YELLOW,
    LIGHT_GREEN,
    LIGHT_RED,
    IEXENDPOINT,
    IEXENDPOINTV1,
    IEXTOKEN,
    IEXTOKEN_WITHAND,
    POSITIVE_WORDS,
    NEGATIVE_WORDS,
    SECTORS,
    FILTER,
}