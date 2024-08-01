import React, { useEffect, useState } from "react";
import styles from "./aishortvideoscard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAiToolsShortVideo } from "@/store/ApiSlice/aiToolSortVideoSlice";
import Skeleton from "react-loading-skeleton";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import raw from "rehype-raw";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const AishortvideosModal = dynamic(
  () => import("../../shared/components/aishortvideosModal"),
  {
    ssr: true,
  }
);
const CommonPagination = dynamic(
  () => import("../../shared/components/pagination/CommonPagination"),
  {
    ssr: true,
  }
);
const LazyImage = dynamic(() => import("../../helpers/lazyImage"), {
  ssr: true,
});
const Logo = "/assets/logo/logo-5.webp";
const PlayImg = "/assets/icons/play-button.webp";

export default function Aishortvideoscard() {
  const dispatch = useDispatch();
  const { AiToolsVideoCount } = useSelector((state) => state.aiToolsshortvideo);
  const [aitoolVideo, setAitoolVideo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState("");
  const [oenModal, setOpenModal] = useState(false);
  const [nPages, setNpages] = useState(1);
  const [currentPage, setCurrentPage] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (
      router?.query?.page &&
      nPages &&
      parseInt(router?.query?.page) > nPages
    ) {
      router?.replace(
        {
          pathname: router.pathname,
          query: { ...router.query, page: 1 },
        },
        undefined,
        { shallow: true }
      );
    } else {
      setCurrentPage(parseInt(router?.query?.page) || 1);
    }
  }, [router?.query?.page, nPages]);

  useEffect(() => {
    if (currentPage) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setLoading(true);
      dispatch(getAiToolsShortVideo({ page: currentPage, limit: 20 }))
        .then((respo) => {
          setAitoolVideo(respo?.payload?.payload?.videoData);
          setNpages(Math.ceil(respo?.payload?.payload?.totalCount / 20));
            setLoading(false);
    
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [currentPage]);
  const handleOnOpenModel = (item) => {
    setOpenModal(true);
    setItem(item);
  };
  const disableBodyScroll = () => {
    const body = document?.body;
    if (body) {
      body.style.overflow = "hidden";
    }
  };
  const enableBodyScroll = () => {
    const body = document?.body;
    if (body) {
      body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    if (oenModal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [oenModal]);

  return (
    <>
      <div className={styles.aishortvideoscardAlignment}>
        <div className="container video-container">
          {loading ? (
            <div className={styles.videoSkeletonUi}>
              <div className={styles.grid}>
                {[...Array(20)]?.map((_, index) => (
                  <Skeleton
                    baseColor="#cccccc29"
                    className={styles.skeletonPlayer}
                    key={index}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.grid}>
              {aitoolVideo?.map((item, i) => {
                return (
                  <div
                    className={styles.griditems}
                    key={i}
                    onClick={() => handleOnOpenModel(item)}
                  >
                    <LazyImage
                      image={{
                        src: item?.image,
                        alt: "video",
                      }}
                      className={styles.videoThumbnailImg}
                    />
                    <div className={styles.blur}></div>
                    <div className={styles.text}>
                      <div className={styles.spacer}>
                        <div className={styles.videoDescription}>
                          <div className={styles.logoAlignment}>
                            <div className={styles.logoImage}>
                              <LazyImage
                                image={{
                                  src: item?.icon ?? Logo,
                                  alt: `videoImage`,
                                }}
                                className={styles.cardImageChild}
                              />
                            </div>
                            <h6>Find my ai tools</h6>
                          </div>
                        </div>
                        <ReactMarkdown
                          remarkPlugins={[gfm]}
                          rehypePlugins={[raw]}
                          children={item?.description}
                          className={styles?.textWrap}
                        />{" "}
                      </div>
                    </div>
                    <div className={styles.videoPlayIcon}>
      
                      <LazyImage
                        image={{
                          src:PlayImg,
                          alt: `PlayImg`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {aitoolVideo&&AiToolsVideoCount > 20 && (
        <div className={styles.pageTopAlignmentSpacer}>
          <CommonPagination nPages={nPages} currentPage={currentPage} />
        </div>
      )}

      <AishortvideosModal
        item={item}
        setOpenModal={setOpenModal}
        oenModal={oenModal}
      />
    </>
  );
}
