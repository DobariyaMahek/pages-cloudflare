import React, { useEffect, useRef, useState } from "react";
import styles from "./bookmarkedcard.module.scss";
import { Id, getBookMark } from "@/store/ApiSlice/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import Link from "next/link";
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
const Carddesign = dynamic(() => import("../../home/cardSection/carddesign"), {
  ssr: true,
});
export default function Bookmarkedcard() {
  const { getBookMarkData, BookMarkCount } = useSelector(
    (state) => state.bookmark
  );
  const [currentPage, setCurrentPage] = useState(null);
  const [loading, setLoading] = useState(true);
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
          type: `aiTool`,
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
    <div
      className={styles.bookmarkedcardAllContnetAlignment}
      ref={componentRef}
    >
      <div className="container">
        {loading ? (
          <div className={classNames(styles.fourGrid)}>
            {[...Array(12)]?.map((_, index) => (
              <React.Fragment key={index}>
                <Carddesign loading={loading} />
              </React.Fragment>
            ))}
          </div>
        ) : getBookMarkData?.length > 0 ? (
          <div className={classNames(styles.fourGrid)}>
            {getBookMarkData?.map((aiTool, index) => {
              return (
                <Link
                  prefetch={false}
                  href={`/tool/${aiTool?.aiTool?.slugId}`}
                  key={index}
                >
                  <Carddesign
                    images={aiTool?.aiTool?.thumbnail}
                    name={aiTool?.aiTool?.title}
                    description={aiTool?.aiTool?.aiToolSubCategoryId?.name}
                    icon={aiTool?.aiTool?.icon}
                    loading={loading}
                    item={aiTool?.aiTool}
                  />
                </Link>
              );
            })}{" "}
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
  );
}
