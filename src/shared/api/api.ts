import { IProduct } from '../../entities/product/model/card';
import { api } from './axios';
import API_CONFIG from './config';

export const fetchProducts = async () => {
    const response = await api.get(API_CONFIG.endpoints.products.all);
    return response.data.products;
};

export const fetchProductById = async (id: number) => {
    const response = await api.get(API_CONFIG.endpoints.products.byId(id));  
    return response.data;
};


export const createProduct = async (product: IProduct) => {
    const response = await api.post(API_CONFIG.endpoints.products.create, product);
    return response.data;
}