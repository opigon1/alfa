import { useEffect, useState } from "react";
import { FavoriteFilter } from "../../../features";
import { CardList } from "../../../widgets";
import { loadProductsFromLocalStorage } from "../../../shared/utils/localStorageService";
import { useAppSelector } from "../../../app/store/hooks";

export const Products = () => {
  const products = useAppSelector((state) => state.product.products);
  const [sohwFavorite, setShowFavorite] = useState(false);

  useEffect(() => {
    loadProductsFromLocalStorage();
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
