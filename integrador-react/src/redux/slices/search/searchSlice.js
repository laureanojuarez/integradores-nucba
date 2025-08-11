import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = { term: "" };

const searchSlice = createSlice({
  name: "search",
  initialState: INITIAL_STATE,
  reducers: {
    setSearchTerm: (state, action) => {
      state.term = action.payload;
    },
    clearSearch: (state) => {
      state.term = "";
    },
  },
});

export const { setSearchTerm, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
