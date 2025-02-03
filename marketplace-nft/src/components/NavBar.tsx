import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        StarSoft
      </Link>
      <Link href="/cart" className={styles.cartIcon}>
        <ShoppingBag size={24} />
        {cartCount >= 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
    </nav>
  );
};

export default Navbar;
