import {createSlice} from "@reduxjs/toolkit";

const roles = createSlice({
    name: "roles",
    initialState: [],
    reducers: {
        addRole: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeRole: (state, action) => {
            return state.filter((role) => role.id != action.payload)
        },
        sendRoleData: (state, action) => {
            return action.payload;
        },
    }
});

export const {addRole, removeRole, sendRoleData} = roles.actions;

export default roles.reducer;