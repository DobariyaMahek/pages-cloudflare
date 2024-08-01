import React, { useEffect } from "react";
import styles from "./article.module.scss";
import ViewAll from "@/shared/components/viewAll";
import ArticlesAndBlogCard from "../articlesAndBlogCard";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import {  getArticleForHome } from "@/store/ApiSlice/articleSlice";
import Nodatashow from "@/shared/components/nodatashow";

export default function Article() {
  let duration = 100;
  const dispatch = useDispatch();
  const { getAllArtical, ArticleLoading } = useSelector(
    (state) => state.article
  );

  useEffect(() => {
    dispatch(getArticleForHome({}))
  }, []);

  return (
      <div className={styles.articleAlignment}>
        <div className="container">
          <div className={styles.headerAlignment}>
            <div className={styles.title}>
              <div>
                <h2>Articles</h2>
                <p>
                  Discover Insights, Learn, and Stay Updated with Our
                  Easy-to-Read Content
                </p>
              </div>
            </div>
            <div className={styles.webViewAll}>
              <Link prefetch={false}     href="/article">
                <ViewAll />
              </Link>
            </div>
          </div>

        {ArticleLoading ? (
          <div className={styles.grid}>
            {[...Array(3)]?.map((_, index) => (
              <React.Fragment key={index}>
                <ArticlesAndBlogCard loading={ArticleLoading} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <>
            {getAllArtical?.length > 0 ? (
              <div className={styles.grid}>
                {getAllArtical?.slice(0, 3)?.map((item, index) => {
                  duration = duration + (index ? 200 : 0);
                  return (
                    <React.Fragment key={index}>
                      <ArticlesAndBlogCard item={item} path={"article"} />
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <Nodatashow />
            )}

              <div className={styles.mobileViewAll}>
                <Link prefetch={false}     href="/article">
                  <ViewAll />
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
  );
}
