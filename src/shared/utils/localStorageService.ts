import { IProduct } from "../../entities/product/model/card";

export const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
};

export const saveProductsToLocalStorage = (products: IProduct[]) => {
    localStorage.setItem('products', JSON.stringify(products));
};