import styles from "./imageSection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function ImageSection({ item }) {
  return (
    <div className={styles.imageSectionAlignment}>
      <div className={styles.title}>
        <h5>
          <span>{item?.name}</span>
        </h5>
      </div>
      <div className={styles.grid}>
        {item?.aiToolSubCategory?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Categoriescard subCat={item} key={index} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
