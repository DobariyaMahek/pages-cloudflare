import React, { useEffect } from "react";
import styles from "./gptDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useState } from "react";
import { AddBookMark, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";

const RightIcon = "/assets/icons/breadcrumbs -right.webp";
const ShareIcon = "/assets/icons/share-icon.webp";
const ButtonRightArrow = "/assets/icons/top-right-arrow.webp";
const RangeIcon = "/assets/icons/range-icon-white.webp";
const AddBookMarkIcon = "/assets/images/bookmark-w.webp";
const RemoveBookmarkIcon = "/assets/images/addbookmark-w.webp";
const CardImages = "/assets/images/thumbnail-w.webp";

import LazyImage from "@/helpers/lazyImage";
import Nodatashow from "@/shared/components/nodatashow";
import ReleatedcategoryGpts from "./SubcategoryGpt";
import { getSession } from "@/helpers/authHelper";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import ShareModal from "./shareModal";
import FeaturesFunctions from "./featuresFunctions";
const GptIcon = "/assets/icons/gpt-icon.webp";
export default function GptDetails({ seoData }) {
  const pathname = usePathname();
  const lastPathname = pathname?.substring(pathname.lastIndexOf("/") + 1);
  const [shareModal, setShareModal] = useState(false);
  const [gptLoading, setLodar] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [gptDetails, setGptDetails] = useState({});
  const { getBookMarkData, BookMarkLoading, AddBookMarkLoading } = useSelector(
    (state) => state.bookmark
  );
  const dispatch = useDispatch();
  const [relatedGptLoader, setRelatedGptLoader] = useState(true);
  const [isThrottled, setIsThrottled] = useState(false);
  const router = useRouter();
  const handleGetData = () => {
    setGptDetails(seoData?.dynamicData);
  };
  useEffect(() => {
    if (lastPathname) {
      handleGetData();
    } else {
      router.push("/");
    }
  }, [lastPathname]);
  useEffect(() => {
    gptDetails?._id && getBookMarkApi();
  }, [gptDetails]);

  const handleOnAddBookMark = async () => {
    if (isThrottled || gptLoading || BookMarkLoading) {
      return;
    }
    if (!getSession()?.access_token) {
      toast.error("Please login to save to bookmark");
    } else {
      const body = {
        appId: gptDetails?._id,
      };
      if (AddBookMarkLoading) return;
      try {
        setIsThrottled(true); // Set throttling flag
        const res = await dispatch(AddBookMark(body)); // Await the dispatch result directly
        const count = gptDetails.bookmark_count || 0;
        if (res?.payload?.success) {
          const updatedBookmarkCount = isBookmarked ? count - 1 : count + 1;

          let updatedGptDetails = {
            ...gptDetails,
            bookmark_count: updatedBookmarkCount,
          };

          if (isBookmarked) {
            toast.error("Removed from bookmarks", { icon: "🛈" });
          } else {
            toast.success("Added to bookmarks");
          }
          setGptDetails(updatedGptDetails);
          setTimeout(() => {
            setIsThrottled(false);
          }, 800);
        }
      } catch (err) {}
    }
  };

  const getBookMarkApi = async () => {
    dispatch(getBookMark({ appId: gptDetails?._id, type: `app` }));
  };

  useEffect(() => {
    const isItemBookmarked = getBookMarkData?.find((item) => {
      return item?.app?._id === gptDetails?._id;
    });
    setIsBookmarked(!!isItemBookmarked);
  }, [getBookMarkData]);
  useEffect(() => {
    if (shareModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [shareModal]);
  return (
    <>
      {!gptLoading && !gptDetails ? (
        <>
          <Nodatashow />
        </>
      ) : (
        <>
          <div className={styles.gptDetailsSection}>
            <div className="container">
              <div className={styles.gptDetailsTopBar}>
                {gptLoading ? (
                  <>
                    <div className={styles.skeletonUi}>
                      <Skeleton
                        className={styles.breadcrumbSkeleton}
                        width={100}
                        baseColor="#232147"
                      />
                      <LazyImage
                        image={{
                          src: RightIcon,
                          alt: "RightIcon",
                        }}
                      />
                      <Skeleton
                        className={styles.breadcrumbSkeleton}
                        width={100}
                        baseColor="#232147"
                      />
                      <LazyImage
                        image={{
                          src: RightIcon,
                          alt: "RightIcon",
                        }}
                      />
                      <Skeleton
                        className={styles.breadcrumbSkeleton}
                        width={100}
                        baseColor="#232147"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {" "}
                    <div className={styles.topBarLeft}>
                      <Link prefetch={false} href="/gpt-store">
                        <p className={styles.breadcrumbName}>
                          GPT Store{" "}
                          <LazyImage
                            image={{
                              src: RightIcon,
                              alt: "RightIcon",
                            }}
                          />
                        </p>
                      </Link>
                      {gptDetails?.categoryId && (
                        <Link
                          prefetch={false}
                          href={
                            !gptLoading
                              ? `/gpt-category/${gptDetails?.category?.[0]?.slugId}`
                              : "#"
                          }
                        >
                          <p className={styles.breadcrumbName}>
                            {gptDetails?.category?.[0]?.name}
                            <LazyImage
                              image={{
                                src: RightIcon,
                                alt: "RightIcon",
                              }}
                            />
                          </p>
                        </Link>
                      )}
                      <a
                        className={styles.breadcrumbName}
                        aria-label="visit-gpt"
                      >
                        {gptDetails?.projectName}
                      </a>
                    </div>
                  </>
                )}
              </div>

              <div className={styles.gptDetailsHeaderAlignment}>
                <div className={styles.gptDetailsHeaderFlex}>
                  <div className={styles.gptProfileAlignment}>
                    {gptLoading ? (
                      <>
                        <Skeleton
                          className={styles.gptProfileImg}
                          width={100}
                          baseColor="#232147"
                        />
                      </>
                    ) : (
                      <>
                        <div>
                          <div className={styles.gptProfileImg}>
                            <LazyImage
                              image={{
                                src: gptDetails?.icon ?? CardImages,
                                alt: "GptImg",
                              }}
                              className={styles.cardImageChild}
                            />
                            <div className={styles.gptIconAlignment}>
                              <LazyImage
                                image={{
                                  src: GptIcon,
                                  alt: "GptIcon",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {gptLoading ? (
                      <>
                        <div className={styles.skeletonUi}>
                          <Skeleton
                            className={styles.first}
                            baseColor="#232147"
                          />
                          <Skeleton
                            className={styles.second}
                            baseColor="#232147"
                          />
                          <Skeleton
                            className={styles.third}
                            baseColor="#232147"
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className={styles.gptProfileDetailsAlignment}>
                          <h1>{gptDetails?.projectName}</h1>
                          <span>{gptDetails?.category?.[0]?.name}</span>

                          <div className={styles.authorDetailsAlignment}>
                            <div className={styles.leftSideAlignment}>
                              <LazyImage
                                image={{
                                  src: RangeIcon,
                                  alt: "RangeIcon",
                                }}
                              />
                              <p> {gptDetails?.conversationCounts}</p>
                            </div>
                            <p>@{gptDetails?.authorName}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className={styles.gptRightSideAlignment}>
                    <div className={styles.topOptionAlignment}>
                      <div
                        className={styles.optionIcon}
                        onClick={() => {
                          setShareModal(true);
                        }}
                      >
                        <LazyImage
                          image={{
                            src: ShareIcon,
                            alt: "ShareIcon",
                          }}
                        />
                      </div>
                    </div>
                    <div className={styles.topBottomFlexAlignment}>
                      <div className={styles.topOptionButton}>
                        {gptLoading ? (
                          <>
                            <Skeleton
                              baseColor="#232147"
                              className={styles.bookMarkSkeleton}
                            />
                          </>
                        ) : (
                          <a
                            href={gptDetails?.websiteLink}
                            target="_blank"
                            aria-label="try-gpt"
                          >
                            <button>
                              Try GPT{" "}
                              <LazyImage
                                image={{
                                  src: ButtonRightArrow,
                                  alt: "ButtonRightArrow",
                                }}
                              />
                            </button>{" "}
                          </a>
                        )}
                      </div>

                      <div
                        className={classNames(
                          styles.bookMarkbutton,
                          isBookmarked && styles.addBookMarkBG
                        )}
                        onClick={() =>
                          !BookMarkLoading ? handleOnAddBookMark() : {}
                        }
                      >
                        <LazyImage
                          image={{
                            src: isBookmarked
                              ? RemoveBookmarkIcon
                              : AddBookMarkIcon,

                            alt: "BookmarkIcon",
                          }}
                        />
                        <p>
                          {gptDetails?.bookmark_count
                            ? gptDetails?.bookmark_count
                            : 0}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.gptListAlignment}>
                  {gptLoading ? (
                    <>
                      <Skeleton
                        className={styles.gptListAlignment}
                        baseColor="#232147"
                      />
                    </>
                  ) : (
                    <>
                      <p>{gptDetails?.description}</p>
                    </>
                  )}
                </div>
              </div>

              <FeaturesFunctions gptDetails={gptDetails} />
              <ReleatedcategoryGpts
                gptDetails={gptDetails}
                setRelatedGptLoader={setRelatedGptLoader}
                relatedGptLoader={relatedGptLoader}
              />
            </div>
          </div>
        </>
      )}

      {shareModal && (
        <ShareModal setShareModal={setShareModal} shareModal={shareModal} />
      )}
    </>
  );
}
