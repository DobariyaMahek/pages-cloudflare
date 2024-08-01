 
import React from "react";
import styles from "./toolsdetailsBreadcrumbs.module.scss";
import Skeleton from "react-loading-skeleton";
    
import Link from "next/link";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const RightIcon = "/assets/icons/breadcrumbs -right.webp";
export default function ToolsdetailsBreadcrumbs({ categoryToolsDetails }) {


  return (
    <div className={styles.toolsdetailsBreadcrumbsSection}>
      <div className={styles.toolsdetailsBreadcrumbsAlignment}>
        <div className={styles.topBarLeft}>
          {!categoryToolsDetails?.aiTool?.title ? (
            <>
              <div className={styles.skeletonUi}>
                <Skeleton
                  className={styles.breadcrumbSkeleton}
                  baseColor="#232147"
                />
                <LazyImage
                  image={{
                    src: RightIcon,
                    alt: "RightIcon",
                  }}
                />
                <Skeleton
                  className={styles.breadcrumbSkeleton}
                  baseColor="#232147"
                />
                <LazyImage
                  image={{
                    src: RightIcon,
                    alt: "RightIcon",
                  }}
                />
                <Skeleton
                  className={styles.breadcrumbSkeleton}
                  baseColor="#232147"
                />
              </div>
            </>
          ) : (
            <>
              {(categoryToolsDetails?.aiTool?.aiToolSubCategoryId?.name ||
                categoryToolsDetails?.aiTool?.title) && (
                <Link prefetch={false} href={"/browse-tools"}>
                  <p className={styles.breadcrumbName}>
                    AI Tools List
                    <LazyImage
                      image={{
                        src: RightIcon,
                        alt: "RightIcon",
                      }}
                    />
                  </p>
                </Link>
              )}
              {categoryToolsDetails?.aiTool?.aiToolSubCategoryId && (
                <Link
                  prefetch={false}
                  href={`/category/${categoryToolsDetails?.aiTool?.aiToolSubCategoryId?.slugId}`}
                >
                  <p className={styles.breadcrumbName}>
                    {categoryToolsDetails?.aiTool?.aiToolSubCategoryId?.name ??
                      `Other`}{" "}
                    <LazyImage
                      image={{
                        src: RightIcon,
                        alt: "RightIcon",
                      }}
                    />
                  </p>
                </Link>
              )}
              {categoryToolsDetails?.aiTool?.title && (
                <p className={styles.breadcrumbName}>
                  {categoryToolsDetails?.aiTool?.title}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
