import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddBookMark, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
const CardImages = "/assets/images/thumbnail-w.webp";
const FreeIcon = "/assets/images/Frame-w.webp";
const LockIcon = "/assets/icons/lock.webp";
const DealIcon = "/assets/images/Frame (4)-w.webp";
const AddBookMarkIcon = "/assets/images/bookmark-w.webp";
const RemoveBookmarkIcon = "/assets/images/addbookmark-w.webp";
const PaidIcon = "/assets/images/paid-w.webp";
const FreeTrialIcon = "/assets/images/Frame (1)-w.webp";
const ContactforpriceingIcon = "/assets/images/Frame (2)-w.webp";
import styles from "./toolsdetailsmain.module.scss";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Linkdin from "@/assets/icons/linkdin";
import Twitter from "@/assets/icons/twitter";
import DiscountIcon from "@/assets/icons/discountIcon";
import { getSession } from "@/helpers/authHelper";
import classNames from "classnames";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const ButtonRightArrow = "/assets/icons/top-right-arrow.webp";
const Verified = "/assets/icons/verified.webp";


export default function ToolsDetailsMain({
  categoryToolsDetails,
  setCategoryToolsDetails,
}) {
  const { getBookMarkData, BookMarkLoading, AddBookMarkLoading } = useSelector(
    (state) => state.bookmark
  );

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isThrottled, setIsThrottled] = useState(false);
  const dispatch = useDispatch();
  const handleOnAddBookMark = async () => {
    if (isThrottled || BookMarkLoading) {
      return;
    }
    if (!getSession()?.access_token) {
      toast.error("Please login to save to bookmark");
    } else {
      const body = {
        aiToolId: categoryToolsDetails?.aiTool?._id,
      };
      if (AddBookMarkLoading) return;
      try {
        setIsThrottled(true); // Set throttling flag
        await dispatch(AddBookMark(body))
          .unwrap()
          .then((res) => {
            if (res?.success === true) {
              const count = categoryToolsDetails?.aiTool?.bookmark_count || 0;
              const updatedBookmarkCount = isBookmarked ? count - 1 : count + 1;

              let updatedGptDetails = {
                ...categoryToolsDetails?.aiTool,
                bookmark_count: updatedBookmarkCount,
              };
              if (isBookmarked) {
                toast("Removed from bookmarks", {
                  icon: "🛈",
                });
              } else {
                toast.success("Added to bookmarks");
              }
              setCategoryToolsDetails({
                ...categoryToolsDetails,
                aiTool: updatedGptDetails,
              });
              setTimeout(() => {
                setIsThrottled(false);
              }, 800);
            }
          });
      } catch (err) {}
    }
  };

  const getBookMarkApi = async () => {
    dispatch(
      getBookMark({
        aiToolId: categoryToolsDetails?.aiTool?._id,
        type: `aiTool`,
      })
    );
  };

  useEffect(() => {
    if (getSession()?.access_token && categoryToolsDetails?.aiTool?._id) {
      getBookMarkApi();
    }
  }, [categoryToolsDetails]);

  useEffect(() => {
    const isItemBookmarked = getBookMarkData?.find((item) => {
      return item?.aiToolId === categoryToolsDetails?.aiTool?._id;
    });

    setIsBookmarked(!!isItemBookmarked);
  }, [getBookMarkData]);
  const pricing = categoryToolsDetails?.aiTool?.pricing;

  return (
    <div className={styles.toolsDetailsMainSection}>
      <div className={styles.toolsDetailsHeaderFlex}>
        <div className={styles.toolsDetailsLeftSide}>
          {!categoryToolsDetails?.aiTool?.icon ? (
            <Skeleton baseColor="#232147" className={styles.toolsDetailsImg} />
          ) : (
            <div className={styles.toolsDetailsImg}>
              <LazyImage
                image={{
                  src: categoryToolsDetails?.aiTool?.icon ?? CardImages,
                  alt: `icon`,
                }}
                className={styles.lazyImgAlignmnt}
              />
            </div>
          )}

          <div className={styles.toolsDetailsNameAlignment}>
            {!categoryToolsDetails?.aiTool?.title ? (
              <div className={styles.skeletonUi}>
                <Skeleton className={styles.first} baseColor="#232147" />
                <Skeleton className={styles.second} baseColor="#232147" />
              </div>
            ) : (
              <>
                <div className={styles.toolHeadingAlignment}>
                  <h1>{categoryToolsDetails?.aiTool?.title}</h1>
                  {categoryToolsDetails?.aiTool?.isVerified && (
                    <LazyImage
                      image={{
                        src: Verified,
                        alt: "verified",
                      }}
                      className={styles.verifiedIconAlignment}
                    />
                  )}
                </div>
                <span>
                  {categoryToolsDetails?.aiTool?.aiToolSubCategoryId?.name}
                </span>
              </>
            )}
            {!categoryToolsDetails?.aiTool?.title ? (
              <div className={styles.skeletonflex}>
                {/* {[...Array(3)].map((_, index) => (
                  <React.Fragment key={index}> */}
                <Skeleton
                  baseColor="#232147"
                  height={30}
                  width={150}
                  count={1}
                />

                <div className={styles.skeletonViewNoneAlignment}>
                  <Skeleton
                    baseColor="#232147"
                    height={30}
                    width={150}
                    count={1}
                  />
                </div>
                <div className={styles.skeletonViewNoneAlignment}>
                  <Skeleton
                    baseColor="#232147"
                    height={30}
                    width={150}
                    count={1}
                  />
                </div>
                {/* </React.Fragment>
                ))} */}
              </div>
            ) : (
              <div>
                {categoryToolsDetails?.aiTool?.pricing && (
                  <div>
                    {pricing && (
                      <div className={styles.freeFlexAlignment}>
                        {pricing?.map((pricing, index) => {
                          if (pricing) {
                            return (
                              <div className={styles.freeBox} key={index}>
                                <div className={styles.checkIcon}>
                                  <LazyImage
                                    image={{
                                      src:
                                        pricing === "Free Trial"
                                          ? FreeTrialIcon
                                          : pricing === "Paid"
                                          ? PaidIcon
                                          : pricing === "Deals"
                                          ? DealIcon
                                          : pricing === "Freemium"
                                          ? LockIcon
                                          : pricing === "Free"
                                          ? FreeIcon
                                          : ContactforpriceingIcon,
                                      alt: `${pricing} Icon`,
                                    }}
                                  />
                                </div>
                                <p> {pricing} </p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={styles.toolsDetailsRightSide}>
          <div className={styles.socialIconAlignment}>
            {categoryToolsDetails?.aiTool?.facebookChannelLink && (
              <a
                href={categoryToolsDetails?.aiTool?.facebookChannelLink}
                target="_blank"
                aria-label="visit-facebook"
              >
                <Facebook />
              </a>
            )}
            {categoryToolsDetails?.aiTool?.instagramChannelLink && (
              <a
                href={categoryToolsDetails?.aiTool?.instagramChannelLink}
                target="_blank"
                aria-label="visit-instagram"
              >
                <Instragram />
              </a>
            )}
            {categoryToolsDetails?.aiTool?.linkedInChannelLink && (
              <a
                href={categoryToolsDetails?.aiTool?.linkedInChannelLink}
                target="_blank"
                aria-label="visit-linkdin"
              >
                <Linkdin />
              </a>
            )}
            {categoryToolsDetails?.aiTool?.twitterChannelLink && (
              <a
                href={categoryToolsDetails?.aiTool?.twitterChannelLink}
                target="_blank"
                aria-label="visit-twitter"
              >
                <Twitter />
              </a>
            )}
          </div>
          {categoryToolsDetails?.aiTool?.planDeals && (
            <div>
              <p>Starting at just {categoryToolsDetails?.aiTool?.planDeals}</p>
            </div>
          )}
          <div className={styles.toolsDetailsButtonAlignment}>
            {!categoryToolsDetails?.aiTool?.title ? (
              <div>
                <Skeleton
                  baseColor="#232147"
                  className={styles.skeletonButton}
                />
              </div>
            ) : (
              categoryToolsDetails?.aiTool?.websiteLink && (
                <div className={styles.exportButton}>
                  <a
                    href={
                      categoryToolsDetails?.aiTool?.websiteLink
                        ? categoryToolsDetails?.aiTool?.websiteLink
                        : ""
                    }
                    target="_blank"
                    aria-label="explore-website"
                    {...(categoryToolsDetails?.aiTool?.createdBy == "admin" && {
                      rel: "nofollow",
                    })}
                  >
                    <button aria-label="Explore Website">
                      Explore Website{" "}
                      <LazyImage
                        image={{
                          src: ButtonRightArrow,
                          alt: "ButtonRightArrow",
                        }}
                        className={styles.exportIconAlignment}
                      />
                    </button>
                  </a>
                </div>
              )
            )}
            <div
              className={classNames(
                styles.bookMarkbutton,
                isBookmarked && styles.addBookMarkBG
              )}
              onClick={() => (!BookMarkLoading ? handleOnAddBookMark() : {})}
            >
              <LazyImage
                image={{
                  src: isBookmarked ? RemoveBookmarkIcon : AddBookMarkIcon,
                  alt: "BookmarkIcon",
                }}
                className={styles.bookmarkIconAlignment}
              />
              <div className={styles.bookMarkIcon}>
                <p>{categoryToolsDetails?.aiTool?.bookmark_count ?? 0}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {categoryToolsDetails?.aiTool?.couponDeals && (
        <div className={styles.toolsDiscountAlignment}>
          <div className={styles.toolsDiscountBox}>
            <DiscountIcon />
            <p> {categoryToolsDetails?.aiTool?.couponDeals}</p>
          </div>
        </div>
      )}
    </div>
  );
}
