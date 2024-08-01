 
import React, { useState } from "react";
import styles from "./faqsection.module.scss";
import classNames from "classnames";
import { faqsData } from "@/helpers/constant";
import LazyImage from "@/helpers/lazyImage";

const PlusIcon = "/assets/icons/plus.webp";
const MinusIcon = "/assets/icons/minus-icon.webp";
export default function Faqsection() {
  const [openIndex, setOpenIndex] = useState(null);
  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  return (
    <div className={styles.faqsectionAlignment}>
      <div className="container">
        <div className={styles.title}>
          <h2>
            Frequently <span>Asked</span> Questions
          </h2>
        </div>
        <div className={styles.boxcenterAlignment}>
          {faqsData?.map((item, index) => (
            <div className={classNames(styles.mainBox)} key={index}>
              <div className={styles.header}>
                <div className={styles.text}>
                  <p>{`0${index + 1}`}</p>
                  <p>{item?.question}</p>
                </div>
                <div
                  className={classNames(
                    styles.icon,
                    openIndex === index ? styles.iconsColorChange : ""
                  )}
                  onClick={() => handleToggle(index)}
                >
                  <LazyImage
                    width="100%"
                    height="100%"
                    image={{
                      src: openIndex === index ? MinusIcon : PlusIcon,
                    }}
                    alt={openIndex === index ? "MinusIcon" : "PlusIcon"}
                  />
                </div>
              </div>
              <div
                className={classNames(
                  styles.body,
                  openIndex === index ? styles.showData : styles.hideData
                )}
              >
                <div className={styles.bodyTextGrid}>
                  <div></div>
                  {item?.answer.split("\n").map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
