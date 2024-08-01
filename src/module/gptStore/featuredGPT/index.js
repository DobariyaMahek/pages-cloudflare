import React, { useEffect, useState } from "react";
import styles from "./featuredGPT.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import dynamic from "next/dynamic";
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
const GptStoreCard = dynamic(() => import("../gptStoreCard"), {
  ssr: true,
});
export default function FeaturedGPT() {
  const { gptLoading } = useSelector((state) => state.gpt);
  // const gptLoading=true
  const [featureData, SetFeatureData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGpt({ page: 1, limit: 6, selectedData: true, isRandom: true }))
      .then((res) => {
        if (res?.payload?.success) {
          SetFeatureData(res?.payload?.payload?.app);
        }
      })
      .catch((err) => {});
  }, []);
  return (
    <div className={styles.featuredGptSection}>
      <div className="container">
        <div className={styles.featuredGptHeading}>
          <div className={styles.headingName}>
            <h2>Featured GPTs</h2>
            <p>Curated top picks this week</p>
          </div>
        </div>
        <div className={styles.featuredGptBodyAlignment}>
          {gptLoading ? (
            <div className={styles.featuredGptGrid}>
              {[1, 2, 3, 4, 5, 6]?.map((_, index) => {
                return (
                  <div className={styles.browserAllCardGridItem} key={index}>
                    <GptStoreCard loading={gptLoading} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {featureData?.length > 0 ? (
                <div className={styles.featuredGptGrid}>
                  {featureData?.slice(0, 6)?.map((item, index) => (
                    <React.Fragment key={index}>
                      <GptStoreCard item={item} />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <Nodatashow />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
