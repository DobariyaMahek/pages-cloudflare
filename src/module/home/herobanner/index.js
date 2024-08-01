import React, { useEffect } from "react";
import styles from "./herobanner.module.scss";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  getAiToolsName,
  setScrollCategory,
  setSearchTools,
} from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import useDebounce from "@/hook/useDebounce";
import LazyImage from "@/helpers/lazyImage";
import Searchbar from "./searchbar";
import { CARD_DATA } from "@/helpers/constant";
const Arrow = "/assets/icons/next-arrow.webp";
export default function Herobanner() {
  const { searchTools } = useSelector((state) => state.aiTools);
  const dispatch = useDispatch();
  const router = useRouter();
  const debouncedSearch = useDebounce(searchTools, 500);

  const handleOnSearch = (e) => {
    const value = e?.target?.value?.trimStart();
    dispatch(setSearchTools(value));
  };
  useEffect(() => {
    dispatch(setSearchTools(""));
  }, []);
  useEffect(() => {
    if (debouncedSearch) {
      dispatch(getAiToolsName({ search: debouncedSearch }));
    }
  }, [debouncedSearch]);
  const handleSearchClick = () => {
    router.push(`/browse-tools`);
  };
  return (
    <div className={styles.herobanner}>
      <div className="container-sm">
        <div className={styles.relativeSection}>
          {CARD_DATA?.map((card, index) => (
            <div key={index} className={styles[card.styles]}>
              <div className={`${styles.image}`}>
                <LazyImage
                  image={{
                    src: card.src,
                    alt: card.alt,
                  }}
                  width="100%"
                  height="100%"
                  className={`${styles.cardImageChild}`}
                />
              </div>
              <span>{card.text}</span>
            </div>
          ))}
          <h1 title="Discover AI Tools for Your Business!">
          
              Discover <span>AI Tools</span> for Your Business!
     
          </h1>
          <div className={styles.dataalign}>
            {/* <h2> */}
              <span>
                Streamline Your Workflow with Our List of AI tools. Find Your
                Perfect Solution.
              </span>
            {/* </h2> */}
          </div>
          <div className={styles.serchbarCenterAlignment}>
            <Searchbar
              placeholder="Type to search for over 1500+ tools..."
              handleOnSearch={handleOnSearch}
              search={searchTools}
              handleSearchClick={handleSearchClick}
              name="search"
            />
          </div>
          <div className={styles.twoButtonAlignment}>
            <Link prefetch={false} href="/browse-tools">
              <button aria-label="Explore 1500+ AI Tools">
                Explore 1500+ AI Tools
                <img src={Arrow} width="11" height="11" alt="Arrow" />
              </button>
            </Link>
            <Link prefetch={false} href="/category">
              <button
                aria-label="iew All categories"
                onClick={() => {
                  dispatch(setScrollCategory(""));
                }}
              >
                View All categories
                <img src={Arrow} width="11" height="11" alt="Arrow" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
