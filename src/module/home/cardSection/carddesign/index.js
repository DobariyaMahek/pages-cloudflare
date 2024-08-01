import React from "react";
import styles from "./carddesign.module.scss";
import classNames from "classnames";
import Skeleton from "react-loading-skeleton";
import LazyImage from "@/helpers/lazyImage";
const CardImages = "/assets/images/thumbnail-w.webp";
const verified = "/assets/icons/verified.webp";

export default function Carddesign({
  name,
  icon,
  images,
  isSelected,
  loading,
  item,
}) {
  return (
    <div>
      <div
        className={classNames(
          styles.homeCardDesign,
          isSelected && styles.activeHomeCard,
          styles.homeCardDesign
        )}
      >
        <div className={styles.cardImage}>
          <div className={styles.cardMainImage}>
            <LazyImage
              image={{
                src: images || CardImages,
                alt: "CardImage",
              }}
              className={styles.cardImageChild}
            />
          </div>
          {item?.isFeatured === true && (
            <div className={styles.featured}>
              <button aria-label="Sponsored">Sponsored </button>
            </div>
          )}
        </div>

        <>
          <div className={styles.details}>
            <div className={styles.iconAlignment}>
              <LazyImage
                image={{
                  src: icon || CardImages,
                  alt: "CardImage",
                }}
                className={styles.cardImageChild}
              />
            </div>
            <div className={styles.skeletonUi}>
              {loading ? (
                <Skeleton className={styles.firsttext} baseColor="#232147" />
              ) : (
                <div className={styles.toolNameWrap}>
                  <p>{name}</p>{" "}
                  {item?.isVerified && (
                    <LazyImage
                      image={{
                        src: verified,
                        alt: "verified",
                      }}
                      className={styles.verifiedIconAlignment}
                    />
                  )}
                </div>
              )}
              {loading ? (
                <Skeleton
                  height={15}
                  width={"100%"}
                  borderRadius={10}
                  baseColor="#232147"
                />
              ) : (
                <span>
                  {item?.subcategoryName
                    ? item?.subcategoryName
                    : item?.aiToolSubCategoryId?.name
                    ? item?.aiToolSubCategoryId?.name
                    : item?.aiToolSubCategory?.length > 0 &&
                      item?.aiToolSubCategory?.[0]?.name
                    ? item?.aiToolSubCategory?.[0]?.name
                    : ""}
                </span>
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
