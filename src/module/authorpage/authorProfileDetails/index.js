import React from "react";
import styles from "./authorProfileDetails.module.scss";
import Facebook from "@/assets/icons/facebook";
import Instragram from "@/assets/icons/instragram";
import Linkdin from "@/assets/icons/linkdin";
import Twitter from "@/assets/icons/twitter";
import Skeleton from "react-loading-skeleton";
import { botIcon } from "@/helpers/constant";

export default function AuthorProfileDetails({userData}) {

  
  return (
    <div>
      {!userData?.author_name ? (
        <div className={styles.authorProfileDetailsSection}>
          <Skeleton
            className={styles.authorProfileProfileImg}
            baseColor="#232147"
          />
          <div className={styles.skeletonDisplayAlignment}>
            <Skeleton height={30} width={200} baseColor="#232147" />

            <div className={styles.skeletonflex}>
              {[...Array(4)]?.map((_, index) => (
                <React.Fragment key={index}>
                  <Skeleton baseColor="#232147" className={styles.icon} />
                </React.Fragment>
              ))}
            </div>
            <Skeleton height={20} width={400} baseColor="#232147" count={2} />
          </div>
        </div>
      ) : (
              <div className={styles.authorProfileDetailsSection}>
                <div className={styles.authorProfileProfileImg}>
                  <img
                    src={
                      userData?.author_profile?.data?.attributes?.url ??
                      botIcon
                    }
                    alt="ProfileImg"
                  />
                </div>
                <div className={styles.authorProfileDetailsAlignment}>
                  <h1>{userData?.author_name}</h1>
                  <div className={styles.socialAlignment}>
                    {userData?.social_media?.map((link) => (
                      <a
                        key={link?.id}
                        href={link?.social_media_link}
                        target="_blank"
                        rel="noopener noreferrer"
                             aria-label="visit-link"
                        className={styles.socialAlignment}
                      >
                        {link?.social_media_name === "LinkedIn" && <Linkdin />}
                        {link?.social_media_name === "Instagram" && (
                          <Instragram />
                        )}
                        {link?.social_media_name === "Twitter" && <Twitter />}
                        {link?.social_media_name === "Facebook" && <Facebook />}
                      </a>
                    ))}
                  </div>
                  <p>
                    {userData?.description}
                  </p>
                </div>
              </div>    
      )}
    </div>
  );
}
