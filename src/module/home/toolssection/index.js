import React, { useEffect, useState } from "react";
import styles from "./toolssection.module.scss";
import { useDispatch } from "react-redux";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
import ViewAll from "@/shared/components/viewAll";
import LazyImage from "@/helpers/lazyImage";

export default function Toolssection({ categoryToolsDetails, loading }) {
  const dispatch = useDispatch();
  const route = useRouter();
  const [getAiToolsCategoryData, setgetAiToolsCategoryData] = useState([]);
  useEffect(() => {
    if (categoryToolsDetails) {
      setgetAiToolsCategoryData(categoryToolsDetails?.aiToolCategories);
    }
  }, [categoryToolsDetails]);
  const handleScrollToSection = async (id) => {
    dispatch(setScrollCategory(id));
    route.push("/category");
  };

  return (
    <>
      <div className={styles.toolssectionAlignment}>
        <div className="container">
          <div className={styles.titleAlignment}>
            <div className={styles.title}>
              <div>
                <h2> AI Tool Categories</h2>
                <p>
                  Unlock innovation with our diverse range of cutting-edge
                  solutions{" "}
                </p>
              </div>
            </div>
            <div
              className={styles.webViewAll}
              onClick={() => handleScrollToSection(` `)}
            >
              <Link prefetch={false} href={`/category`}>
                <ViewAll />
              </Link>
            </div>
          </div>
          <div>
            <div>
              <div className={styles.grid}>
                {loading
                  ? [...Array(8)]?.map((_, i) => (
                      <div className={styles.newGridItem} key={i}>
                        <div className={styles.boxTopIconBox}></div>
                        <Skeleton
                          baseColor="#cccccc29"
                          className={styles.skeletonPlayer}
                        />
                        <Skeleton
                          baseColor="#cccccc29"
                          className={styles.skeletonPlayer}
                        />
                      </div>
                    ))
                  : getAiToolsCategoryData?.map((category, i) => {
                      return (
                        <div
                          className={styles.newGridItem}
                          onClick={() =>
                            handleScrollToSection(category?.name?.toLowerCase())
                          }
                          key={i}
                        >
                          <div className={styles.boxTopIconBox}>
                            <LazyImage
                              image={{
                                src: category?.icon,
                                alt: `videoImage`,
                              }}
                              className={styles.categoryIconAlignment}
                            />
                          </div>
                          <h3>{category?.name}</h3>
                          <p>{category?.description}</p>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

          <div className={styles.mobileViewAll}>
            <Link prefetch={false} href="/category">
              <ViewAll />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
