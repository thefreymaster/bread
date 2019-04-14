const initialState = {
  account: JSON.parse(localStorage.getItem('LOAF_USER')),
  authenticated: false,
  companies: {},
  error: false,
  fetching: false,
  portfolio: {},
  quotes: {},
  screen: {},
  trackedCompanies: {},
  active: {
    symbol: '',
    chartOneMonthData: {},
    chartSixMonthData: {},
    chartOneYearData: {},
    chartFiveYearData: {},
    price: 0,
    news: {},
    latestQuote: {},
  }
};

const reducer = (state = initialState, action) => {
  const newState = { ...state };

  switch (action.type) {
    case "AGE_UP_ASYNC":
      newState.age += action.value;
      break;
    case "AGE_DOWN":
      newState.age -= action.value;
      break;
    case "ADD_QUOTE_TO_STORE":
      newState.quotes = action.quotes;
      break;
    case "SCREEN_SIZE_UPDATE":
      const { screen } = action;
      newState.screen = screen;
      break;
  }
  return newState;
};

export default reducer;
