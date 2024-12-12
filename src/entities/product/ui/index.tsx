import { Link } from "react-router-dom";
import { ICardProps } from "../model/card";
import styles from "./index.module.scss";

export const Card = ({
  id,
  title,
  thumbnail,
  isLiked,
  isFavorite,
  onCardClick,
  onLike,
  onDelete,
  onFavorite,
  rating,
}: ICardProps) => {
  console.log(isFavorite);
  
  return (
    <li className={styles.element}>
      <button
        className={styles.element_delete}
        type="button"
        onClick={() => onDelete?.(id)}
      />
      <button
        className={!isFavorite ? styles.element_favirite : styles.element_favirite_active}
        type="button"
        onClick={() => onFavorite?.(id)}
      />
      <Link to={`/products/${id}`} className={styles.element_link}>
        <img
          src={thumbnail}
          className={styles.element_img}
          alt="Product"
          onClick={() => onCardClick?.(id)}
        />
      </Link>
      <div className={styles.element_discription}>
        <h2 className={styles.element_name}>{title}</h2>
        <div className={styles.element_like_container}>
          <button
            className={
              isLiked ? styles.element_like_active : styles.element_like
            }
            type="button"
            onClick={() => onLike?.(id)}
          />
          <span className={styles.element_rating}>{Math.round(rating)}</span>
        </div>
      </div>
    </li>
  );
};
