import styles from "./businesssection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function Businesssection() {
  return (
    <div>
      <div className={styles.businesssectionAlignment}>
        <div className={styles.title}>
          <h5>
            <span>Business</span>
          </h5>
        </div>
        <div className={styles.grid}>
          {[...Array(12)]?.map((_, index) => {
            return (
              <React.Fragment key={index}>
                <Categoriescard />;
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
