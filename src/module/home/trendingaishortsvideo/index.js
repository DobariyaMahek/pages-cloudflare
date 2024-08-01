import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./trendingaishortsvideo.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import ViewAll from "@/shared/components/viewAll";
import Marquee from "react-fast-marquee";
import Skeleton from "react-loading-skeleton";
import AishortvideosModal from "@/shared/components/aishortvideosModal";
import LazyImage from "@/helpers/lazyImage";
const Logo = "/assets/logo/logo-5.webp";
const PlayIcon = "/assets/icons/play-button.webp";
const CardImages = "/assets/images/thumbnail-w.webp";

export default function Trendingaishortsvideo({
  categoryToolsDetails,
  loading,
}) {
  const dispatch = useDispatch();
  const [item, setItem] = useState("");
  const [oenModal, setOpenModal] = useState(false);
  const [getAllAiToolsVideo, setgetAllAiToolsVideo] = useState([]);
  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);
  useEffect(() => {
    if (categoryToolsDetails) {
      setgetAllAiToolsVideo(categoryToolsDetails?.aiShortsVideos);
    }
  }, [categoryToolsDetails]);

  const handleOnOpenModel = (item) => {
    setOpenModal(true);
    setItem(item);
  };
  const disableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
    }
  };
  const enableBodyScroll = () => {
    const body = document.body;
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
      <div className={styles.trendingaishortsvideoSection}>
        <div className="container">
          <div className={styles.heading}>
            <div className={styles.title}>
              <div>
                <h2>AI Shorts</h2>
                <p>Quick AI Videos for Everyone - Simplifying Tech with Short, Easy-to-Understand Clips.</p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link prefetch={false} href={`/ai-shorts-videos`}>
                <ViewAll />
              </Link>
            </div>
          </div>
          {oenModal &&  <AishortvideosModal item={item} setOpenModal={setOpenModal} oenModal={oenModal} />}
          {loading ? (         
            <div className={styles.videoSkeletonUi}>
              {[...Array(5)]?.map((_, index) => (
                <Skeleton baseColor="#cccccc29" className={styles.skeletonPlayer} key={index} />
              ))}
            </div>
          ) : (
                <div className={styles.videoAlignment}>
              <Marquee gradient={false} className="marquee" pauseOnHover={true}>
              {getAllAiToolsVideo?.map((item, i) => {
                return (
                  <div className={styles.grid}>
                    <div className={styles.videoAlignment} key={i} onClick={() => handleOnOpenModel(item)}>
                      <div className={styles.videoDetailsAlignment}>
                        <div className={styles.image}>
                          <LazyImage
                            image={{
                              src: item?.image || CardImages,
                              alt: `videoImage`,
                            }}
                            className={styles.cardImageChild}
                          />
                        </div>

                        <div className={styles.videoDescription}>
                          <div className={styles.logoAlignment}>
                            <div className={styles.logoImage}>
                              <LazyImage
                                image={{
                                  src: item?.icon ? item?.icon : Logo,
                                  alt: `videoImage`,
                                }}
                                className={styles.cardImageChild}
                              />
                            </div>
                            <h3>Find my ai tools</h3>
                          </div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item?.description,
                            }}
                          />
                        </div>

                        <div className={styles.videoPlayIcon}>
                          <LazyImage
                            image={{
                              src: PlayIcon,
                              alt: `videoImage`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Marquee>
                </div>
          )}
          <div className={styles.mobileViewAll}>
            <Link prefetch={false} href="/ai-shorts-videos">
              <ViewAll />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
