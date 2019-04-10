const initialState = {
    age: 20,
    fetching: false,
    authenticated: false,
    account: {},
    quotes: {},
    active: {
      symbol: 'amd',
      oneMonthChartData: {},
      sixMonthChartData: {},
      oneYearChartData: {},
      fiveYearChartData: {},
      price: 0,
      news: {},
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
    }
    return newState;
  };
  
  export default reducer;
  