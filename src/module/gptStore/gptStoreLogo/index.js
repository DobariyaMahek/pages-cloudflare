import React from "react";
import styles from "./gptStoreLogo.module.scss";
const GptLogo1 = "/assets/icons/gpt-logo1.webp";
const GptLogo2 = "/assets/icons/gpt-logo2.webp";
const GptLogo3 = "/assets/icons/gpt-logo3.webp";
const GptLogo4 = "/assets/icons/gpt-logo4.webp";
const GptLogo5 = "/assets/icons/gpt-logo5.webp";
const GptLogo6 = "/assets/icons/gpt-logo6.webp";
const GptLogo7 = "/assets/icons/gpt-logo7.webp";
const GptLogo8 = "/assets/icons/gpt-logo8.webp";
import Marquee from "react-fast-marquee";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
export default function GptStoreLogo() {
  return (
    <div className={styles.gptStoreCompantSection}>
      <Marquee gradient={false} className="marquee">
        {[
          GptLogo1,
          GptLogo2,
          GptLogo3,
          GptLogo4,
          GptLogo5,
          GptLogo6,
          GptLogo7,
          GptLogo8,
          GptLogo1,
          GptLogo2,
          GptLogo3,
          GptLogo4,
          GptLogo5,
        ]?.map((icon, index) => {
          return (
            <div className={styles.gptLogoAlignment} key={index}>
              <LazyImage
                image={{
                  src: icon,
                  alt: `icon${index}`,
                }}
                width="100%"
                height="100%"
              />
            </div>
          );
        })}
      </Marquee>
    </div>
  );
}
