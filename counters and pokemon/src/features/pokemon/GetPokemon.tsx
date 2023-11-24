import { useGetPokemonByNameQuery } from "../../services/pokemon";

type PokemonTypes = {
  name: string;
  pollingInterval: number;
};

const GetPokemon: React.FC<PokemonTypes> = ({ name, pollingInterval }) => {
  const { data, error, isLoading, isFetching } = useGetPokemonByNameQuery(
    name,
    {
      pollingInterval,
    }
  );
  return (
    <div className="App">
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </div>
  );
};
export default GetPokemon;
