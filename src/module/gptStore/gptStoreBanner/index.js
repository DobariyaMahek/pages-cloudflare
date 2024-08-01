import React, { useEffect, useRef } from "react";
import styles from "./GptStoreBanner.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import { isEmpty } from "@/helpers/common";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});const SearchIcon = dynamic(() => import("../../../assets/icons/SearchIcon"), {
  ssr: true,
});
const Arrow = "/assets/icons/next-arrow.webp";
const IconImg = "/assets/images/banner-option-img-w.webp";
export default function GptStoreBanner({ search, handleOnSearch }) {
  const inputRef = useRef();
  const router = useRouter();
  const isMobile = typeof window && window.innerWidth > 600;

  useEffect(() => {
    if (isMobile) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div className={styles.gptStoreBannerSection}>
      <div className="container">
        <div className={styles.gptStoreBannerAlignment}>
          <div className={styles.gptStoreOption}>
            <img loading="lazy" src={IconImg} alt="IconImg" />
          </div>
          <div className={styles.gptStoreBannerDetails}>
            <h1>Welcome to GPT Store</h1>
            <p>
              Discover and create custom versions of ChatGPT that combine
              instructions, extra knowledge, and any combination of skills.
            </p>
            <div className={styles.gptStoreSearch}>
              <input
                type="text"
                placeholder="Search Public GPTs Here...."
                onChange={handleOnSearch}
                value={search}
                ref={inputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router?.push(`/browse-gpts`);
                  }
                }}
                id="searchInput"
                autoComplete="off"
              />
              <div
                className={styles.searchIcon}
                onClick={() => {
                  inputRef.current.focus();
                  !isEmpty(search) ? router?.push(`/browse-gpts`) : {};
                }}
              >
                <SearchIcon />
              </div>
            </div>
            <div className={styles.gptViewFlex}>
              <Link prefetch={false} href="/gpt-category">
                <div className={styles.gptviewAllAlignment}>
                  <span>View All Categories</span>

                  <LazyImage
                    image={{
                      src: Arrow,
                      alt: "arrow",
                    }}
                    className={styles.arrowAlignment}
                  />
                </div>
              </Link>
              <Link prefetch={false} href="/browse-gpts">
                <div className={styles.gptviewAllAlignment}>
                  <span>Browse All GPTs</span>
                  <LazyImage
                    image={{
                      src: Arrow,
                      alt: "arrow",
                    }}
                    className={styles.arrowAlignment}
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
