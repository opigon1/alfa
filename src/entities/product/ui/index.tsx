import { ICardProps } from "../model/card";
import styles from "./index.module.scss";

const Card = ({
  id,
  title,
  thumbnail,
  isLiked,
  onCardClick,
  onLike,
  onDelete,
}: ICardProps) => {
  return (
    <li className={styles.element}>
      <button
        className={styles.element_delete}
        type="button"
        onClick={() => onDelete?.(id)}
      />
      <img
        src={thumbnail}
        className={styles.element_img}
        alt="Product"
        onClick={() => onCardClick?.(id)}
      />
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
        </div>
      </div>
    </li>
  );
};

export default Card;
