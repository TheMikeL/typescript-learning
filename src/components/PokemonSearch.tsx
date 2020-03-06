import React, { Component } from "react";
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

export class PokemonSearch extends Component<IUser, ISearchState> {
  private pokemonRef: React.RefObject<HTMLInputElement>;
  constructor(props: IUser) {
    super(props);
    this.state = {
      error: false,
      pokemon: null,
    };
    this.pokemonRef = React.createRef();
  }

  public render() {
    const { name: userName, numberOfPokemons } = this.props;
    const { error, pokemon } = this.state;
    let resultMarkUp;

    if (error) {
      resultMarkUp = <p> Pokemon not found, please try again</p>;
    } else if (pokemon) {
      resultMarkUp = (
        <div>
          <img src={pokemon.imageUrl} alt="pokemon" className="pokemon-image" />
          <p>
            {this.capitalize(pokemon.name)} has {pokemon.numberOfAbilities} abilities with{" "}
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
        <input className="input-box" type="text" ref={this.pokemonRef} onKeyDown={this.onSearchKeyDown}/>
        <button onClick={this.searchPokemon} className="my-button">
          Search
        </button>
        {resultMarkUp}
      </div>
    );
  }

  private searchPokemon = (): void => {
    const inputValue = (this.pokemonRef.current.value).toLowerCase();
    const baseURL = "https://pokeapi.co/api/v2/pokemon/";
    fetch(`${baseURL}${inputValue}`).then((res) => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then((data) => {
        this.setState({
          error: false,
          pokemon: {
            baseExperience: data.base_experience,
            imageUrl: data.sprites.front_default,
            name: data.name,
            numberOfAbilities: data.abilities.length,
          },
        });
      });
    });
  }

  private onSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      this.searchPokemon();
    }
  }

  private capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default PokemonSearch;
