const BUY_CAKE = "BUY_CAKE";

//Action Creator
function buyCake() {
  // Action
  return {
    type: BUY_CAKE,
    info: "first redux action",
  };
}
