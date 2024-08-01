import styles from "./companyImage.module.scss";
const Icon1 = "/assets/images/s-logo-1.webp";
const Icon2 = "/assets/images/s-logo-2.webp";
const Icon3 = "/assets/images/s-logo-3.webp";
const Icon4 = "/assets/images/s-logo-4.webp";
const Icon5 = "/assets/images/s-logo-5.webp";
const Icon6 = "/assets/images/s-logo-6.webp";
const Icon7 = "/assets/images/s-logo-7.webp";
const Icon8 = "/assets/images/s-logo-8.webp";
const Icon9 = "/assets/images/s-logo-9.webp";
import Marquee from "react-fast-marquee";
import React from "react";
import LazyImage from "@/helpers/lazyImage";
export default function CompanyImage() {
  const ismobile=window.innerWidth
  return (
    <div className={styles.companyImage}>
      <div className={styles.imageAlignment}>
        <Marquee gradient={false} className="marquee">
          {[
            Icon1,
            Icon2,
            Icon3,
            Icon4,
            Icon5,
            Icon6,
            Icon7,
            Icon8,
            Icon9,
            Icon1,
            Icon2,
            Icon3,
            Icon4,
            Icon5,
            Icon6,
            Icon7,
            Icon8,
            Icon9,
          ].map((icon, index) => {
            return (
              <React.Fragment key={index}>
                <LazyImage
                  image={{
                    src: icon,
                    alt: `icon${index}`,
                  }}
                  width={100}
                  height={ismobile > 600 ? 26 :20}
                />
              </React.Fragment>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
