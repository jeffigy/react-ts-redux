const redux = require("redux");
const reduxLogger = require("redux-logger");

const createStore = redux.legacy_createStore;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const BUY_CAKE = "BUY_CAKE";
const BUY_ICECREAM = "BUY_ICECREAM";

//* Old initialState
// const initialState = {
//     numberOfCakes: 10,
//     numberOfIceCream: 20,
//   };

const initialCakeState = {
  numberOfCakes: 10,
};
const initialIceCreamState = {
  numberOfIceCream: 20,
};
//* =============================== Actions ============================================
// Action Creator
function buyCake() {
  //* Action
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}
function buyIcreCream() {
  return {
    type: BUY_ICECREAM,
  };
}
//* =============================== Reducers ===========================================
// (previousState, action) => newState
//* old reducer
// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//       case BUY_CAKE:
//         return {
//           ...state,
//           numberOfCakes: state.numberOfCakes - 1,
//         };

//       case BUY_ICECREAM:
//         return {
//           ...state,
//           numberOfIceCream: state.numberOfIceCream - 1,
//         };

//       default:
//         return state;
//     }
//   };

//* New reducers
const cakeReducer = (state = initialCakeState, action) => {
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

const iceCreamReducer = (state = initialIceCreamState, action) => {
  switch (action.type) {
    case BUY_ICECREAM:
      return {
        ...state,
        numberOfIceCream: state.numberOfIceCream - 1,
      };

    default:
      return state;
  }
};

//* =================================== Store ===============================================
// creates store
const rootReducer = combineReducers({
  cake: cakeReducer,
  iceCream: iceCreamReducer,
});
// const store = createStore(reducer);
const store = createStore(rootReducer, applyMiddleware(logger));
console.log("initial state", store.getState());
// subscribe() registers a listener function
// subscribe() will be called every time an action is dispatched to the store
const unsubscribe = store.subscribe(() => {
  // console.log("updated state", store.getState()
});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcreCream());
store.dispatch(buyIcreCream());

// we need to unsubscribe() at the end to prevent
// memory leaks/Avoid Unnecessary Computations or to clean up
unsubscribe();
