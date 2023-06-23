import { createSlice, PayloadAction } from "@reduxjs/toolkit"



export interface DogsReducer {
    id: number;
    name: string;
}

interface DogsState {
    dogs: DogsReducer[];
}

const initialState: DogsState = {
    dogs: [],
};

const dogsSlice = createSlice ({
    name : 'dogs',
    initialState,
    reducers: {
        deleteDogB: (state, action: PayloadAction<number>) => {
            const dogId = action.payload;
            state.dogs = state.dogs.filter((dog) => dog.id !== dogId);
        },
    },
});



//export type { RootState };
export const dogsState = (state: RootState) : DogsReducer => state.dogs;

export const { deleteDogB } = dogsSlice.actions;

interface RootState {
    dogs: DogsReducer;
}

export type { RootState };

export default dogsSlice.reducer;