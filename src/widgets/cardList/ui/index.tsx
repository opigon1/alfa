import { useEffect, useState } from "react";
import { Card } from "../../../entities/index";
import styles from "./index.module.scss";
import { IProduct } from "../../../entities/product/model/card";
import {
  loadProductsFromLocalStorage,
  saveProductsToLocalStorage,
} from "../../../shared/utils/localStorageService";
import { fetchProducts } from "../../../shared/api/api";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import {
  deleteCard,
  likeCard,
  toggleFavorite,
} from "../../../entities/product/model/slices/slice";

export const CardList = () => {
  const [cards, setCards] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.product.products);

  useEffect(() => {
    const localProduct = async () => {
      const localProduct = loadProductsFromLocalStorage();
      if (localProduct.length === 0) {
        const serverProduct = await fetchProducts();
        setCards(serverProduct);
        saveProductsToLocalStorage(serverProduct);
      } else {
        setCards(localProduct);
      }
    };

    localProduct();
  }, [products]);

  const handleDeleteCard = (id: number) => {
    dispatch(deleteCard(id));
  };

  const handleLikeCard = (id: number) => {
    dispatch(likeCard(id));
  };

  const handleFavoriteCard = (id: number) => {
    dispatch(toggleFavorite(id));
  };

  return (
    <ul className={styles.list}>
      {cards?.map((card) => (
        <Card
          key={card.id}
          isFavorite={card.favorite || false}
          isLiked={card.liked || false}
          onDelete={() => handleDeleteCard(card.id)}
          onLike={() => handleLikeCard(card.id)}
          onFavorite={() => handleFavoriteCard(card.id)}
          {...card}
        ></Card>
      ))}
    </ul>
  );
};
