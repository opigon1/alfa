import { useEffect, useState } from "react";
import { FavoriteFilter } from "../../../features";
import { CardList } from "../../../widgets";
import { loadProductsFromLocalStorage, saveProductsToLocalStorage } from "../../../shared/utils/localStorageService";
import { useAppSelector } from "../../../app/store/hooks";
import { fetchProducts } from "../../../shared/api/api";

export const Products = () => {
  const products = useAppSelector((state) => state.product.products);
  const [sohwFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    const localProduct = async () => {
        const localProduct = loadProductsFromLocalStorage();
        if (localProduct.length === 0) {
          const serverProduct = await fetchProducts();
          saveProductsToLocalStorage(serverProduct);
        }
    }
    localProduct();
  }, []);

  const handleToggleFavorite = () => {
    setShowFavorite(!sohwFavorite);
  };

  const filteredProducts = sohwFavorite
    ? products.filter((product) => product.favorite)
    : products;

  return (
    <>
      <FavoriteFilter
        showFavorites={sohwFavorite}
        onToggle={handleToggleFavorite}
      />
      <CardList products={filteredProducts} />
    </>
  );
};
