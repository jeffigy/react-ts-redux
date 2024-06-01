const redux = require("redux");
const createStore = redux.legacy_createStore;

const BUY_CAKE = "BUY_CAKE";

// Action Creator
function buyCake() {
  //* Action
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}

//* Reducer
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

//* Store
// creates store
const store = createStore(reducer);
console.log("initial state", store.getState());
// subscribe() registers a listener function
// subscribe() will be called every time an action is dispatched to the store
store.subscribe(() => console.log("updated state", store.getState()));
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
// we need to unsubscribe() at the end to prevent
// memory leaks/Avoid Unnecessary Computations or to clean up
unsubscribe();
