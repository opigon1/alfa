import styles from "./index.module.scss";

const Card = () => {
  return (
    <li className={styles.element}>
      <button className={styles.element_delete} type="button" />
      <img 
        src={'https://avatars.mds.yandex.net/i?id=9bc63d62a85d298c4c1e35db9dfd8861229b7a24-3976351-images-thumbs&n=13'} 
        className={styles.element_img} 
        alt="Product"
      />
      <div className={styles.element_discription}>
        <h2 className={styles.element_name}>Test Product with long name to test overflow</h2>
        <div className={styles.element_like_container}>
          <button className={styles.element_like} type="button" />
        </div>
      </div>
    </li>
  );
};

export default Card;