"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./intro.module.css";

import logoMark from "../../public/images/home/logo-mark.png";

// The animation itself is CSS, so it runs from the server HTML before hydration.
// This only removes the layer once it has slid away, and skips it on later client navigations.
let played = false;

export default function Intro() {
  const [visible, setVisible] = useState(!played);

  useEffect(() => {
    played = true;
    const timer = setTimeout(() => setVisible(false), 3700);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.intro} aria-hidden="true">
      <div className={styles.logo}>
        <Image src={logoMark} alt="" unoptimized />
      </div>
      <div className={styles.wordmark}>LISAMON</div>
      <div className={styles.track}><div className={styles.progress} /></div>
    </div>
  );
}
