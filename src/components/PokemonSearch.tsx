import React, { useEffect, useState } from "react";
import IUser from "../interfaces/User.interface";

interface ISearchState {
  error: boolean;
  pokemon: IPokemon;
}

interface IPokemon {
  name: string;
  numberOfAbilities: number;
  baseExperience: number;
  imageUrl: string;
}

const PokemonSearch = (props: IUser, state: ISearchState) => {
  const { name: userName, numberOfPokemons } = props;
  const [error, setError] = useState(false);
  const [pokemon, setPokemon] = useState(null);
  const pokemonRef: React.RefObject<HTMLInputElement> = React.createRef();

  let resultMarkUp;


  const searchPokemon = (): void => {
    const inputValue = (pokemonRef.current.value).toLowerCase();
    const baseURL = "https://pokeapi.co/api/v2/pokemon/";
    fetch(`${baseURL}${inputValue}`).then((res) => {
      if (res.status !== 200) {
        setError(true);
        return;
      }
      res.json().then((data) => {
        setError(false);
        setPokemon({
          baseExperience: data.base_experience,
          imageUrl: data.sprites.front_default,
          name: data.name,
          numberOfAbilities: data.abilities.length,
        });
      });
    });
  }

  const onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchPokemon();
    }
  };

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (error) {
    resultMarkUp = <p> Pokemon not found, please try again</p>;
  } else if (pokemon) {
    resultMarkUp = (
      <div>
        <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
        <p>
          {capitalize(pokemon.name)} has {pokemon.numberOfAbilities} abilities with{" "}
          {pokemon.baseExperience} base experience point.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>
        User {userName}{" "}
        {numberOfPokemons ? "has " + numberOfPokemons + " pokemons" : ""}
      </p>
      <input className="input-box" type="text" ref={this.pokemonRef} onKeyDown={onSearchKeyDown}/>
      <button onClick={this.searchPokemon} className="my-button">
        Search
      </button>
      {resultMarkUp}
    </div>
  );
}

export default PokemonSearch;
