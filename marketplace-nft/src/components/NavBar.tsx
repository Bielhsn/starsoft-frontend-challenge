import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import styles from "../styles/Navbar.module.css";

interface NavbarProps {
  cartCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        StarSoft
      </Link>
      <Link href="/cart" className={styles.cartIcon}>
        <ShoppingBag size={24} />
        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
      </Link>
    </nav>
  );
};

export default Navbar;
