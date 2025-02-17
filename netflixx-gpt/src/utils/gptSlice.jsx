import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState:{
        showGptSearch: false,
    },
    reducers:{
        toggleGptSeachView:(state)=>{
            state.showGptSearch = !state.showGptSearch;
        }
    }
})
export const {toggleGptSeachView} = gptSlice.actions;
export default gptSlice.reducer;