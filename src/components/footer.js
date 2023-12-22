import styles from "../styles//Footer.module.css";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.columns}>
          <div className={styles.column}>
            <h4 className="-semibold">About Feed Your Physique</h4>
            <ul>
              <li>
                {" "}
                
                  <a className="text-amber-300">About Us</a>
                
              </li>
              <li>
                {" "}
                
                  <a className="text-amber-300">FAQ</a>
                
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Connect with us</h4>
            <ul>
              <li>
                {" "}
                
                  <a className="text-amber-300">Contact Us</a>
                
              </li>
              <li>
                {" "}
                
                  <a className="text-amber-300">Feedback</a>
                
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Social Media</h4>
            <ul>
              <li>
                {" "}
                <Link legacyBehavior href="https://www.instagram.com/gvmovieclub/">
                  <a className="text-amber-300">Instagram</a>
                </Link>
              </li>
              <li>
                {" "}
                <Link legacyBehavior href="https://www.facebook.com/gvmovieclub">
                  <a className="text-amber-300">Facebook</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Useful Links</h4>
            <ul>
              <li>
                {" "}
                
                  <a className="text-amber-300">Terms of Use</a>
                
              </li>
              <li>
                {" "}
                
                  <a className="text-amber-300">Privacy Policy</a>
                
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.logo}>
          <p className="text-gray-400 text-sm">
            © 2023 Feed Your Physique Site. All rights reserved.
          </p>{" "}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
