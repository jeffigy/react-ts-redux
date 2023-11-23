import React, { useState } from "react";
import Counter from "./features/counter/Counter";
import GetPokemon from "./features/pokemon/GetPokemon";
import { Box, Flex, Text } from "@chakra-ui/react";
import PostList from "./features/posts/PostList";
import AddPostForm from "./features/posts/AddPostForm";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  const pokemon = ["bulbasaur", "pikachu", "ditto", "bulbasaur"];
  const [pollingInterval, setPollingInterval] = useState(0);
  return (
    <>
      {/* <Counter />
      <div className="App">
        <select
          onChange={(change) => setPollingInterval(Number(change.target.value))}
        >
          <option value={0}>Off</option>
          <option value={1000}>1s</option>
          <option value={5000}>5s</option>
        </select>
        <div>
          {pokemon.map((poke, index) => (
            <GetPokemon
              key={index}
              name={poke}
              pollingInterval={pollingInterval}
            />
          ))}
        </div>
      </div> */}

      <Flex
        direction={"column"}
        minH={"100vh"}
        bg={"teal"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <AddPostForm />
        <PostList />
      </Flex>
    </>
  );
};
export default App;
