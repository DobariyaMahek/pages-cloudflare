 

import Link from "next/link";
import styles from "./gptCategoriescard.module.scss";
import { useDispatch } from "react-redux";
import { setSubcategoryId } from "@/store/ApiSlice/aiToolsSlice";
import Skeleton from "react-loading-skeleton";
    
const RightIcon = "/assets/icons/right-sm.webp";

export default function GptCategoriescard({ subCat, loading }) {
  const dispatch = useDispatch();

  const handleViewCategoryDetails = (id, item) => {
    dispatch(setSubcategoryId(id));
  };
  const capitalizeFirstLetter = (str) => {
    const words = str?.toLowerCase()?.split(/[\s-]+/);

    const capitalizedWords = words.map(
      (word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)
    );

    return capitalizedWords?.join(" ");
  };

  return (
    <Link prefetch={false}     href={!loading ? `/gpt-category/${subCat?.slugId}` : "#"}>
      <div
        className={styles.gptCategoriescard}
        onClick={() => {
          handleViewCategoryDetails(subCat?._id, subCat);
        }}
      >
        <div className={styles.textGrid}>
          <div className={styles.cardSkeletonUi}>
            {loading ? (
              <>
                <Skeleton
                  className={styles.gptCardSkeletonUi}
                  baseColor="#cccccc29"
                />
              </>
            ) : (
              <span>{capitalizeFirstLetter(subCat?.name)}</span>
            )}

            {loading ? (
              <Skeleton className={styles.cardText} baseColor="#cccccc29" />
            ) : (
              <>
                <p>{subCat?.description}</p>
              </>
            )}
          </div>
          <img loading="lazy" src={RightIcon} alt="RightIcon" />
        </div>
        <div className={styles.cardSkeletonUi}>
          {loading ? (
            <Skeleton className={styles.countSkelton} baseColor="#cccccc29" />
          ) : (
            <>
              <div className={styles.countNuberAlignment}>
                <span>{subCat?.appCount}+</span>
              </div>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
