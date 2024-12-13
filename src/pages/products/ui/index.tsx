import { useEffect, useState } from "react";
import styles from './index.module.scss'
import { FavoriteFilter } from "../../../features";
import { CardList } from "../../../widgets";
import { loadProductsFromLocalStorage, saveProductsToLocalStorage } from "../../../shared/utils/localStorageService";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchProducts } from "../../../shared/api/api";
import { setProducts } from "../../../entities/product/model/slices/slice";

export const Products = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    const initializeProducts = async () => {
      setIsLoading(true);
      const localProductData = loadProductsFromLocalStorage();
      if (!localProductData || localProductData.length === 0) {
        const serverProduct = await fetchProducts();
        saveProductsToLocalStorage(serverProduct);
        dispatch(setProducts(serverProduct));
      } else {
        dispatch(setProducts(localProductData));
      }
      setIsLoading(false);
    };
    initializeProducts();
  }, [dispatch]);

  const handleToggleFavorite = () => {
    setShowFavorite(!showFavorite);
  };

  const filteredProducts = showFavorite
    ? products.filter((product) => product.favorite)
    : products;

  return (
    <>
      <FavoriteFilter
        showFavorites={showFavorite}
        onToggle={handleToggleFavorite}
      />
      {isLoading ? (
        <p className={styles.loading}>Загрузка...</p>
      ) : (
        <CardList products={filteredProducts} />
      )}
    </>
  );
};
