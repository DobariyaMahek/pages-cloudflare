import styles from "./gptStoreCard.module.scss";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import LazyImage from "@/helpers/lazyImage";
const CardImages = "/assets/images/thumbnail-w.webp";
const RangeIcon = "/assets/icons/range-icon-white.webp";

export default function GptStoreCard({ loading, item }) {
  return (
    <div className={styles.gptStoreCardBox}>
      <Link
        prefetch={false}
        href={item?.slugId && !loading ? `/gpt/${item?.slugId}` : "#"}
      >
        <div className={styles.gptStoreCardGrid}>
          <>
            <div className={styles.gtpLogoImg}>
              <LazyImage
                image={{
                  src: item?.icon ?? CardImages,
                  alt: "GptImg",
                }}
                className={styles.cardImageChild}
              />
            </div>
          </>

          <div className={styles.gptCardDetails}>
            <div>
              {loading ? (
                <div className={styles.skeletonAlignment}>
                  <Skeleton baseColor="#cccccc29" />
                </div>
              ) : (
                <div>
                  <h3> {item?.projectName}</h3>
                  <span> {item?.category?.[0]?.name || item?.category}</span>
                </div>
              )}
              {loading ? (
                <div className={styles.skeletonAlignment}>
                  <Skeleton baseColor="#cccccc29" />
                </div>
              ) : (
                <>
                  <p>{item?.description}</p>
                </>
              )}{" "}
            </div>
            {loading ? (
              <Skeleton
                baseColor="#cccccc29"
                className={styles.gptCardBottomDetails}
              />
            ) : (
              <>
                <div className={styles.gptCardBottomDetails}>
                  <span className={styles.gptBookmarkDesign}>
                    @{item?.authorName}
                  </span>

                  <>
                    <div className={styles.starAlignment}>
                      <LazyImage
                        image={{
                          src: RangeIcon,
                          alt: "RangeIcon",
                          }}
                          className={styles.rangeIconAlignment}
                      />
                      <span>{item?.conversationCounts ?? 4.3}</span>
                    </div>
                  </>
                </div>
              </>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
