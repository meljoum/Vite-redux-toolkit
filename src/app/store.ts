import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter, { CounterReducer } from "../featuers/counter/counterSlice";
import blog, { BlogReducer } from "../featuers/blog/blogSlice";
import { dogsApiSlice } from "../featuers/dogs-api/dogs_api_slice";

const RootReducer = combineReducers({
    counter,
    blog,
    [dogsApiSlice.reducerPath]: dogsApiSlice.reducer
})

export const store = configureStore({
    reducer: RootReducer,
    middleware : (getDefaultMidleware) => {
        return getDefaultMidleware().concat(dogsApiSlice.middleware)
    },
    devTools: true
});

export interface ReducerState {
    counter: CounterReducer;
    blog: BlogReducer
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof RootReducer>;