import React, { useEffect, useState } from "react";
import styles from "./authorslist.module.scss";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Linkdin from "@/assets/icons/linkdin";
import Twitter from "@/assets/icons/twitter";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { useDispatch, useSelector } from "react-redux";
import { getAuthor } from "@/store/ApiSlice/blogSlice";
import { botIcon } from "@/helpers/constant";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../helpers/lazyImage"), {
  ssr: true,
});
const PaginatedList = dynamic(() => import("../home/blog/PaginatedList"), {
  ssr: true,
});
const CardImages = "/assets/images/thumbnail-w.webp";
export default function AuthorsList() {
  const { getpaginationauthore } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  const [blogauthorloading, setblogauthorloading] = useState(false);
  const count = getpaginationauthore?.length;
  useEffect(() => {
    setblogauthorloading(true);
    dispatch(getAuthor({}))
      .then(() => {
        setblogauthorloading(false);
      })
      .catch(() => {
        setblogauthorloading(false);
      });
  }, []);
  return (
    <div className={styles.authorsListSection}>
      <div className="container">
        <div className={styles.authorsListHeading}>
          <h1>
            <span>Authors</span>
          </h1>
          <p>
            Discover engaging content crafted by talented blog authors, offering
            insights, opinions, and expertise on various topics and subjects.
          </p>
        </div>

        <div className={styles.authoorsListDetails}>
          <div className={styles.authoorsListGrid}>
            {blogauthorloading
              ? [...Array(15)]?.map((_, index) => (
                  <div className={styles.authoorsListGridItem} key={index}>
                    <Skeleton
                      baseColor="#232147"
                      className={styles.autorImgBox}
                      height={226}
                    />
                    <Skeleton
                      baseColor="#232147"
                      className={styles.skeletopnNameAlignment}
                    />

                    <div className={styles.skeletonflex}>
                      {[...Array(4)]?.map((_, index) => (
                        <Skeleton
                          baseColor="#232147"
                          className={styles.icon}
                          key={index}
                        />
                      ))}
                    </div>
                  </div>
                ))
              : getpaginationauthore?.map((item, i) => {
                  let authoreImg =
                    item?.attributes?.author_profile?.data?.attributes?.url ??
                    botIcon;
                  let AuthoreName = item?.attributes?.author_name;
                  let Socialmedialink = item?.attributes?.social_media;
                  let authorName = AuthoreName?.split(" ")?.join("-");
                  let cleanedPathname = authorName?.replace(/^-+|-+$/g, "");
                  return (
                    <div className={styles.authoorsListGridItem} key={i}>
                      <Link
                        prefetch={false}
                        href={`/authors/${item?.attributes?.slug}`}
                      >
                        <div>
                          <div className={styles.autorImgBox}>
                            <LazyImage
                              image={{
                                src: authoreImg || CardImages,
                                alt: `authoreImg`,
                              }}
                              className={styles.cardImageChild}
                            />
                          </div>
                          <div className={styles.authorNameDetailsAlignment}>
                            <h4>{AuthoreName}</h4>
                          </div>
                        </div>
                      </Link>
                      <div className={styles.socialAlignment}>
                        {Socialmedialink?.map((link) => (
                          <a
                            key={link?.id}
                            href={link?.social_media_link}
                            target="_blank"
                            rel="noopener noreferrer"
                                 aria-label="visit-author-list"
                            className={styles.socialAlignment}
                          >
                            {link?.social_media_name === "LinkedIn" && (
                              <Linkdin />
                            )}
                            {link?.social_media_name === "Instagram" && (
                              <Instragram />
                            )}
                            {link?.social_media_name === "Twitter" && (
                              <Twitter />
                            )}
                            {link?.social_media_name === "Facebook" && (
                              <Facebook />
                            )}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
        {count > 12 && (
          <PaginatedList data={getpaginationauthore} itemsPerPage={12} />
        )}
      </div>
    </div>
  );
}
