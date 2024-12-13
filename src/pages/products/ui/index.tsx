import { useEffect, useState } from "react";
import styles from './index.module.scss'
import { FavoriteFilter } from "../../../features";
import { CardList } from "../../../widgets";
import { loadProductsFromLocalStorage, saveProductsToLocalStorage } from "../../../shared/utils/localStorageService";
import { useAppDispatch } from "../../../app/store/hooks";
import { fetchProducts } from "../../../shared/api/api";
import { setProducts } from "../../../entities/product/model/slices/slice"; // Если вы хотите использовать Redux
import { IProduct } from "../../../entities/product/model/card";

export const Products = () => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [showFavorite, setShowFavorite] = useState(false);
  const [loadedProducts, setLoadedProducts] = useState<IProduct[]>([]); // Локальное состояние для продуктов

  useEffect(() => {
    const initializeProducts = async () => {
      setIsLoading(true);
      const localProductData = loadProductsFromLocalStorage();
      if (localProductData.length === 0) {
        const serverProduct = await fetchProducts();
        saveProductsToLocalStorage(serverProduct);
        setLoadedProducts(serverProduct); // Обновляем локальное состояние
        dispatch(setProducts(serverProduct)); // Если вы используете Redux
      } else {
        setLoadedProducts(localProductData); // Если данные уже есть в localStorage
        dispatch(setProducts(localProductData)); // Если вы используете Redux
      }
      setIsLoading(false);
    };
    initializeProducts ();
  }, [dispatch]); // Пустой массив зависимостей, чтобы эффект выполнился только один раз

  const handleToggleFavorite = () => {
    setShowFavorite(!showFavorite);
  };

  const filteredProducts = showFavorite
    ? loadedProducts.filter((product) => product.favorite)
    : loadedProducts;

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
