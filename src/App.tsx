import React from "react";
import Counter from "./features/counter/Counter";
import GetPokemon from "./features/pokemon/GetPokemon";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <>
      <Counter />
      <GetPokemon />
    </>
  );
};
export default App;
