import React, { useEffect, useState } from "react";
import styles from "./cardSection.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";
import Carddesign from "./carddesign";

export default function CardSection({ categoryToolsDetails }) {
  const { homeloading } = useSelector((state) => state.aiTools);
  const [finalDisplyArray, setFinalDisplyArray] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    if (categoryToolsDetails) {
      setLoader(true);
      let shuffledData = categoryToolsDetails?.featuredAiTools?.slice(0, 8);
      const chunkSize = 2;
      const chunkedData = Array.from(
        { length: Math.ceil(shuffledData?.length / chunkSize) },
        (_, index) =>
          shuffledData?.slice(index * chunkSize, index * chunkSize + chunkSize)
      );
      setFinalDisplyArray(chunkedData);
      setTimeout(() => {
        setLoader(false);
      }, 100);
    }
  }, [categoryToolsDetails]);
  const cardLoading = loader || homeloading;
  return (
    <div className={styles.cardSectionAlignment}>
      <div className="container">
        {cardLoading ? (
          <div className={styles.grid}>
            {[...Array(4)]?.map((_, index) => (
              <div className={styles.gridItems} key={index}>
                <Carddesign loading={cardLoading} />
                <Carddesign loading={cardLoading} />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.grid}>
            {finalDisplyArray?.map((item, index) => {
              return (
                <div className={styles.gridItems} key={index}>
                  {item?.map((aiTool, idx) => {
                    return (
                      <div key={idx}>
                        <Link prefetch={false} href={`/tool/${aiTool?.slugId}`}>
                          <Carddesign
                            images={aiTool?.thumbnail}
                            name={aiTool?.title}
                            description={aiTool?.aiToolSubCategoryId?.name}
                            icon={aiTool?.icon}
                            item={aiTool}
                            isFeatured={aiTool?.isFeatured}
                          />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
