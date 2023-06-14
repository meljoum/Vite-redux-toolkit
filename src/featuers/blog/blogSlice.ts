import { createSlice } from "@reduxjs/toolkit";


export interface BlogReducer {
    num: number
}

const initialState : BlogReducer = {
    num: 0,
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        incrementBlog(state) {
            state.num += 5
        }
    }

});

export const { incrementBlog } = blogSlice.actions;

export default blogSlice.reducer;