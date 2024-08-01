
import styles from "./getInTouch.module.scss";
import Link from "next/link";
const ButtonArrow = "/assets/icons/contact-us-arrow.webp";
export default function GetInTouch() {
  return (
      <div className={styles.getInTouchAlignment}  >
        <div className="container">
          <div className={styles.box}>
            <h4>Get In Touch</h4>
            <p>Get in touch today for solutions that matter. Contact us for personalized assistance and expert guidance. Your queries, our priority.</p>
            <div className={styles.btnCenteralignment}>
              <Link prefetch={false}     href={"/contact-us"}>
                <button aria-label="Contact Us ">
                  Contact Us <img loading="lazy" src={ButtonArrow} alt="ButtonArrow" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
}
