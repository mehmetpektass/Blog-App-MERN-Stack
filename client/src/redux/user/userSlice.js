import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
    currentUser: null,
    error:null,
    loading:null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true,
            state.error = null;
        },
        signInSuccess: (state , action) => {
            state.currentUser = action.payload,
            state.error = null,
            state.loading = false
        },
        signInFailure: (state , action) => {
            state.error = action.payload,
            state.loading = false
        },
        resetError: (state) => {
            state.error = null;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        updateSuccess: (state , action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state , action) => {
            state.loading = false;
            state.error = action.payload;
        } 

    }
})

export const {signInStart , signInSuccess , signInFailure , resetError , updateStart , updateSuccess , updateFailure} = userSlice.actions;

export default userSlice.reducer;