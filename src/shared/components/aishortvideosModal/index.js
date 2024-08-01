import styles from "./aishortvideosModal.module.scss";
import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import gfm from "remark-gfm";
import raw from "rehype-raw";
import classNames from "classnames";
import LazyImage from "@/helpers/lazyImage";
const AiLogo = "/assets/logo/logo-5.webp";
const CloseIcon = "/assets/icons/close-white.webp";

export default function AishortvideosModal({ item, setOpenModal, SherebarRef, oenModal }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (oenModal) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [oenModal]);

  return (
    <div className={oenModal ? classNames(styles.aishortvideosModal, styles.openModalWrapper) : classNames(styles.aishortvideosModal)}>
      <div className={styles.modal}>
        <div className={styles.modalHeaderFlex}>
          <div className={styles.mobileView}>
            <div className={styles.modalTopHeaderAlignment}>
              <div className={styles.logo}>
                <LazyImage
                  image={{
                    src: AiLogo,
                    alt: `videoImage`,
                  }}
                />
              </div>
              <div className={styles.modalTopHeaderName}>
                <h6> Find my ai tool</h6>
                <p>Findmyaitool </p>
              </div>
            </div>
          </div>
          <div
            className={styles.modalCloseMobile}
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <LazyImage
              image={{
                src: CloseIcon,
                alt: `videoImage`,
              }}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.griditems}>
            <div className={styles.video}>
              <video
                ref={videoRef}
                type="video/mp4"
                src={item.videoLink}
                autoPlay
                loop
              ></video>
            </div>
          </div>
          <div className={styles.line}></div>
          <div className={styles.griditems}>
            <div className={styles.WebView}>
              <div className={styles.modalTopHeaderAlignment}>
                <div className={styles.logo}>
                  <LazyImage
                    image={{
                      src: AiLogo,
                      alt: `videoImage`,
                    }}
                  />
                </div>
                <div className={styles.modalTopHeaderName}>
                  <h6> Find my ai tool</h6>
                  <p>Findmyaitool </p>
                </div>
              </div>
              <div className={styles.closeicon}          onClick={() => {
                    setOpenModal(false);
                  }}>

                <LazyImage
                  image={{
                    src: CloseIcon,
                    alt: `videoImage`,
                  }}
                />
              </div>
            </div>
            <div className={styles.scrollbarSection}>
              <h2>{item?.title}</h2>
              <ReactMarkdown remarkPlugins={[gfm]} rehypePlugins={[raw]} children={item?.description} className={styles?.textWrap} />
              <p>
                <span>#aitools</span> <span>#aiediting</span> <span>#runwayml </span>
                <span> #videoediting </span> <span> #aftereffects</span>
              </p>
            </div>
            <div className={styles.lastText}>
              <p>{`Powered by ❤️ FindMyAITool`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
