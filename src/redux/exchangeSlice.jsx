import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedExchanges: [],
};

const exchangeSlice = createSlice({
  name: "exchange",
  initialState,
  reducers: {
    addSelectedExchange: (state, action) => {
      state.selectedExchanges.push(action.payload);
    },
    removeSelectedExchange: (state, action) => {
      state.selectedExchanges = state.selectedExchanges.filter(
        (exchange) => exchange.id !== action.payload.id
      );
    },
  },
});

export const { addSelectedExchange, removeSelectedExchange } =
  exchangeSlice.actions;
export default exchangeSlice.reducer;
