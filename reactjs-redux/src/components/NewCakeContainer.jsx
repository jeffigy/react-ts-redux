import { connect } from "react-redux";
import { buyCake } from "../redux";
import { useState } from "react";

const NewCakeContainer = (props) => {
  const [number, setnumber] = useState(1);
  return (
    <>
      <h2>Number of Cakes: {props.numOfCakes}</h2>
      <input
        type="text"
        value={number}
        onChange={(e) => setnumber(e.target.value)}
      />
      <button onClick={() => props.buyCake(number)}>Buy {number} cakes</button>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    numOfCakes: state.cake.numOfCakes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    buyCake: (number) => dispatch(buyCake(number)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCakeContainer);
