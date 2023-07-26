import {createSlice} from "@reduxjs/toolkit";

const jobs = createSlice({
    name: "jobs",
    initialState: [],
    reducers: {
        addJob: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeJob: (state, action) => {
            return state.filter((job) => job.id != action.payload)
        },
        sendJobData: (state, action) => {
            return action.payload;
        },
    }
});

export const {addJob, removeJob, sendJobData} = jobs.actions;

export default jobs.reducer;