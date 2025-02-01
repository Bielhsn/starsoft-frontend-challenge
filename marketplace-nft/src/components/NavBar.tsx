import { ShoppingBag } from "lucide-react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <span className={styles.logoText}>StarSoft</span>
      </div>
      <div className={styles.cart}>
        <ShoppingBag size={24} color="#FF9F47" className={styles.cartIcon}/>
        <span className={styles.cartCount}>0</span>
      </div>
    </nav>
  );
};

export default Navbar;
