import styles from "./announcement-bar.styles";

// Thin brand strip pinned to the top of the viewport; fixed header items sit below it via --announce-h.
export default function AnnouncementBar() {
  return <div className={styles.bar} aria-hidden="true" />;
}
