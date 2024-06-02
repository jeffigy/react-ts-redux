import { useSelector } from "react-redux";

const HooksCakeContainer = () => {
  const numOfCakes = useSelector((state) => state.numOfCakes);

  return (
    <>
      <h2> Num of cakes - {numOfCakes}</h2>
      <button>Buy Cake</button>
    </>
  );
};

export default HooksCakeContainer;
