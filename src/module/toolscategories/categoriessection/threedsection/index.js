import styles from "./threedsection.module.scss";
import dynamic from "next/dynamic";
const Categoriescard = dynamic(() => import("../categoriescard"), {
  ssr: true,
});
import React from "react";
export default function Threedsection() {
  return (
    <div className={styles.threedsectionAlignment}>
      <div className={styles.title}>
        <h5>
          <span>3D</span>
        </h5>
      </div>
      <div className={styles.grid}>
        {[...Array(6)]?.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <Categoriescard key={index} />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
