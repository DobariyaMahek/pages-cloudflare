import React, { useEffect, useState } from "react";
import styles from "./blog.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getBlogForHomePage } from "@/store/ApiSlice/blogSlice";
import AuthorCard from "@/module/authorpage/authorCard";
import ViewAll from "@/shared/components/viewAll";


export default function Blog() {
  const dispatch = useDispatch();
  const [blogLoading, setBlogLoading] = useState(false);
  const [allhomeblog,setAllHomeBlog]=useState([])
  useEffect(() => {
    setBlogLoading(true);
    dispatch(getBlogForHomePage({}))
      .then((res) => {
        setAllHomeBlog(res?.payload?.blogs?.data)
        setBlogLoading(false);

      })
      .catch((err) => {
        setBlogLoading(false);
      });
  }, []);
  return (
    <div className={styles.blogAllAlignment}>
      <div className="container">
        <div className={styles.headerAlignment}>
          <div className={styles.title}>
            <div>
              <h2>Blogs</h2>
              <p>
                Explore AI's wonders, learn, and stay updated with our
                insightful AI blogs.
              </p>
            </div>
          </div>
          <div className={styles.webViewAll}>
            <Link prefetch={false} href="/blog">
              <ViewAll />
            </Link>
          </div>
        </div>
        {blogLoading ? (
          <div className={styles.grid}>
            {[...Array(3)]?.map((_, index) => (
              <React.Fragment key={index}>
                <AuthorCard loading={blogLoading} />
              </React.Fragment>
            ))}
          </div>
        ) :(
          <div className={styles.grid}>
            {allhomeblog?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <AuthorCard item={item} loading={blogLoading} />
                </React.Fragment>
              );
            })}
          </div>
        )}

        <div className={styles.mobileViewAll}>
          <Link prefetch={false} href="/blog">
            <ViewAll />
          </Link>
        </div>
      </div>
    </div>
  );
}
