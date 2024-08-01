import React, { useRef } from "react";
import styles from "./continuewithgoogle.module.scss";
import classNames from "classnames";
import { setLogin } from "@/store/ApiSlice/authSlice";
import Link from "next/link";
import dynamic from "next/dynamic";
import LazyImage from "@/helpers/lazyImage";
const GoogleWithLogin = dynamic(
  () => import("../../../module/auth/googlewithlogin"),
  {
    ssr: true,
  }
);
const ModalLogo = "/assets/icons/modal-logo.webp";

export default function Continuewithgoogle({ handleModalClose }) {
  return (
    <div className={classNames(styles.continuewithgoogleWrapper)}>
      <div className={styles.modalMd}>
        <div className={styles.modalHeaderAlignment}>
          <LazyImage
            image={{
              src: ModalLogo,
              alt: "ModalLogo",
            }}
          />
          {/* <img width="100%" height="100%" src={ModalLogo} alt="ModalLogo" /> */}
          <div onClick={handleModalClose}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.09766 20.0742C4.79766 20.0742 4.49766 19.9598 4.26891 19.7311C3.81141 19.2736 3.81141 18.5316 4.26891 18.0736L18.0741 4.26891C18.5316 3.81141 19.2736 3.81141 19.7316 4.26891C20.1891 4.72641 20.1891 5.46844 19.7316 5.92641L5.92594 19.7311C5.8173 19.8401 5.6882 19.9265 5.54605 19.9853C5.40391 20.0442 5.25152 20.0744 5.09766 20.0742Z"
                fill="white"
              />
              <path
                d="M18.9023 20.0747C18.6023 20.0747 18.3023 19.9603 18.0736 19.7316L4.26891 5.92641C3.81141 5.46891 3.81141 4.72688 4.26891 4.26891C4.72641 3.81141 5.46844 3.81141 5.92641 4.26891L19.7316 18.0741C20.1891 18.5316 20.1891 19.2736 19.7316 19.7316C19.6227 19.8405 19.4934 19.9269 19.3512 19.9858C19.2089 20.0447 19.0563 20.0749 18.9023 20.0747Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
        <div className={styles.modalbody}>
          <h2>Login to unlock the best AI Tools for you!</h2>
          <div className={styles.continueGoogle}>
            <GoogleWithLogin text={"Continue with Google"} />
          </div>
          <div className={styles.textstyle}>
            <p>
              By proceeding, you agree to our{" "}
              <Link
                prefetch={false}
                onClick={handleModalClose}
                href="/terms-condition"
              >
                Terms of use
              </Link>{" "}
              and confirm you have read our{" "}
              <Link
                prefetch={false}
                onClick={handleModalClose}
                href="/privacy-policy"
              >
                Privacy and Cookies Statement.
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
