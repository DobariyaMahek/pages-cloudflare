import React, { useEffect } from "react";
import styles from "./gptCategory.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  GetGptMainCategoryData,
  setCurrentPage,
} from "@/store/ApiSlice/gptSlice";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
const Nodatashow = dynamic(
  () => import("../../shared//components/nodatashow"),
  {
    ssr: true,
  }
);
const GptCategoriescard = dynamic(() => import("./gptCategoriescard"), {
  ssr: true,
});
export default function GptCategory() {
  const dispatch = useDispatch();
  const { gptLoading, GptMainCategoryData, scrollgptcategory } = useSelector(
    (state) => state.gpt
  );

  useEffect(() => {
    dispatch(GetGptMainCategoryData({ status: "active" }));
    dispatch(setCurrentPage(1));
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (GptMainCategoryData?.length > 0 && scrollgptcategory) {
        const element = document.getElementById(scrollgptcategory);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    }, 1000);
  }, [GptMainCategoryData]);
  return (
    <div className={styles.gptCategoriessectionAllContnetAlignment}>
      <div className="container">
        <div className={styles.gptCategoryHeadingAlignment}>
          <h4>GPTs Categories</h4>
          <p>
            Streamline your search and find the best AI solutions to enhance
            your operations, improve customer experiences and drive growth.
          </p>
        </div>
        {gptLoading ? (
          <>
            <div className={styles.headingSkeletion}>
              <Skeleton className={styles.skeletionTilte} baseColor="#232147" />
            </div>
            <div className={styles.grid}>
              {[...Array(6)]?.map((_, index) => (
                <React.Fragment key={index}>
                  <GptCategoriescard loading={gptLoading} />
                </React.Fragment>
              ))}
            </div>
          </>
        ) : GptMainCategoryData?.length > 0 ? (
          GptMainCategoryData?.map((category, i) => {
            const arr = category?.category?.filter((data) => {
              return data?.status == "active";
            });
            return (
              <React.Fragment key={i}>
                {arr?.length > 0 && (
                  <div
                    className={styles.gptCategoryAllSubDetailsAlignment}
                    key={i}
                    id={category?.name?.toLowerCase()}
                  >
                    <div className={styles.title}>
                      <h4>{category?.name}</h4>
                    </div>
                  </div>
                )}

                {arr?.length > 0 && (
                  <div className={styles.grid}>
                    {arr?.map((subcategory, j) => (
                      <React.Fragment key={j}>
                        <GptCategoriescard subCat={subcategory} />
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <Nodatashow />
        )}
      </div>
    </div>
  );
}
