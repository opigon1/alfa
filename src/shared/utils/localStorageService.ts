import { IProduct } from "../../entities/product/model/card";

export const loadProductsFromLocalStorage = () => {
    const products = localStorage.getItem('products');
    return products ? JSON.parse(products) : [];
};

export const saveProductsToLocalStorage = (products: IProduct[]) => {
    localStorage.setItem('products', JSON.stringify(products));
};

export const findProductInLocalStorage = (id: number): IProduct | null => {
    const products = loadProductsFromLocalStorage() as IProduct[];
    return products.find(product => product.id === id) || null;
};