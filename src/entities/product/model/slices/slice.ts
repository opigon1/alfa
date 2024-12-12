// src/entities/product/model/slices/slice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProduct, IProductState } from "../card";
import {
  loadProductsFromLocalStorage,
  saveProductsToLocalStorage,
} from "../../../../shared/utils/localStorageService";
import { createProduct } from "../../../../shared/api/api";

const initialProducts = loadProductsFromLocalStorage();

const initialState: IProductState = {
  products: initialProducts,
  isLoading: false,
  error: "",
};

export const addCard = createAsyncThunk<IProduct, IProduct>(
  "product/addCard",
  async (product, { rejectWithValue }) => {
    try {
      createProduct(product);
      return product;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    deleteCard: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToLocalStorage(state.products);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCard.fulfilled, (state, action) => {
      state.products.unshift(action.payload);
      saveProductsToLocalStorage(state.products);
    });
  },
});

export const { deleteCard } = productSlice.actions;
export const productReducer = productSlice.reducer;
