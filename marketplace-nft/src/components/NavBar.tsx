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
      <span>s</span>
      <span>s</span>
      <span>t</span>
      <span className={styles.backLogoT}>t</span>
      <span>a</span>
      <span className={styles.backLogoA}>a</span>
      <span>r</span>
      <span className={styles.backLogoR}>r</span>
      <span>s</span>
      <span className={styles.backLogoS2}>s</span>
      <span>o</span>
      <span className={styles.backLogoO}>o</span>
      <span>f</span>
      <span className={styles.backLogoF}>f</span>
      <span>t</span>
      <span className={styles.backLogoT2}>t</span>
      </Link>
      <Link href="/cart" className={styles.cartIcon}>
        <ShoppingBag size={24} />
        {cartCount >= 0 && <span className={styles.cartCount}>{cartCount}</span>}
        </Link>
    </nav>
  );
};

export default Navbar;
