import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";
import { fetchProducts } from "../../../entities/product/model/slices/slice";
import { Card } from "../../../entities/index";
import styles from "./index.module.scss";

export const CardList = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector((state) => {
    console.log(state.product.products);

    return state.product.products;
  });
  const isLoading = useAppSelector((state) => state.product.isLoading);
  const error = useAppSelector((state) => state.product.error);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <ul className={styles.list}>
      {isLoading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {cards?.map((card) => (
        <Card isLiked={false} key={card.id} {...card}></Card>
      ))}
    </ul>
  );
};
