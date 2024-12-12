import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IProductState } from "../card";
import { fetchProducts } from "../../../../shared/api/api";

export const getCards = createAsyncThunk<IProduct[], void>(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await fetchProducts();
      return products;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

const initialState: IProductState = {
  products: [],
  isLoading: false,
  error: "",
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCards.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(getCards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getCards.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const productReducer = productSlice.reducer;
