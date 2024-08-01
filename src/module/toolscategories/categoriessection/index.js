import React, { useEffect } from "react";
import styles from "./categoriessection.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAiToolsCategory } from "@/store/ApiSlice/aiToolsSlice";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("./categoriescard"), {
  ssr: true,
});
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);

export default function Categoriessection() {
  const dispatch = useDispatch();
  const { getAiToolsCategoryData, categoryLoader, scrollcategory } =
    useSelector((state) => state.aiTools);
  useEffect(() => {
    dispatch(getAiToolsCategory({ status: "active", limit: 50 }));
    dispatch(setCurrentPage(1));
  }, []);
  useEffect(() => {
    if (getAiToolsCategoryData?.length > 0 && scrollcategory) {
      setTimeout(() => {
        const element = document.getElementById(scrollcategory);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 1000);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [getAiToolsCategoryData]);
  const data = getAiToolsCategoryData?.filter((category) => {
    return {
      ...category,
      aiToolSubCategory: category?.aiToolSubCategory?.filter(
        (subCat) => subCat.status === "active"
      ),
    };
  });
  return (
    <div className={styles.categoriessectionAllContnetAlignment}>
      <div className="container">
        <div className={styles.categoryHeadingAlignment}>
          <h1>AI Tools Categories</h1>

          <p>
            Streamline your search and find the best AI solutions to enhance
            your operations, improve customer experiences and drive growth.
          </p>
        </div>
        {categoryLoader ? (
          <>
            <div className={styles.headingSkeletion}>
              <Skeleton className={styles.skeletionTilte} baseColor="#232147" />
            </div>
            <div className={styles.grid}>
              {[...Array(6)].map((_, index) => (
                <React.Fragment key={index}>
                  <Categoriescard loading={categoryLoader} />
                </React.Fragment>
              ))}
            </div>
          </>
        ) : data?.length > 0 ? (
          data?.map((category, i) => {
            if (
              category?.aiToolSubCategory?.filter(
                (subCat) => subCat.status === "active"
              )?.length
            ) {
              return (
                <div
                  key={i}
                  className={styles.categoryAllSubDetailsAlignment}
                  id={category?.name.toLowerCase()}
                >
                  {category?.aiToolSubCategoryCount > 0 &&
                    category?.aiToolSubCategory?.filter(
                      (subCat) => subCat.status === "active"
                    )?.length && (
                      <div className={styles.title}>
                        <h2>{category?.name}</h2>
                      </div>
                    )}

                  {category?.aiToolSubCategory?.length > 0 &&
                  category?.aiToolSubCategoryCount > 0 ? (
                    <div className={styles.grid}>
                      {category?.aiToolSubCategory
                        ?.filter((subCat) => subCat.status === "active")
                        ?.map((subCat, j) => (
                          <React.Fragment key={j}>
                            <Categoriescard subCat={subCat} />
                          </React.Fragment>
                        ))}
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              );
            } else {
              return <></>;
            }
          })
        ) : (
          <Nodatashow />
        )}
      </div>
    </div>
  );
}
