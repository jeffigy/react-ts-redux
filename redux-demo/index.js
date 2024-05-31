const BUY_CAKE = "BUY_CAKE";

// Action Creator
function buyCake() {
  // Action
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

// Reducer
// (previousState, action) => newState
const initialState = {
  numberOfCakes: 10,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BUY_CAKE:
      return {
        ...state,
        numberOfCakes: state.numberOfCakes - 1,
      };

    default:
      return state;
  }
};
