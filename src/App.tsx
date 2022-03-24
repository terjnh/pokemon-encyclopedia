import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { RootStore } from "./Store";
import { GetPokemon } from "./actions/PokemonActions";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function App() {
  const dispatch = useDispatch();
  const [pokemonName, setPokemonName] = useState("");
  const pokemonState = useSelector((state: RootStore) => state.pokemon);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPokemonName(event.target.value);
  };
  const handleSubmit = () => {
    dispatch(GetPokemon(pokemonName));
  };

  console.log("pokemon state:", pokemonState);
  return (
    <div className="App">
      <Box sx={{ margin: "auto", width: "100%", maxWidth: 800 }}>
        <Typography sx={{ mt: 6 }} variant="h3" component="div" gutterBottom>
          Pokemon Encyclopedia
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField fullWidth
              id="pokemon-search-field"
              label="Type here (eg. pikachu)"
              variant="filled"
              onChange={handleChange}
            ></TextField>
          </Grid>
          <Grid item xs={3}>
            <Button
              sx={{ margin: "auto", mt: 1.5 }}
              variant="contained"
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {pokemonState.pokemon && (
          <div>
            <img src={pokemonState.pokemon.sprites.front_default} alt="" />
            {pokemonState.pokemon?.abilities.map((ability) => {
              return <p>{ability.ability.name}</p>;
            })}
          </div>
        )}
      </Box>
    </div>
  );
}

export default App;
