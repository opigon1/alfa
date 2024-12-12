import { useEffect, useState } from "react";
import { Card } from "../../../entities/index";
import styles from "./index.module.scss";
import { IProduct } from "../../../entities/product/model/card";
import { loadProductsFromLocalStorage, saveProductsToLocalStorage } from "../../../shared/utils/localStorageService";
import { fetchProducts } from "../../../shared/api/api";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { deleteCard } from "../../../entities/product/model/slices/slice";

export const CardList = () => {
  const [cards, setCards] = useState<IProduct[]>([]);
  const dispatch = useAppDispatch();
  const products = useAppSelector(state => state.product.products);

  useEffect(() => {
    const localProduct = async () => {
      const localProduct = loadProductsFromLocalStorage();
      if (localProduct.length === 0) {
        const serverProduct = await fetchProducts();
        setCards(serverProduct);
        saveProductsToLocalStorage(serverProduct);
      }else {
        setCards(localProduct);
      }
    }

    localProduct()
  }, [products])

  const handleDeleteCard = (id: number) => {
    dispatch(deleteCard(id));
    
  }

  return (
    <ul className={styles.list}>
      {cards?.map((card) => (
        <Card isLiked={false} key={card.id} onDelete={() => handleDeleteCard(card.id)} {...card}></Card>
      ))}
    </ul>
  );
};
