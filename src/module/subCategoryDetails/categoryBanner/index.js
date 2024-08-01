import React from "react";
import styles from "./categoryBanner.module.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const Searchbar = dynamic(() => import("../../home/herobanner/searchbar"), {
  ssr: true,
});
const RightIcon = "/assets/icons/right.webp";

export default function CategoryBanner({
  handleOnSearch,
  search,
  handleSearchClick,
  placeholder,
  isTool,
  heading,
  isSearch,
  getRandomIcon,
}) {
  const { loading } = useSelector((state) => state.aiTools);
  const pathname = usePathname();
  const dispatch = useDispatch();
  return (
    <div className={styles.categoryBannerDesign}>
      <div className="container">
        <div className={styles.grid}>
          <div>
            <div className={styles.title}>{heading}</div>
            {isSearch && (
              <div className={styles.searchbarWidth}>
                <Searchbar
                  placeholder={placeholder}
                  handleOnSearch={handleOnSearch}
                  search={search}
                  handleSearchClick={handleSearchClick}
                />
              </div>
            )}
            <div className={styles.twoButtonAlignment}>
              {isTool && (
                <Link prefetch={false} href="/browse-tools">
                  <button aria-label="Explore 1500+ AI Tools">
                    Explore 1500+ AI Tools
                    <img loading="lazy" src={RightIcon} alt="RightIcon" />
                  </button>
                </Link>
              )}
              <Link
                prefetch={false}
                href={
                  pathname?.includes("/gpt-category")
                    ? "/gpt-category"
                    : "/category"
                }
              >
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
            </div>
          </div>
          <div className={styles.allImagealignment}>
            {loading
              ? [...Array(5)].map((_, index) => (
                  <div key={index}>
                    <Skeleton count={1} borderRadius={10} baseColor="#232147" />
                  </div>
                ))
              : getRandomIcon &&
                getRandomIcon?.map((item, i) => {
                  return (
                    <div key={i}>
                      {item ? (
                        <LazyImage
                          image={{
                            src: item,
                            alt: "CardImage",
                          }}
                        />
                      ) : (
                        <Skeleton
                          count={1}
                          borderRadius={10}
                          baseColor="#232147"
                        />
                      )}
                    </div>
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}
