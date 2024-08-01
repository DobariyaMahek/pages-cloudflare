import React from "react";
import styles from "./progreasbar.module.scss";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const { loading, categoryLoader, toolsloader, homeloading } = useSelector((state) => state.aiTools);
  const { gptLoading, gptDataLoading } = useSelector((state) => state.gpt);
  const { blogLoading } = useSelector((state) => state.blog);
  const { videoloading } = useSelector((state) => state.aiToolsshortvideo);
  const { BookMarkLoading } = useSelector((state) => state.bookmark);
  const { ArticleLoading } = useSelector((state) => state.article);

  let isLoading =
    blogLoading ||
    gptLoading ||
    gptDataLoading ||
    homeloading ||
    loading ||
    categoryLoader ||
    videoloading ||
    ArticleLoading ||
    BookMarkLoading ||
    toolsloader;

  return (
    <>
      {isLoading && (
        <>
          <div className={styles.mappingloader}></div>

          <div className={styles.spinner}></div>
        </>
      )}
    </>
  );
};

export default ProgressBar;
