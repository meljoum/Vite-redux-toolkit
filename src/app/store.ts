import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counter, { CounterReducer } from "../featuers/counter/counterSlice";
import blog, { BlogReducer } from "../featuers/blog/blogSlice"

const RootReducer = combineReducers({
    counter,
    blog
})

export const store = configureStore({
    reducer: RootReducer,
    devTools: true
});

export interface ReducerState {
    counter: CounterReducer;
    blog: BlogReducer
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof RootReducer>;