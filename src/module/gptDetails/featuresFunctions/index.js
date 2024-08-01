import React, { useEffect } from "react";
import styles from "./featuresFunctions.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetGptCategoryData } from "@/store/ApiSlice/gptSlice";
import Link from "next/link";
const Arrow = "/assets/icons/top-right-arrow.webp";
import dynamic from "next/dynamic";
import Skeleton from "react-loading-skeleton";
const PromptStarters = dynamic(() => import("../promptStarters"), {
  ssr: true,
});const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
export default function FeaturesFunctions({ gptDetails }) {
  const { GptCategoryData, gptLoading } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetGptCategoryData({ status: "active", limit: 8 }));
  }, []);
  const regex = /'name':\s*'([^']*)',\s*'description':\s*'([^']*)'/g;
  let match;
  const features = [];

  while ((match = regex.exec(gptDetails?.featuresAndFunctions)) !== null) {
    const [, name, description] = match;
    features.push({ name, description });
  }

  return (
    <div className={styles.featureFunctionSection}>
      <div className={styles.featureFunctionGrid}>
        <div className={styles.featureFunctionLeft}>
          <h2>Features and Functions</h2>
          <p>Enhance Your Journey with Cutting-Edge Features and Functions</p>
          <div className={styles.featureFunctionBox}>
            {features?.length > 0 ? (
              <ul>
                {features?.map((item, index) => {
                  return (
                    <li key={index}>
                      {item?.name}
                      <p>{item?.description}</p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <ul>
                <li>
                  <p>No Features and Functions Found</p>
                </li>
              </ul>
            )}
          </div>

          <PromptStarters {...{ gptDetails }} />
        </div>

        <div className={styles.featureFunctionRight}>
          <div className={styles.gptCategoryBox}>
            <h4>GPTs Categories</h4>
            {gptLoading ? (
              <div className={styles.gptCategoryListDetails}>
                <ul className={styles.gptCategorySkeleton}>
                  {[...Array(8)]?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Skeleton baseColor="#232147" />
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div className={styles.gptCategoryListDetails}>
                <ul>
                  {GptCategoryData?.map((item, index) => {
                    return (
                      <li key={index}>
                        <Link
                          prefetch={false}
                          href={
                            gptLoading ? "#" : `/gpt-category/${item?.slugId}`
                          }
                        >
                          <p>
                            {item?.name}{" "}
                            <LazyImage
                              image={{
                                src: Arrow,
                                alt: "Arrow",
                              }}
                            />
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
