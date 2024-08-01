import React, { useEffect, useState } from "react";
import styles from "./blogcard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getBlog } from "@/store/ApiSlice/blogSlice";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const CommonPagination = dynamic(
  () => import("../../../shared/components/pagination/CommonPagination"),
  {
    ssr: true,
  }
);
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
const AuthorCard = dynamic(() => import("../../authorpage/authorCard"), {
  ssr: true,
});

export default function Blogcard({
  searchData,
  categorySearch,
  setCategorySearch,
  setSearch,
}) {
  const { getAllBlogCategory } = useSelector((state) => state.blog);
  const [blogData, setBlogData] = useState([]);
  const [loader, setloader] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);
  const [nPages, setNpages] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (router?.query?.search == "") {
      const query = { ...router?.query, page: 1 };
      delete query?.search;
      router?.replace(
        {
          pathname: router?.pathname,
          query: query,
        },
        undefined,
        { shallow: true }
      );
    }
    if (getAllBlogCategory && router?.query?.searchByCategory != undefined) {
      const data = getAllBlogCategory?.find(
        (item) =>
          item?.attributes?.title?.toLowerCase() ==
          router.query.searchByCategory?.toLowerCase()
      )?.attributes?.title;
      if (!data) {
        const query = { ...router?.query, searchByCategory: "All" };
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
      setSearch(router?.query?.search || "");
    }
  }, [
    router?.query?.page,
    router?.query?.search,
    router?.query?.searchByCategory,
    nPages,
  ]);
  useEffect(() => {
    if (currentPage) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      setloader(true);
      dispatch(
        getBlog({
          text: searchData,
          categorytext: categorySearch,
          page: currentPage,
          pageSize: 9,
        })
      )
        .then((resp) => {
          setBlogData(resp?.payload?.blogs?.data);
          setNpages(
            Math.ceil(resp?.payload?.blogs?.meta?.pagination?.pageCount)
          );
          setloader(false);
        })
        .catch((err) => {
          setloader(false);
        });
    }
  }, [searchData, categorySearch, currentPage]);
  return (
    <div className={styles.blogcardAllAlignment}>
      <div className="container">
        {loader ? (
          <div className={styles.grid}>
            {[...Array(9)]?.map((_, index) => (
              <React.Fragment key={index}>
                <AuthorCard loading={loader} />
              </React.Fragment>
            ))}
          </div>
        ) : (
          <>
            {blogData?.length > 0 ? (
              <div className={styles.grid}>
                {blogData?.map((blog, index) => {
                  return (
                    <React.Fragment key={index}>
                      <AuthorCard item={blog} blog={true} />
                    </React.Fragment>
                  );
                })}
              </div>
            ) : (
              <Nodatashow />
            )}
          </>
        )}
      </div>
      {nPages > 1 && (
        <div className={styles.paginationAlignment}>
          <CommonPagination nPages={nPages} {...{ currentPage }} />
        </div>
      )}
    </div>
  );
}
