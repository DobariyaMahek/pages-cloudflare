import React, { useEffect, useRef, useState } from "react";
import styles from "../bookmarked/bookmarkedcard/bookmarkedcard.module.scss";
import { Id, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import CommonPagination from "@/shared/components/pagination/CommonPagination";
import dynamic from "next/dynamic";
const Nodatashow = dynamic(() => import("../../shared/components/nodatashow"), {
  ssr: true,
});
const Bookmarkedbanner = dynamic(
  () => import("../bookmarked/bookmarkedbanner"),
  {
    ssr: true,
  }
);
const GptStoreCard = dynamic(() => import("../gptStore/gptStoreCard"), {
  ssr: true,
});
export default function GptBookmark() {
  let duration = 100;
  const { getBookMarkData, BookMarkCount } = useSelector(
    (state) => state.bookmark
  );
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);
  const nPages = Math.ceil(BookMarkCount / 12);
  const componentRef = useRef(null);
  const isFirstRender = useRef(true);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
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
  }, [router?.query?.page, nPages]);
  useEffect(() => {
    setLoading(true);
    if (currentPage) {
      dispatch(
        getBookMark({
          page: currentPage,
          limit: 12,
          type: `app`,
          uid: Id,
        })
      )
        .then((res) => {
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
      if (!isFirstRender.current) {
        componentRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        isFirstRender.current = false;
      }
    }
  }, [currentPage]);

  return (
    <>
      <Bookmarkedbanner />
      <div
        className={styles.bookmarkedcardAllContnetAlignment}
        ref={componentRef}
      >
        <div className="container" ref={componentRef}>
          {loading ? (
            <div className={styles.grid}>
              {[...Array(12)]?.map((_, index) => {
                return (
                  <React.Fragment key={index}>
                    <GptStoreCard loading={loading} />
                  </React.Fragment>
                );
              })}
            </div>
          ) : getBookMarkData?.length > 0 ? (
            <div className={styles.grid}>
              {getBookMarkData?.map((gptdata, index) => {
                return (
                  <React.Fragment key={index}>
                    <GptStoreCard item={gptdata?.app} />
                  </React.Fragment>
                );
              })}
            </div>
          ) : (
            <Nodatashow />
          )}
        </div>
        {BookMarkCount > 12 && (
          <div className={styles.bookmarkPaginationTopAlignment}>
            <CommonPagination nPages={nPages} currentPage={currentPage} />{" "}
          </div>
        )}
      </div>
    </>
  );
}
