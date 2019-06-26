const initialState = {
  account: JSON.parse(localStorage.getItem('LOAF_USER')),
  authenticated: false,
  companies: {},
  error: false,
  fetching: false,
  portfolio: {},
  quotes: {},
  screen: {},
  trackedCompanies: [],
  active: {
    symbol: '',
    chartOneMonthData: {},
    chartSixMonthData: {},
    chartOneYearData: {},
    chartFiveYearData: {},
    price: 0,
    news: {},
    latestQuote: {},
  },
  meta: {
    isFetching: false,
    isLoggedIn: false,
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
    case "ADD_ONE_COMPANY_TO_TRACKED_COMPANIES":
      newState.trackedCompanies.push(action.company)
      const { push } = action.history;
      const { symbol } = action.company;
      // push('/quote/' + symbol);
      break;
    case "ADD_COMPANIES_TO_STORE":
      newState.trackedCompanies = action.trackedCompanies;
      break;

    //READ===========================
    case "POPULATE_COMPANY_DATA":
      newState.trackedCompanies = action.companies;
      break;
    case "POPULATE_QUOTE_DATA":
      const { quote } = action.payload;
      newState.quotes[action.payload.symbol] = quote;
      break;

    //RESPONSIVE=====================
    case "SCREEN_SIZE_UPDATE":
      const { screen } = action;
      newState.screen = screen;
      break;

    //LOADER=========================
    case 'IS_FETCHING':
      newState.meta.isFetching = true;
      break;
    case 'FETCHING_COMPLETE':
      newState.meta.isFetching = false;
      break;

    //LOGGED IN STATE================
    case 'MARK_AS_LOGGED_IN':
      newState.meta.isLoggedIn = true;
      break;
  }
  return newState;
};

export default reducer;
