import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter, { CounterReducer } from "../featuers/counter/counterSlice";
import blog, { BlogReducer } from "../featuers/blog/blogSlice";
import dogs, { DogsReducer } from "../featuers/dogs-api/dogsSlice";
import { dogsApiSlice } from "../featuers/dogs-api/dogs_api_slice";
import { pokemonApiSlice } from "../featuers/pokemon-api/pokemon_api_slice";

const RootReducer = combineReducers({
    counter,
    blog,
    dogs,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer,
    [pokemonApiSlice.reducerPath]: pokemonApiSlice.reducer,
})

export const store = configureStore({
    reducer: RootReducer,
    middleware : (getDefaultMidleware) => {
        return getDefaultMidleware().concat(dogsApiSlice.middleware, pokemonApiSlice.middleware)
    },
    devTools: true
});

export interface ReducerState {
    counter: CounterReducer;
    blog: BlogReducer;
    dogs: DogsReducer
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof RootReducer>;