import React from "react";
import styles from "./maturecontentmodal.module.scss";
import classNames from "classnames";
import Link from "next/link";
const CounterIcon = "/assets/icons/counter-icon.webp";
export default function Maturecontentmodal({ showModal, handleOver18 }) {
  return (
    <div
      className={
        showModal
          ? classNames(styles.openModalWrapper, styles.maturecontentmodal)
          : classNames(styles.maturecontentmodal)
      }
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <img src={CounterIcon} alt="CounterIcon" />
          <h2>Mature Content</h2>
        </div>
        <p>
          This page contain sensitive or adult content that's not for everyone
          To view it, please log in to confirm your age.
        </p>
        <p>
          By continuing, you also agree that use of this site constitutes
          acceptance of FindMyAITool's User Agreement and acknowledgement of our{" "}
          <a
            href="/privacy-policy"
            target="_blank"
            aria-label="visit-privacy-policy"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className={styles.buttonRightalignment}>
          <Link prefetch={false} href={"/"}>
            <button>I’m Not Over 18</button>
          </Link>
          <button onClick={handleOver18}>Yes, I’m Over 18</button>
        </div>
      </div>
    </div>
  );
}
