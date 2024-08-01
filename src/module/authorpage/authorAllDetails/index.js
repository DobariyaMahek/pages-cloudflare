import styles from "./authorAllDetails.module.scss";
import React from "react";
import dynamic from "next/dynamic";
const CommonPagination = dynamic(
  () => import("../../../shared/components/pagination/CommonPagination"),
  {
    ssr: true,
  }
);
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
const AuthorCard = dynamic(() => import("../authorCard"), {
  ssr: true,
});
export default function AuthorAllDetails({
  blogData,
  nPages,
  currentPage,
  blogLoading,
}) {
  return (
    <>
      <div className={styles.authorAllDetailsSection}>
        <div>
          {blogLoading ? (
            <div className={styles.authorAllDetailsGrid}>
              {[...Array(9)]?.map((_, index) => (
                <React.Fragment key={index}>
                  <AuthorCard loading={true} key={index} />
                </React.Fragment>
              ))}
            </div>
          ) : blogData?.length > 0 ? (
            <div className={styles.authorAllDetailsGrid}>
              {blogData?.map((item, i) => {
                return (
                  <React.Fragment key={i}>
                    <AuthorCard item={item} />
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <Nodatashow />
          )}
        </div>
      </div>
      {nPages > 1 && (
        <div className={styles.paginationAlignment}>
          <CommonPagination nPages={nPages} {...{ currentPage }} />
        </div>
      )}
    </>
  );
}
