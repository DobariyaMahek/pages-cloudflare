 

import styles from "./articlesAndBlogCard.module.scss";
const CalenderIcon = "/assets/icons/calender.webp";
import Link from "next/link";
import moment from "moment";
import Skeleton from "react-loading-skeleton";
import LazyImage from "@/helpers/lazyImage";
const CardImages = "/assets/images/thumbnail-w.webp";
export default function ArticlesAndBlogCard({ item, path, loading }) {
  let blogAttributes = item?.attributes;
  let blogCoverImg = item?.attributes?.coverImage?.data?.attributes?.url;
  let blogTitle =
    blogAttributes?.title?.length > 30
      ? blogAttributes?.title?.slice(0, 30) + "..."
      : blogAttributes?.title;
  const slug = item?.attributes?.slug;
  return (
    <>
      <div className={styles.articlesAndBlogCard}>
        <Link prefetch={false}    
          href={
            path === "article"
              ? !loading
                ? `/article/${slug}`
                : "#"
              : !loading
              ? `/blog/${slug}`
              : "#"
          }
        >
          <div className={styles.articalesSkeleton}>
            <div className={styles.image}>
              <LazyImage
                image={{
                  src: blogCoverImg || CardImages,
                  alt: `BlogImage`,
                }}
                className={styles.cardImageChild}
              />
            </div>
          </div>
          <div className={styles.detailsAlignment}>
            {item ? (
              <>
                <div className={styles.articalesSkeleton}>
                  {loading ? (
                    <Skeleton
                      className={styles.skeletonHeading}
                      baseColor="#cccccc29"
                    />
                  ) : (
                    <h3>{blogTitle}</h3>
                  )}
                </div>
                <div className={styles.line}></div>
              </>
            ) : (
              <div className={styles.blogCategorySkeleton}>
                <Skeleton
                  className={styles.skeletonHeading}
                  baseColor="#cccccc29"
                />{" "}
                <Skeleton
                  className={styles.skeletonHeading}
                  baseColor="#cccccc29"
                />
              </div>
            )}
            <div className={styles.articalesSkeleton}>
              {loading ? (
                <Skeleton
                  className={styles.skeletonDate}
                  baseColor="#cccccc29"
                />
              ) : (
                <>
                  <div className={styles.lastContnetAlignment}>
                    <div className={styles.icontext}>
                      <LazyImage src={CalenderIcon} alt="CalenderIcon" className={styles.calenderIconAlign} />
                      <span>
                        {moment(item?.attributes?.createdAt)?.format(
                          "MMM DD YYYY"
                        )}
                      </span>
                      <span>
                        {
                          item?.attributes?.author?.add_author?.data?.attributes
                            ?.author_name
                        }
                      </span>
                    </div>
                    <div className={styles.icontext}></div>
                  </div>
                </>
              )}
            </div>
            <div className={styles.articalesSkeleton}>
              {loading ? (
                <div className={styles.skeletonauthorBottomProfileDetails}>
                  <div className={styles.leftSideAlignment}>
                    <Skeleton
                      baseColor="#cccccc29"
                      className={styles.skeletonAuthorProfile}
                    />
                    <Skeleton
                      baseColor="#cccccc29"
                      className={styles.skeletonProfileNameAlignment}
                    />
                  </div>
                  <div className={styles.skeletonRightSideAlignment}>
                    <Skeleton
                      baseColor="#cccccc29"
                      className={styles.skeletonReadMore}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className={styles.button}>
                    <button aria-label="Read More">Read More</button>
                  </div>
                </>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}
