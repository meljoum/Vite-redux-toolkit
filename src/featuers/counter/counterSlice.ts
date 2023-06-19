// DUCKS Pattern
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";


export interface CounterReducer {
    value: number
}

const initialState: CounterReducer = {
    value: 0,
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        incremented(state) {
            // it's okay to do this because immer makes it immutable
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            state.value++;
        },
        decremented(state) {
            state.value--;
        },
        amountAdded(state, action:PayloadAction<number>) {
            state.value += action.payload;
        }
    }

});

export const counterState = (state: RootState): CounterReducer => state.counter

export const { incremented, decremented, amountAdded } = counterSlice.actions;

export default counterSlice.reducer;
