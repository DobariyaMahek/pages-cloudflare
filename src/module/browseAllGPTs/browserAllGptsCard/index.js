import React, { useEffect, useRef, useState } from "react";
import styles from "./browserAllGptsCard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const CommonPagination = dynamic(() => import("../../../shared/components/pagination/CommonPagination"), {
  ssr: true,
});
const Nodatashow = dynamic(() => import("../../../shared/components/nodatashow"), {
  ssr: true,
});
const GptStoreCard = dynamic(() => import("../../gptStore/gptStoreCard"), {
  ssr: true,
});
export default function BrowserAllGptsCard({ debouncedSearch, currentPage, setCurrentPage, setSearch }) {
  const { GetGptData, gptLoading, GptCount } = useSelector((state) => state.gpt);
  const [loading, setLoading] = useState(true);
  const nPages = Math.ceil(GptCount / 12);
  const dispatch = useDispatch();
  const router = useRouter();
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (router?.query?.search == "") {
      const query = { ...router.query };
      delete query.search;
      router?.replace(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        { shallow: true }
      );
    }
    if (router?.query?.page && nPages && parseInt(router?.query?.page) > nPages) {
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
  }, [router?.query?.page, router?.query?.search]);
  useEffect(() => {
    const condition = router?.query?.search ? router?.query?.search == debouncedSearch : true;
    if (currentPage && condition) {
      setLoading(true);
      dispatch(
        GetGpt({
          search: debouncedSearch,
          page: currentPage,
          limit: 12,
          selectedData: true,
        })
      );

      setLoading(false);
      if (!isFirstRender.current) {
        window.scrollTo(0, document.body.clientHeight *0.4 - window.innerHeight * 0.3, "smooth");
      } else {
        isFirstRender.current = false;
      }
    }
  }, [currentPage, debouncedSearch]);
  return (
    <div className={styles.browserAllCardDetailsAlignment}>
      <div className="container-xl">
        <div>
          {gptLoading || loading ? (
            <div className={styles.browserAllCardGrid}>
              {[...Array(12)]?.map((_, i) => {
                return (
                  <div className={styles.browserAllCardGridItem} key={i}>
                    <GptStoreCard loading={gptLoading || loading} />
                  </div>
                );
              })}
            </div>
          ) : (
            <>
              {GetGptData?.length > 0 ? (
                <div className={styles.browserAllCardGrid}>
                  {GetGptData?.map((item, index) => (
                    <React.Fragment key={index}>
                      <GptStoreCard item={item} />
                    </React.Fragment>
                  ))}
                </div>
              ) : (
                <Nodatashow />
              )}
            </>
          )}
        </div>
      </div>
      {GptCount > 12 && (
        <div className={styles.topbrowserPaginationAlignment}>
          <CommonPagination nPages={nPages} {...{ currentPage }} />
        </div>
      )}
    </div>
  );
}
