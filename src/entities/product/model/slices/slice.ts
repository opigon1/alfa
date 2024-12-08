import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IProductState, IProductResponse } from "../card";
import { api } from "../../../../shared/api/axios";
import API_CONFIG from "../../../../shared/api/config";

export const fetchProducts = createAsyncThunk('product/fetchProducts', async(_, {rejectWithValue}) => {
    try {
        const {data} = await api.get<IProductResponse>(API_CONFIG.endpoints.products.all);
        return data.products;
    }
    catch (e) {
        return rejectWithValue(e);
    }
})

const initialState: IProductState = {
    products: [],
    isLoading: false,
    error: ''
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.isLoading = true;
            state.error = '';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload as string;
        })
    }
})

export const productReducer = productSlice.reducer;
