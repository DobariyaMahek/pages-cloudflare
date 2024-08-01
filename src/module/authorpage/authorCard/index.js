import styles from "./authorCard.module.scss";
import moment from "moment";
const CalenderIcon = "/assets/icons/calender-icon.webp";
const CardImages = "/assets/images/thumbnail-w.webp";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { botIcon } from "@/helpers/constant";
import LazyImage from "@/helpers/lazyImage";

export default function AuthorCard({ item, loading }) {
  let authoreImg =
    item?.attributes?.author?.add_author?.data?.attributes?.author_profile?.data
      ?.attributes?.url ?? botIcon;
  let blogImg = item?.attributes?.coverImage?.data?.attributes?.url;
  let AuthoreName =
    item?.attributes?.author?.add_author?.data?.attributes?.author_name;
  const slug = item?.attributes?.slug;
  return (
    <div className={styles.authorCardSection}>
      <Link prefetch={false} href={slug && !loading ? `/blog/${slug}` : "#"}>
        {loading ? (
          <Skeleton baseColor="#cccccc29" className={styles.cardImgAlignment} />
        ) : (
          <div className={styles.cardImgAlignment}>
            <LazyImage
              image={{
                src: blogImg || CardImages,
                alt: `blogImg`,
              }}
              className={styles.cardImageChild}
            />
          </div>
        )}
        <div className={styles.authorCardBottomAlignment}>
          <div>
            <div className={styles.bottomTopALignment}>
              <div className={styles.leftSideFlexAlignment}>
                {loading ? (
                  <Skeleton
                    baseColor="#cccccc29"
                    className={styles.skeletonDate}
                  />
                ) : (
                  item?.attributes?.blog_categories?.data?.map((el, i) => {
                    return (
                      <div className={styles.leftSideBoxAlignment} key={i}>
                        <span>{el?.attributes?.title}</span>
                      </div>
                    );
                  })
                )}
              </div>
              {loading ? (
                <Skeleton
                  baseColor="#cccccc29"
                  className={styles.skeletonDate}
                />
              ) : (
                <div className={styles.dateAlignment}>
                  <LazyImage
                    image={{
                      src: CalenderIcon,
                      alt: `CalenderIcon`,
                    }}
                  />
                  <span>
                    {moment(item?.attributes?.publishedAt).format(
                      "MMM DD YYYY"
                    )}
                  </span>
                </div>
              )}
            </div>
            {loading ? (
              <Skeleton
                baseColor="#cccccc29"
                className={styles.skeletonPlayer}
              />
            ) : (
              <h3>{item?.attributes?.title}</h3>
            )}
          </div>
        </div>
      </Link>
      <div className={styles.authorBottomProfileDetails}>
        <a
          href={`/authors/${item?.attributes?.author?.add_author?.data?.attributes?.slug}`}
          aria-label="visit-author-details"
        >
          <div className={styles.leftSideAlignment}>
            {loading ? (
              <Skeleton
                baseColor="#cccccc29"
                className={styles.skeletonAuthorProfile}
              />
            ) : (
              <div className={styles.authorProfile}>
                <LazyImage
                  image={{
                    src: authoreImg || CardImages,
                    alt: `authoreImg`,
                  }}
                  className={styles.cardImageChild}
                />
              </div>
            )}
            {loading ? (
              <Skeleton
                baseColor="#cccccc29"
                className={styles.skeletonAuthorNameAlignment}
              />
            ) : (
              <div className={styles.profileNameAlignment}>
                <p>{AuthoreName}</p>
              </div>
            )}
          </div>
        </a>
        {loading ? (
          <Skeleton baseColor="#cccccc29" className={styles.skeletonReadMore} />
        ) : (
          <div className={styles.rightSideAlignment}>
            <a href={`/blog/${slug}`} aria-label="visit-all-blogs">
              View More
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_2848_19)">
                  <path
                    d="M13.1482 4.35415L13.1476 4.35413L9.48238 4.36299C9.20781 4.36366 8.98572 4.58676 8.98637 4.86139C8.98702 5.13598 9.21015 5.35805 9.48474 5.3574L11.9455 5.35142L4.50003 12.7969C4.30586 12.9911 4.30586 13.3059 4.50003 13.5C4.6942 13.6942 5.009 13.6942 5.20317 13.5L12.6486 6.05458L12.6427 8.51531C12.642 8.7899 12.8641 9.01302 13.1387 9.01367C13.4133 9.01434 13.6364 8.7922 13.6371 8.51766L13.646 4.8525L13.6459 4.85185C13.6462 4.57673 13.4224 4.35385 13.1482 4.35415Z"
                    fill="white"
                    fill-opacity="0.8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_2848_19">
                    <rect
                      width="12.7281"
                      height="12.7281"
                      fill="white"
                      transform="translate(0 9) rotate(-45)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
