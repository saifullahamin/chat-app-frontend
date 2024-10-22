import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.scss";
import heroImage from "/public/hero-image.png";
import AuthModals from "@/components/Auth/AuthModals";

const HomePage = () => {
  return (
    <div className={styles.container}>
      {/* Navigation */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <h1>Pulse</h1>
        </div>
        <div className={styles.navLinks}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/help-center">Help Center</Link>
          <Link href="/pulse-web">Pulse Web</Link>
          <Link href="/download">Download</Link>
          <Link href="/dashboard" className={styles.tryPulse}>
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Communicate, Anywhere, Anytime</h1>
          <p>
            Connect effortlessly across all devices with Pulse. Break free from
            limitations and redefine communication, anytime, anywhere.
          </p>
          <div className={styles.buttonGroup}>
            <AuthModals />
          </div>
        </div>

        {/* Hero Image */}
        <div className={styles.heroImage}>
          <Image
            src={heroImage}
            alt="Global communication graphic"
            width={500}
            height={300}
            priority={true}
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
