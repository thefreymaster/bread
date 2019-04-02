const GREEN = '#22b573';
const LIGHT_GREEN = '#22b57375'
const RED = '#b31e08';
const LIGHT_RED = '#d37768'
const GREY = '#000000a6';
const LIGHT_GREY = '#00000038';
const YELLOW = '#e7be07';
const IEXENDPOINT = process.env.REACT_APP_IEX_ENDPOINT;
const IEXTOKEN = '?token=' + process.env.REACT_APP_IEX_TOKEN;
const IEXTOKEN_WITHAND = '&token=' + process.env.REACT_APP_IEX_TOKEN

const POSITIVE_WORDS = ['strong', 'outperforming', 'gainers', 'leads', 'brilliant', 'increases', 'jumped', 'well', 'rises', 'unbelievable', 'king', 'rose'];
const NEGATIVE_WORDS = ['sell', 'despite', 'pricey', 'frustrated', 'issues', 'struggles', 'layoffs', 'denies', 'restructure']

export { 
    GREEN, 
    RED, 
    GREY, 
    LIGHT_GREY,
    YELLOW, 
    LIGHT_GREEN, 
    LIGHT_RED,
    IEXENDPOINT,
    IEXTOKEN,
    IEXTOKEN_WITHAND,
    POSITIVE_WORDS,
    NEGATIVE_WORDS,
 }