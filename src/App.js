// App.js
import React, { useState, useEffect } from 'react';
import PokemonThumbnail from './Components/PokemonThumbnail';
import axios from 'axios';

const App = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadPoke, setLoadPoke] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');

  const fetchPokemons = async () => {
    try {
      const res = await axios.get(loadPoke);
      const data = res.data;
      setLoadPoke(data.next);

      const createPokemonObject = async (result) => {
        const pokemonData = await Promise.all(
          result.map(async (pokemon, index) => {
            const res = await axios.get(pokemon.url);
            const pokemonDetails = res.data;
            pokemonDetails.id = allPokemons.length + index + 1; // Calculate unique ID
            return pokemonDetails;
          })
        );

        setAllPokemons((currentList) => [...currentList, ...pokemonData]);
      };

      await createPokemonObject(data.results);
      console.log(allPokemons);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log(allPokemons);
    fetchPokemons();
  }, []);

  return (
    <div className="app-container">
      <h1>Pokemon Kingdom.</h1>

      <div className="pokemon-container">
        <div className="all-container">
          {allPokemons.slice(0, 20).map((pokemon) => (
            <PokemonThumbnail
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              image={pokemon.sprites.other.dream_world.front_default}
              type={pokemon.types[0].type.name}
              height={pokemon.height}
              weight={pokemon.weight}

              //know more button stats showcase
              stat1 = {pokemon.stats[0].stat.name}
                  stat2 = {pokemon.stats[1].stat.name}
                  stat3 = {pokemon.stats[2].stat.name}
                  stat4 = {pokemon.stats[3].stat.name}
                  stat5 = {pokemon.stats[4].stat.name}
                  stat6 = {pokemon.stats[5].stat.name}
                  bs1 = {pokemon.stats[0].base_stat}
                  bs2 = {pokemon.stats[1].base_stat}
                  bs3 = {pokemon.stats[2].base_stat}
                  bs4 = {pokemon.stats[3].base_stat}
                  bs5 = {pokemon.stats[4].base_stat}
                  bs6 = {pokemon.stats[5].base_stat}
              
            />
          ))}
        </div>
        <button className="load-more" onClick={fetchPokemons}>
          More Pokemons
        </button>
      </div>
    </div>
  );
};

export default App;
