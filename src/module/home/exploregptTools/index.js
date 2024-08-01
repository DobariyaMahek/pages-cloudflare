import React from "react";
import styles from "./exploregptTools.module.scss";
import Link from "next/link";
import ViewAll from "@/shared/components/viewAll";
import GptStoreCard from "@/module/gptStore/gptStoreCard";

export default function ExploreGptTools({ categoryToolsDetails, loading }) {
  return (
    <>
       {(loading || categoryToolsDetails?.exploreGPTs?.length > 0) && ( 
        <div className={styles.categoriesToolsAlignment}>
          <div className="container">
            <div className={styles.titleAlignment}>
              <div className={styles.title}>
                <div>
                  <h2>Explore GPT's</h2>
                  <p>Simplify Complexity with Explore GPT: Your Path to Effortless Understanding.</p>
                </div>
              </div>
              <div className={styles.webViewAll}>
                <Link prefetch={false} href="/gpt-store">
                  <ViewAll />
                </Link>
              </div>
            </div>
            <div className={styles.grid}>
              {loading ? (
                     [...Array(6)]?.map((_, index) => (
                <>
                  <React.Fragment key={index}>
                    <GptStoreCard loading={loading} />
                  </React.Fragment>
                </>))
              ) : (
                categoryToolsDetails?.exploreGPTs?.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <GptStoreCard key={item.id} item={item} />
                    </React.Fragment>
                  );
                })
              )}
            </div>
            <div className={styles.mobileViewAll}>
              <Link prefetch={false} href="/gpt-store">
                <ViewAll />
              </Link>
            </div>
          </div>
        </div>
     )} 
    </>
  );
}
