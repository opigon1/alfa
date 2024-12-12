import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IProductState } from "../card";
import { createProduct, fetchProducts } from "../../../../shared/api/api";

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

export const addCard = createAsyncThunk<IProduct, IProduct>(
  "product/addCard",
  async (product, { rejectWithValue }) => {
    try {
      const response = await createProduct(product);
      return response;
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
      })
      .addCase(addCard.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(addCard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.push(action.payload);
      })
      .addCase(addCard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const productReducer = productSlice.reducer;
