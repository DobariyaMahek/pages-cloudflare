import React, { useEffect, useState } from "react";
import styles from "./trendingGPT.module.scss";
import { useDispatch } from "react-redux";
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
export default function TrendingGPT() {
  const [gptData, setGptData] = useState([]);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    setLoader(true);
    dispatch(
      GetGpt({
        page: 1,
        isPopular: true,
        limit: 6,
        selectedData: true,
        isRandom: true,
      })
    )
      .then((res) => {
        setGptData(res?.payload.payload.app);
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);
      });
  }, []);
  return (
    <div className={styles.trendingGptSection}>
      <div className={styles.trendingGptHeading}>
        <div className={styles.headingName}>
          <h2>Trending GPTs</h2>
          <p>Curated top picks this week</p>
        </div>
      </div>
      <div className={styles.trendingGptBodyAlignment}>
        {loader ? (
          <div className={styles.trendingGptGrid}>
            {[1, 2, 3, 4, 5, 6]?.map((item, index) => {
              return (
                <div className={styles.browserAllCardGridItem} key={index}>
                  <GptStoreCard loading={loader} />
                </div>
              );
            })}
          </div>
        ) : !loader && gptData?.length > 0 ? (
          <div className={styles.trendingGptGrid}>
            {gptData?.map((item, index) => (
              <React.Fragment key={index}>
                <GptStoreCard item={item} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <Nodatashow />
        )}
      </div>
    </div>
  );
}
