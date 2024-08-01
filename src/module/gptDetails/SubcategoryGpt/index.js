import React, { useEffect, useState } from "react";
import styles from "../../gptStore/trendingGPT/trendingGPT.module.scss";
import { useDispatch } from "react-redux";
import { GetReleatedGpt } from "@/store/ApiSlice/gptSlice";
import dynamic from "next/dynamic";
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
const GptStoreCard = dynamic(() => import("../../gptStore/gptStoreCard"), {
  ssr: true,
});
export default function ReleatedcategoryGpts({
  gptDetails,
  relatedGptLoader,
  setRelatedGptLoader,
}) {
  const [gptData, setGptData] = useState([]);
  console.log(gptDetails?.category?.[0]?.name);
  const dispatch = useDispatch();
  const HndleOnGptsApiCalls = () => {
    setRelatedGptLoader(true);
    dispatch(
      GetReleatedGpt({
        page: 1,
        limit: 6,
        selectedData: true,
        category: gptDetails?.category?.[0]?.name,
        isRandom: true,
      })
    )
      .then((res) => {
        setGptData(res?.payload.payload.app);
        setRelatedGptLoader(false);
      })
      .catch((err) => {
        setRelatedGptLoader(false);
      });
  };

  useEffect(() => {
    HndleOnGptsApiCalls();
  }, [gptDetails?.slugId]);
  return (
    <div className={styles.trendingGptSection}>
      <div className={styles.trendingGptHeading}>
        <div className={styles.headingName}>
          <h2>Related GPTs</h2>
        </div>
      </div>
      <div className={styles.trendingGptBodyAlignment}>
        <>
          {relatedGptLoader ? (
            <div className={styles.trendingGptGrid}>
              {[1, 2, 3, 4, 5, 6]?.map((_, index) => {
                return (
                  <div className={styles.browserAllCardGridItem} key={index}>
                    <GptStoreCard loading={relatedGptLoader} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {gptData?.length > 0 ? (
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
            </>
          )}
        </>
      </div>
    </div>
  );
}
