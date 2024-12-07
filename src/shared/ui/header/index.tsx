import Logo from "../../assets/images/logo.png";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="Логотип" />
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li className={styles.item}>Все картчоки</li>
          <li className={styles.item}>Создать карточку</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
