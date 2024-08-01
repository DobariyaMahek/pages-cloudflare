 
import React, { useState } from "react";
import styles from "./tableofcontents.module.scss";
import { marked } from "marked";
import Skeleton from "react-loading-skeleton";
export default function Tableofcontents({ blogDetail }) {

  const [activeSection, setActiveSection] = useState(null);


  const handleScrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

    const htmlContent = blogDetail?.blogDetails
        ? marked(blogDetail?.blogDetails)
        : "";
      const div = document?.createElement("div");
      div.innerHTML = htmlContent;
      
      const titleElements = div.querySelectorAll("h2");

  return (
    <div className={styles.tableofcontents}>
      {!blogDetail?.blogDetails  ? (
        <>
          <Skeleton
            className={styles.tableofcontentsSkeleton}
            baseColor="#232147"
          />
        </>
      ) : (
        <>
          <h6>Table Of Contents</h6>
        </>
      )}
      {!blogDetail?.blogDetails  ? (
        <>
          <Skeleton
            className={styles.tableofcontentsListSkeleton}
            count={5}
            baseColor="#232147"
          />
        </>
      ) : (
        <div className={styles.allListAlignment}>
             {Array.from(titleElements)?.map(
                (titleElement, titleIndex) => {
                  const text = titleElement.innerText;
            
                  return (
                    <div
                      className={`${styles.textGrid} ${
                        activeSection === text ? styles.active : ""
                      }`}
                      key={titleIndex}
                      onClick={() => handleScrollToSection(text)}
                    >
                      <div className={styles.icon}></div>
                      <span>{text}</span>
                    </div>
                  );
                }
              )}
        </div>
      )}
    </div>
  );
}
