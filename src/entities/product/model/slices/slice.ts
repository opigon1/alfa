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
    setProducts(state, action) {
      state.products = action.payload;
    },
    deleteCard: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
      saveProductsToLocalStorage(state.products);
    },
    likeCard: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.liked = !product.liked;
        product.rating = product.liked
          ? product.rating + 1
          : product.rating - 1;
      }
      saveProductsToLocalStorage(state.products);
    },
    toggleFavorite: (state, action) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      );
      if (product) {
        product.favorite = !product.favorite;
      }
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

export const { deleteCard, likeCard, toggleFavorite, setProducts } = productSlice.actions;
export const productReducer = productSlice.reducer;
