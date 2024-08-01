import styles from "./subCategorybanner.module.scss";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const Searchbar = dynamic(() => import("../../home/herobanner/searchbar"), {
  ssr: true,
});
const AdobeIcon = "/assets/icons/Adobe.webp";
const RightIcon = "/assets/icons/right.webp";
const LoopinIcon = "/assets/icons/loopin.webp";
const MonicaIcon = "/assets/icons/monica.webp";
const JasperIcon = "/assets/icons/Jasper.webp";
const ChatgptIcon = "/assets/icons/Chatgpt.webp";
const BingIcon = "/assets/icons/bing.webp";

export default function SubCategorybanner({
  search,
  handleOnSearch,
  handleSearchClick,
  subcategoryData,
}) {
  const pathname = usePathname();

  const dispatch = useDispatch();
  return (
    <div className={classNames(styles.herobanner, styles.gptHerobanner)}>
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
          {subcategoryData?.name ? (
            <h1>
              {subcategoryData?.name}
              <span> AI Tools</span>
            </h1>
          ) : (
            <div className={styles.headingSkeletion}>
              <Skeleton className={styles.skeletionTilte} baseColor="#232147" />
            </div>
          )}
          <p>{subcategoryData?.description}</p>
          <div className={styles.serchbarCenterAlignment}>
            <Searchbar
              placeholder={
                pathname?.includes("gpt-category")
                  ? "Search Public GPTs Here"
                  : "Type to search for over 1500+ tools..."
              }
              handleOnSearch={handleOnSearch}
              search={search}
              handleSearchClick={handleSearchClick}
            />
          </div>
          <div className={styles.twoButtonAlignment}>
            {pathname?.includes("/gpt-category") ? (
              <>
                <Link prefetch={false} href="/browse-gpts">
                  <button aria-label=" Browse All GPTs">
                    Browse All GPTs
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </button>
                </Link>
                <Link prefetch={false} href="/gpt-category">
                  <button
                    aria-label="View All categories"
                    onClick={() => {
                      dispatch(setScrollCategory(""));
                    }}
                  >
                    View All categories
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link prefetch={false} href="/browse-tools">
                  <button aria-label="Explore 1500+ AI Tools">
                    Explore 1500+ AI Tools
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </button>
                </Link>
                <Link prefetch={false} href="/category">
                  <button
                    aria-label="View All categories"
                    onClick={() => {
                      dispatch(setScrollCategory(""));
                    }}
                  >
                    View All categories
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
