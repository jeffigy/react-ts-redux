import { connect } from "react-redux";
import { buyCake } from "../redux";

const CakeContainer = (props) => {
  console.log(props.numOfCakes);
  return (
    <>
      <h2>Number of Cakes: {props.numOfCakes}</h2>
      <button onClick={props.buyCake}>Buy cake</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfCakes: state.numOfCakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: () => dispatch(buyCake()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer);
