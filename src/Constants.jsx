const GREEN = '#22b573';
const LIGHT_GREEN = '#22b57375'
const RED = '#b31e08';
const LIGHT_RED = '#d37768'
const GREY = '#000000a6';
const LIGHT_GREY = '#00000038';
const YELLOW = '#e7be07';
const IEXENDPOINT = 'https://cloud.iexapis.com/beta';
const IEXTOKEN = '?token=' + process.env.REACT_APP_IEX_TOKEN;
const IEXTOKEN_WITHAND = '&token=' + process.env.REACT_APP_IEX_TOKEN


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
    IEXTOKEN_WITHAND
 }