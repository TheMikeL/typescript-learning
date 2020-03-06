import React from "react";
import "./App.css";
import PokemonSearch from "./components/PokemonSearch";
import logo from "./logo.svg";

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <PokemonSearch name="Mike" numberOfPokemons={5}/>
      </header>
    </div>
  );
};

export default App;
