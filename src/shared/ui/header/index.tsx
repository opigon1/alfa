import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import styles from "./index.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={Logo} alt="Логотип" />
      <nav className={styles.nav}>
        <ul className={styles.list}>
          <li>
            <Link to="/" className={styles.item}>
              Все картчоки
            </Link>
          </li>
          <li>
            <Link to="/create-product" className={styles.item}>
              Создать карточку
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
