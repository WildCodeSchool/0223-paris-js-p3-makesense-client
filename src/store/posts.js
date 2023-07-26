import {createSlice} from "@reduxjs/toolkit";

const posts = createSlice({
    name: "posts",
    initialState: [],
    reducers: {
        addPost: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removePost: (state, action) => {
            return state.filter((post) => post.id != action.payload)
        },
        sendPostData: (state, action) => {
            return action.payload;
        },
    }
});

export const {addPost, removePost, sendPostData} = posts.actions;

export default posts.reducer;