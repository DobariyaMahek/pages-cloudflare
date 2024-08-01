import React, { useEffect, useState } from "react";
import styles from "./relatedblogs.module.scss";
import Skeleton from "react-loading-skeleton";
import { getBlogForHomePage } from "@/store/ApiSlice/blogSlice";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
const AuthorCard = dynamic(() => import("../../../authorpage/authorCard"), {
  ssr: true,
});
export default function Relatedblogs({ blogDetail }) {
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogDetail?.blog_categories?.data[0]?.attributes?.title) {
      dispatch(
        getBlogForHomePage({
          categorytext: blogDetail?.blog_categories?.data[0]?.attributes?.title, // Filter by category
          slug: blogDetail?.slug,
        })
      )
        .then((resp) => {
          setBlogData(resp?.payload?.blogs?.data);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [blogDetail]);

  return (
    <>
      <div className={styles.relatedblogs}>
        {loading ? (
          <Skeleton className={styles.reletesSkeleton} baseColor="#232147" />
        ) : (
          <h2>Related blog’s</h2>
        )}
        <div className="">
          {loading ? (
            <div className={styles.grid}>
              {[...Array(3)]?.map((_, index) => (
                <React.Fragment key={index}>
                  <AuthorCard loading={loading} />
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className={styles.grid}>
              {blogData?.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <AuthorCard item={item} loading={loading} />
                  </React.Fragment>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
