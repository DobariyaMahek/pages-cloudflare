import React, { useEffect, useState } from "react";
import styles from "./toolsdetailsallDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getImage,
  setScrollCategory,
  updateImage,
} from "@/store/ApiSlice/aiToolsSlice";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import dynamic from "next/dynamic";
const Carddesign = dynamic(() => import("../../home/cardSection/carddesign"), {
  ssr: true,
});
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const BannerImg = "/assets/images/thumbnail-w.webp";
const Arrow = "/assets/icons/top-right-arrow.webp";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import raw from "rehype-raw";
const adImg='/assets/images/thumbnail-w.webp'

export default function ToolsDetailsAllDetails({ categoryToolsDetails }) {
  const dispatch = useDispatch();
  const { toolsloader } = useSelector((state) => state.aiTools);
  const [toolsData, setToolData] = useState([]);
  const [toolsCategoryData, setToolCategoryData] = useState([]);
  const [image, setImage] = useState("");
  const [imageLoader, setImageLoader] = useState(false);
  const [adImageLoader, setAdImageLoader] = useState(true);
  const loader = toolsloader
  useEffect(() => {
    if (toolsloader) {
      setImageLoader(true);
    }
  }, [toolsloader]);
  useEffect(() => {
    if (categoryToolsDetails) {
      setToolData(categoryToolsDetails?.featuredAiTools);
      setToolCategoryData(categoryToolsDetails?.aiToolCategories);
      setImageLoader(false);
    }
  }, [categoryToolsDetails]);
  const handleImageClick = (item) => {
    window.open(item?.web_url, "_blank");
    dispatch(updateImage({ id: item?._id }));
  };

  useEffect(() => {
    setAdImageLoader(true)
    dispatch(getImage())
      .then((res) => {
        if (res?.payload?.success) {
          setImage(res?.payload?.payload?.adData);
        }
    setAdImageLoader(false);

      })
      .catch((err) => {

    setAdImageLoader(false);

      });
  }, []);
  const handleScrollToSection = async (id) => {
    await dispatch(setScrollCategory(id));
  };
  return (
    <div className={styles.toolsDetailsAllDetailsSection}>
      <div className={styles.toolsDetailsAllDetailsGrid}>
        <div className={styles.allChildDetailsAlignment}>
          {!categoryToolsDetails?.aiTool?.title || loader ? (
            <>
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
            </>
          ) : (
            <p>{categoryToolsDetails?.aiTool?.description}</p>
          )}
          {!categoryToolsDetails?.aiTool?.title || loader ? (
            <Skeleton className={styles.childDetailsImg} baseColor="#232147" />
          ) : (
            categoryToolsDetails?.aiTool?.images?.[0] && (
              <div className={styles.childDetailsImg}>
                <a
                  href={
                    categoryToolsDetails?.aiTool?.websiteLink
                      ? categoryToolsDetails?.aiTool?.websiteLink
                      : ""
                  }
                  target="_blank"
                  aria-label="visit-website"
                  {...(categoryToolsDetails?.aiTool?.createdBy == "admin" && {
                    rel: "nofollow",
                  })}
                >
                  <LazyImage
                    image={{
                      src: imageLoader
                        ? BannerImg
                        : categoryToolsDetails?.aiTool?.images?.[0] ??
                          BannerImg,
                      alt: `icon`,
                    }}
                    className={styles.lazyImgAlignmnt}
                  />

                  <div className={styles.overlay}>
                    <span className={styles.viewText}>Visit website</span>
                  </div>
                </a>
              </div>
            )
          )}
          {!categoryToolsDetails?.aiTool?.title || loader ? (
            <Skeleton
              className={styles.allChildDetailsAlignment}
              baseColor="#232147"
              count={5}
            />
          ) : (
            <ReactMarkdown
              remarkPlugins={[gfm]}
              rehypePlugins={[raw]}
              children={categoryToolsDetails?.aiTool?.details}
              className={styles?.textWrap}
            />
          )}

          <div className={styles.prosCrnsDetails}>
            {categoryToolsDetails?.aiTool?.pros && (
              <>
                <h2>Pros</h2>

                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  rehypePlugins={[raw]}
                  children={categoryToolsDetails?.aiTool?.pros}
                  className={styles?.textWrap}
                />
              </>
            )}{" "}
            {categoryToolsDetails?.aiTool?.cons && (
              <>
                <h2>Cons</h2>
                <ReactMarkdown
                  remarkPlugins={[gfm]}
                  rehypePlugins={[raw]}
                  children={categoryToolsDetails?.aiTool?.cons}
                  className={styles?.textWrap}
                />
              </>
            )}
          </div>
        </div>

        <div className={styles.toolsDetailsRightSide}>
          {adImageLoader ? (
            <>
              <div className={styles.addBox}></div>
            </>
          ) : (
            image?.length &&
            image?.map((item, i) => {
              const randomIndex = Math.floor(
                Math.random() * item?.square_img?.length
              );
              return (
                <div
                  className={styles.addBox}
                  key={i}
                  onClick={() => handleImageClick(item)}
                >
                  <LazyImage
                    image={{
                      src: item?.square_img[randomIndex],
                      alt: `image`,
                    }}
                  />
                </div>
              );
            })
          )}
          {loader ? (
            <div className={styles.featureCategoryDetails}>
              <Skeleton
                className={styles.skeletonDetails}
                baseColor="#232147"
              />
              <div className={styles.featureCategoryCard}>
                <div className={styles.tabviewGrid}>
                  {[1, 2, 3]?.map((aiTool, index) => (
                    <React.Fragment key={index}>
                      <Carddesign loading={loader} />
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            toolsData?.length > 0 && (
              <div className={styles.featureCategoryDetails}>
                <h4>Featured AI Tools</h4>
                <div className={styles.featureCategoryCard}>
                  <div className={styles.tabviewGrid}>
                    {toolsData?.slice(0, 3)?.map((aiTool, index) => (
                      <Link
                        prefetch={false}
                        href={`/tool/${aiTool?.slugId}`}
                        key={index}
                      >
                        <Carddesign
                          // images={aiTool?.images?.[0]}
                          images={aiTool?.thumbnail}
                          name={aiTool?.title}
                          description={aiTool?.aiToolSubCategoryId?.name}
                          icon={aiTool?.icon}
                          isFeatured={aiTool?.isFeatured}
                          item={aiTool}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          )}

          <div className={styles.toolsCategoryDetails}>
            <div className={styles.toolsCategoryBox}>
              <h4>AI Tools Category</h4>
              <div className={styles.toolsCategoryListDetails}>
                <ul>
                  {toolsCategoryData?.slice(0, 8)?.map((item, index) => {
                    return (
                      <li
                        onClick={() =>
                          handleScrollToSection(item?.name?.toLowerCase())
                        }
                        key={index}
                      >
                        <Link prefetch={false} href="/category">
                          <p>
                            {item?.name}
                            <LazyImage
                              image={{
                                src: Arrow,
                                alt: `Arrow`,
                              }}
                            />
                          </p>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
