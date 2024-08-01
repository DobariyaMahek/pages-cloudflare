import React, { useEffect, useState } from "react";
import styles from "./authorpage.module.scss";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getAuthoreBlog } from "@/store/ApiSlice/blogSlice";
import dynamic from "next/dynamic";
const AuthorAllDetails = dynamic(() => import("./authorAllDetails"), {
  ssr: true,
});
const AuthorProfileDetails = dynamic(() => import("./authorProfileDetails"), {
  ssr: true,
});
const AutthorTab = dynamic(() => import("./autthorTab"), {
  ssr: true,
});
const RightIcon = "/assets/icons/breadcrumbs -right.webp";

export default function Authorindex({ userData }) {
  const { getAllBlogCategory } = useSelector((state) => state.blog);
  const router = useRouter();
  const dispatch = useDispatch();
  const cleanedPathname = router?.query?.slug;
  const [blogLoading, setBlogLoading] = useState(true);
  const [categorySearch, setCategorySearch] = useState("");
  const [blogData, setBlogData] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const [nPages, setNpages] = useState(null);
  useEffect(() => {
    if (getAllBlogCategory && router?.query?.searchByCategory != undefined) {
      const data = getAllBlogCategory?.find(
        (item) =>
          item?.attributes?.title?.toLowerCase() ==
          router.query.searchByCategory?.toLowerCase()
      )?.attributes?.title;
      if (!data) {
        const query = { ...router.query, searchByCategory: "All" };
        router?.replace(
          {
            pathname: router.pathname,
            query: query,
          },
          undefined,
          { shallow: true }
        );
      }
      setCategorySearch(
        router?.query?.searchByCategory?.toLowerCase() != "all"
          ? data
            ? data
            : ""
          : ""
      );
    }

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
  }, [router?.query?.page, router?.query?.searchByCategory, nPages]);
  useEffect(() => {
    if (cleanedPathname && currentPage) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setBlogLoading(true);
      dispatch(
        getAuthoreBlog({
          categorytext: categorySearch,
          slug: cleanedPathname,
          page: currentPage,
          pageSize: 9,
        })
      )
        .then((resp) => {
          setBlogData(resp?.payload?.blogs?.data);
          setNpages(
            Math.ceil(resp?.payload?.blogs?.meta?.pagination?.pageCount)
          );
          setBlogLoading(false);
        })
        .catch((err) => {
          setBlogLoading(false);
        });
    }
  }, [categorySearch, cleanedPathname, currentPage]);

  return (
    <div className={styles.authorSection}>
      <div className="container">
        <div className={styles.authorBreadcrumbsSection}>
          <div className={styles.authorBreadcrumbsAlignment}>
            <div className={styles.topBarLeft}>
              <a
                href="/"
                className={styles.breadcrumbName}
                aria-label="visit-home"
              >
                Home
                <img loading="lazy" src={RightIcon} alt="RightIcon" />
              </a>

              <a
                href="/authors"
                className={styles.breadcrumbName}
                aria-label="visit-author"
              >
                Authors
                <img loading="lazy" src={RightIcon} alt="RightIcon" />
              </a>

              <p className={styles.breadcrumbName}>{cleanedPathname}</p>
            </div>
          </div>
        </div>

        <AuthorProfileDetails userData={userData} blogLoading={blogLoading} />
        <AutthorTab
          categorySearch={categorySearch}
          setCategorySearch={setCategorySearch}
        />
        <AuthorAllDetails
          blogLoading={blogLoading}
          blogData={blogData}
          nPages={nPages}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}
