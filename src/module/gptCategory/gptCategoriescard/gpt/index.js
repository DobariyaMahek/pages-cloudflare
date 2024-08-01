import React, { useEffect, useRef, useState } from "react";
import styles from "../../../gptStore/featuredGPT/featuredGPT.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { GetGpt } from "@/store/ApiSlice/gptSlice";
import classNames from "classnames";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Nodatashow = dynamic(
  () => import("../../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
const GptStoreCard = dynamic(() => import("../../../gptStore/gptStoreCard"), {
  ssr: true,
});
const CommonPagination = dynamic(
  () => import("../../../../shared/components/pagination/CommonPagination"),
  {
    ssr: true,
  }
);
export default function Gpt({
  nPages,
  setCurrentPage,
  currentPage,
  debouncedSearch,
  setSearch,
  search,
}) {
  const { GetGptData, gptLoading, GptCount } = useSelector(
    (state) => state.gpt
  );
  const [loader, setLoader] = useState(false);
  const pathname = usePathname();
  const lastPathname = pathname?.substring(pathname?.lastIndexOf("/") + 1);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const componentRef = useRef(null);
  const router = useRouter();
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
  }, [router?.query?.page, router?.query?.search]);

  useEffect(() => {
    const condition = router?.query?.search
      ? router?.query?.search == debouncedSearch
      : true;
    setLoader(true);
    if (currentPage && condition) {
      dispatch(
        GetGpt({
          page: currentPage || 1,
          limit: 12,
          status: "approved",
          category: lastPathname?.split("--")?.join(" "),
          selectedData: true,
          isRandom: false,
          search: debouncedSearch,
        })
      );
      if (!isFirstRender?.current) {
        componentRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        isFirstRender.current = false;
      }
      setLoader(false);
    }
  }, [currentPage, debouncedSearch, lastPathname]);

  return (
    <>
      <div ref={componentRef} className={styles.scrollTopAlignment}>
        {" "}
      </div>
      <div
        className={classNames(styles.spacerRemove, styles.featuredGptSection)}
      >
        <div className="container">
          <div className={styles.featuredGptBodyAlignment}>
            <div>
              {gptLoading || loader ? (
                <div className={styles.featuredGptGrid}>
                  {[...Array(12)]?.map((_, index) => {
                    return (
                      <div
                        className={styles.browserAllCardGridItem}
                        key={index}
                      >
                        <GptStoreCard loading={gptLoading || loader} />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <>
                  {GetGptData?.length > 0 ? (
                    <div className={styles.featuredGptGrid}>
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
        </div>
      </div>
      <div className={styles.paginationTopAlignment}>
        {GptCount > 12 && (
          <CommonPagination nPages={nPages} {...{ currentPage }} />
        )}
      </div>
    </>
  );
}
