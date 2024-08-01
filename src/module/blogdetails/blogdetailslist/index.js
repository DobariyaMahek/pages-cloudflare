import React, { useRef } from "react";
import styles from "./blogdetailslist.module.scss";
import moment from "moment";
import { marked } from "marked";
import Skeleton from "react-loading-skeleton";
import { isEmpty } from "@/helpers/common";
import { botIcon } from "@/helpers/constant";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
const Relatedblogs = dynamic(() => import("./relatedblogs"), {
  ssr: true,
});
const Tableofcontents = dynamic(() => import("./tableofcontents"), {
  ssr: true,
});

export default function Blogdetailslist({ blogDetail }) {
  const titleRef = useRef(null);
  const { blogDataLoading } = useSelector((state) => state.blog);
  return (
    <div className={styles.blogdetailslistalignment}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.griditems}>
            <Tableofcontents blogDetail={blogDetail} />
          </div>
          {blogDataLoading ? (
            <div>
              <Skeleton
                className={styles.blogdetailslistalignmentHeadingSkeleton}
                baseColor="#232147"
              />{" "}
              <Skeleton
                className={styles.datedetailslistalignmentHeadingSkeleton}
                baseColor="#232147"
              />{" "}
              <Skeleton
                className={styles.skeletonTiltlePragaraph}
                baseColor="#232147"
              />
              <Skeleton
                className={styles.skeletonPragaraph}
                baseColor="#232147"
                count={5}
              />
              <Skeleton
                className={styles.skeletonTiltlePragaraph}
                baseColor="#232147"
              />
              <Skeleton
                className={styles.skeletonPragaraph}
                baseColor="#232147"
                count={5}
              />
            </div>
          ) : (
            <div className={styles.griditems}>
              {[blogDetail]?.map((blog, index) => {
                let htmlContent;
                if (blog?.blogDetails) {
                  htmlContent = marked(blog?.blogDetails);
                }
                const div = document.createElement("div");
                div.innerHTML = htmlContent;
                const titleElements = div.querySelectorAll("h1, h2, h3");
                Array.from(titleElements).map((item) => {
                  item.id = item.innerText;
                });

                let authoreImg =
                  blog?.author?.add_author?.data?.attributes?.author_profile
                    ?.data?.attributes?.url ?? botIcon;
                return (
                  <React.Fragment key={index}>
                    <div className={styles.maintitle} ref={titleRef}>
                      <h1 id={`section-${index}`}>{blog?.title}</h1>
                    </div>
                    <div className={styles.postedDate}>
                      <p>
                        <span>Published on :</span>{" "}
                        {moment(blog?.publishedAt).format("MMM DD YYYY")}
                      </p>
                      <a
                        href={`/authors/${blog?.author?.add_author?.data?.attributes?.slug}`}
                        aria-label="visit-author-details"
                      >
                        {/* <span>Author :</span>{" "} */}
                        <p>
                          <div className={styles.authorPtofile}>
                            <img src={authoreImg} alt="profile" />
                          </div>
                          {blog?.author?.add_author?.data?.attributes
                            ?.author_name ?? "Findmyai"}
                        </p>
                      </a>
                    </div>{" "}
                    <div className={styles.alltextAlignment}>
                      <p
                        dangerouslySetInnerHTML={{
                          __html: marked?.parse(
                            !isEmpty(div?.innerHTML) ? div?.innerHTML : ""
                          ),
                        }}
                      ></p>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>

        <Relatedblogs blogDetail={blogDetail} />
      </div>
    </div>
  );
}
