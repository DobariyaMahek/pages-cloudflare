import classNames from "classnames";
import styles from "./gptBanner.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { useDispatch } from "react-redux";
const IconImg = "/assets/images/banner-option-img-w.webp";
export default function GptBanner({ search, handleOnSearch, description }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const lastPathname = pathname?.substring(pathname?.lastIndexOf("/") + 1);
  const capitalizeFirstLetter = (str) => {
    const words = str?.toLowerCase()?.split(/[\s-]+/);

    const capitalizedWords = words.map(
      (word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)
    );

    return capitalizedWords?.join(" ");
  };

  return (
      <div className={classNames(styles.herobanner, styles.gptHerobanner)}>
        <div className="container-sm">
          <div className={styles.relativeSection}>
            <div className={styles.gptStoreOption}>
              <img loading="lazy" src={IconImg} alt="IconImg" />
            </div>
            <div className={styles.centerDetailsAlignment}>
              <h1>
                {pathname?.includes("gpt-category") ? (
                  <>
                    {lastPathname
                      ? capitalizeFirstLetter(
                        lastPathname?.split("--")?.join(" ")
                      )
                      : `Gpt`}
                  </>
                ) : lastPathname ? (
                  lastPathname?.split("--")?.join(" ")
                ) : (
                  `Tools`
                )}

              {pathname?.includes("/gpt-category") ? ` GPTs` : ` AI Tools`}
            </h1>
            {description && <p>{description}</p> }

              <div className={styles.gptStoreSearch}>
                <input
                  type="text"
                  placeholder="Search Public GPTs Here...."
                  onChange={handleOnSearch}
                  value={search}
                />
                <div className={styles.searchIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="none"
                    viewBox="0 0 22 22"
                  >
                    <g clipPath="url(#clip0_280_415)">
                      <path
                        fill="#fff"
                        d="M21.297 20.038l-5.236-5.445a8.854 8.854 0 002.084-5.71C18.145 3.984 14.16 0 9.263 0 4.365 0 .38 3.985.38 8.882c0 4.898 3.985 8.883 8.883 8.883 1.838 0 3.59-.555 5.088-1.607l5.276 5.487c.22.229.517.355.835.355a1.153 1.153 0 001.158-1.136 1.16 1.16 0 00-.323-.826zM9.263 2.319a6.573 6.573 0 016.565 6.564 6.573 6.573 0 01-6.565 6.566 6.573 6.573 0 01-6.566-6.566 6.573 6.573 0 016.566-6.565z"
                      ></path>
                    </g>
                    <defs>
                      <clipPath id="clip0_280_415">
                        <path fill="#fff" d="M0 0H22V22H0z"></path>
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

            <div className={styles.twoButtonAlignment}>
              {pathname?.includes("/gpt-category") ? (
                <>
                  <Link prefetch={false} href="/gpt-category">
                    <button
                      aria-label=" View All categories"
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
                </>
              ) : (
                <>
                  <Link prefetch={false} href="/browse-tools">
                    <button aria-label="Explore 1500+ AI Tools">
                      Explore 1500+ AI Tools
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
                  <Link prefetch={false} href="/category">
                    <button
                      aria-label=" View All categories"
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
