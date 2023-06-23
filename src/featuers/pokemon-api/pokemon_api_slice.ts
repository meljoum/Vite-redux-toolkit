import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { PokemonList } from "../types";

export const pokemonApiSlice = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://pokeapi.co/api/v2',
    }),
    endpoints(builder) {
        return {
            fetchPokemon: builder.query<PokemonList, number | void>({
                query: (limit = 10) =>  `/pokemon?limit=${limit}`,
            }),
        };
    },
});

export const { useFetchPokemonQuery } = pokemonApiSlice;