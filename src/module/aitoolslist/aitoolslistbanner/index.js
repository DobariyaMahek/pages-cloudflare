import styles from "./aitoolslistbanner.module.scss";
import Link from "next/link";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const Searchbar = dynamic(() => import("../../home/herobanner/searchbar"), {
  ssr: true,
});
const LoopinIcon = "/assets/icons/loopin.webp";
const MonicaIcon = "/assets/icons/monica.webp";
const JasperIcon = "/assets/icons/Jasper.webp";
const ChatgptIcon = "/assets/icons/Chatgpt.webp";
const BingIcon = "/assets/icons/bing.webp";
const AdobeIcon = "/assets/icons/Adobe.webp";
export default function Aitoolslistbanner({ search, handleOnSearch }) {
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.herobanner}>
        <div className="container-sm">
          <div className={styles.relativeSection}>
            <div className={styles.first}>
              <div className={styles.image}>
                <LazyImage
                  image={{
                    src: LoopinIcon,
                    alt: `LoopinIcon`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
              <span>loopin</span>
            </div>

            <div className={styles.firstRight}>
              <div className={styles.image}>
                <LazyImage
                  image={{
                    src: BingIcon,
                    alt: `BingIcon`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
              <span>bing chat</span>
            </div>
            <div className={styles.sec}>
              <div className={styles.image}>
                <LazyImage
                  image={{
                    src: AdobeIcon,
                    alt: `AdobeIcon`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
              <span>Adobe</span>
            </div>
            <div className={styles.secRight}>
              <div className={styles.image}>
                <LazyImage
                  image={{
                    src: MonicaIcon,
                    alt: `MonicaIcon`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
              <span>monica</span>
            </div>
            <div className={styles.three}>
              <div className={styles.image}>
                <LazyImage
                  image={{
                    src: ChatgptIcon,
                    alt: `ChatgptIcon`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
              <span> Chat GPT</span>
            </div>
            <div className={styles.threeRight}>
              <div className={styles.image}>
                <LazyImage
                  image={{
                    src: JasperIcon,
                    alt: `JasperIcon`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
              <span> Jasper</span>
            </div>
            <h1>
              Browse All <span>1500+</span> <br />
              AI Tools
            </h1>
            <p>
              Unlock limitless possibilities with Browse AI Tools - Your gateway
              to the world of artificial intelligence.
            </p>
            <div className={styles.serchbarCenterAlignment}>
              <Searchbar
                placeholder="Type to search for over 1500+ tools..."
                handleOnSearch={handleOnSearch}
                search={search}
                handleSearchClick={() => {}}
              />
            </div>
            <div className={styles.twoButtonAlignment}>
              <Link prefetch={false} href="/category">
                <button
                  aria-label="View All categories"
                  onClick={() => {
                    dispatch(setScrollCategory(""));
                  }}
                >
                  View All categories
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_280_422)">
                      <path
                        d="M3.9885 11.8081L9.33345 6.4631C9.45696 6.33958 9.52477 6.1749 9.52477 5.99549C9.52477 5.81968 9.45696 5.6549 9.33345 5.53159L3.99357 0.191511C3.86996 0.0679995 3.70518 -2.54382e-07 3.52938 -2.62067e-07C3.35357 -2.69751e-07 3.1887 0.0679019 3.06518 0.191511L2.67192 0.584778C2.54841 0.70829 2.48021 0.873167 2.48021 1.04897C2.48021 1.22478 2.54841 1.38956 2.67192 1.51316L7.15609 5.99734L2.66675 10.4865C2.54333 10.61 2.47524 10.7748 2.47524 10.9507C2.47524 11.1265 2.54333 11.2912 2.66675 11.4148L3.06021 11.8081C3.31611 12.064 3.7326 12.064 3.9885 11.8081Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_280_422">
                        <rect
                          width="12"
                          height="12"
                          fill="white"
                          transform="translate(12) rotate(90)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
