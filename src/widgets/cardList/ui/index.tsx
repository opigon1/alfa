import { Card } from "../../../entities/index";
import styles from "./index.module.scss";
import { IProduct } from "../../../entities/product/model/card";
import { useAppDispatch } from "../../../app/store/hooks";
import {
  deleteCard,
  likeCard,
  toggleFavorite,
} from "../../../entities/product/model/slices/slice";

export const CardList = ({ products }: { products: IProduct[] }) => {
  const dispatch = useAppDispatch();
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
      {products?.map((card) => (
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
