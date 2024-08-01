import React, { useEffect, useState } from "react";
import styles from "./categoriesTools.module.scss";
import Link from "next/link";
import Carddesign from "../cardSection/carddesign";
import ViewAll from "@/shared/components/viewAll";



export default function CategoriesTools({ categoryToolsDetails, loading }) {
  const [getAllAiTools, setgetAllAiTools] = useState([]);
  useEffect(() => {
    if (categoryToolsDetails) {
      setgetAllAiTools(categoryToolsDetails?.popularAiTools);
    }
  }, [categoryToolsDetails]);

  return (
    <>
      <div className={styles.categoriesToolsAlignment}>
        <div className="container">
          <div className={styles.titleAlignment}>
            <div className={styles.title}>
              <div>
                <h2>Popular AI Tools</h2>
                <p>
                  Discover the Best AI Tools Making Your Life Easier and More
                  Efficient.
                </p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link prefetch={false} href="/popular-tools">
                <ViewAll />
              </Link>
            </div>
          </div>
          {loading ? (
            <div className={styles.grid}>
              {[...Array(8)]?.map((_, index) => (
                <React.Fragment key={index}>
                  <Carddesign loading={loading} />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {getAllAiTools?.slice(0, 8)?.map((aiTool, index) => {
                return (
                  <Link
                    prefetch={false}
                    href={`/tool/${aiTool?.slugId}`}
                    key={index}
                  >
                    <Carddesign
                      images={aiTool?.thumbnail}
                      name={aiTool?.title}
                      description={aiTool?.aiToolSubCategoryId?.name}
                      icon={aiTool?.icon}
                      isFeatured={aiTool?.isFeatured}
                      item={aiTool}
                    />
                  </Link>
                );
              })}
            </div>
          ) }
        </div>
      </div>

      <div className={styles.mobileViewAll}>
        <Link prefetch={false} href="/popular-tools">
          <ViewAll />
        </Link>
      </div>
    </>
  );
}
