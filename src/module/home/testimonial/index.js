import styles from "./testimonial.module.scss";
import RightIconLg from "@/assets/icons/righticonlg";
import { DummyData } from "@/helpers/constant";
import Marquee from "react-fast-marquee";
import LazyImage from "@/helpers/lazyImage";
const ProfileImage = "/assets/icons/testimal-user.webp";



export default function Testimonial() {
  return (
    <div className={styles.testimonialAlignment}>
      <div className="container">
        <div className={styles.title}>
          <div>
            <h2>Testimonials</h2>
            <p>Hear what our users have to say in their own words</p>
          </div>
          <div className={styles.webView}>
            <div className={styles.previewButton}>
              <a
                href="https://www.trustpilot.com/review/findmyaitool.com"
                target="_blank"
                aria-label="visit-site"
              >
                <button aria-label="Review Us">
                  Review Us
                  <RightIconLg />
                </button>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.sliderDesign}>
          <Marquee gradient={false} className="marquee" pauseOnHover={true}>
            {DummyData?.map((item, i) => {
              return (
                <div className={styles.card} key={i}>
                  <div className={styles.topDetailsAlignment}>
                    <LazyImage
                      image={{
                        src: "/assets/icons/testimal-icon.webp",
                        alt: `videoImage`,
                      }}
                    />
                    <p>{item?.title}</p>
                  </div>
                  <div className={styles.bottomDetailsAlignment}>
                    <div className={styles.leftSideAlignment}>
                      <div className={styles.bottomProfile}>
                        <LazyImage
                          image={{
                            src: ProfileImage,
                            alt: `videoImage`,
                          }}
                        />
                      </div>
                      <span>{item?.name}</span>
                    </div>

                    <div className={styles.starIconAlignment}>
                      {[0, 1, 2, 3, 4]?.map((_, index) => {
                        return (
                          <div key={index}>
                            <svg
                              width="23"
                              height="22"
                              viewBox="0 0 23 22"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M21.3179 9.45362L17.0313 13.6281L18.0436 19.5241C18.0652 19.6506 18.0511 19.7805 18.0027 19.8993C17.9543 20.0182 17.8736 20.1211 17.7697 20.1965C17.6658 20.2719 17.5429 20.3167 17.4148 20.3259C17.2868 20.3352 17.1587 20.3084 17.045 20.2487L11.7448 17.4651L6.44522 20.2481C6.33157 20.3078 6.20347 20.3345 6.07541 20.3253C5.94734 20.316 5.82442 20.2712 5.72053 20.1958C5.61665 20.1204 5.53595 20.0175 5.48756 19.8987C5.43916 19.7798 5.42501 19.6499 5.44669 19.5234L6.45898 13.6274L2.17171 9.45362C2.07969 9.36405 2.0146 9.25053 1.98382 9.12592C1.95304 9.0013 1.95779 8.87057 1.99753 8.74851C2.03728 8.62645 2.11044 8.51795 2.20872 8.43528C2.307 8.35261 2.42648 8.29908 2.55364 8.28074L8.47806 7.42137L11.1275 2.05749C11.3594 1.58793 12.1302 1.58793 12.3621 2.05749L15.0115 7.42137L20.9359 8.28074C21.0628 8.29956 21.1819 8.35335 21.2799 8.43608C21.3778 8.51881 21.4507 8.62719 21.4904 8.74904C21.5301 8.87089 21.5349 9.00139 21.5045 9.12585C21.474 9.25032 21.4094 9.36383 21.3179 9.45362Z"
                                fill="#F7A011"
                              />
                            </svg>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </Marquee>
        </div>

        <div className={styles.mobileView}>
          <div className={styles.previewButton}>
            <a
              href="https://www.trustpilot.com/review/findmyaitool.com"
              target="_blank"
              aria-label="review-us"
            >
              <button aria-label="Review Us">
                Review Us
                <RightIconLg />
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
