import React, { useEffect, useRef, useState } from "react";
import styles from "./aitoolslist.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { FeaturesDataArray, PricingDataArray } from "@/helpers/constant";
import dynamic from "next/dynamic";
const CommonPagination = dynamic(
  () => import("../../../shared/components/pagination/CommonPagination"),
  {
    ssr: true,
  }
);
const Filtermodal = dynamic(
  () => import("../../../shared/components/filtermodal"),
  {
    ssr: true,
  }
);
const Filter = dynamic(() => import("../../../shared/components/filter"), {
  ssr: true,
});
const Toolsdropdown = dynamic(
  () => import("../../../shared/components/toolsdropdown"),
  {
    ssr: true,
  }
);
const Carddesign = dynamic(() => import("../../home/cardSection/carddesign"), {
  ssr: true,
});
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);

export default function Aitoolslist({
  nPages,
  debouncedSearch,
  currentPage,
  setCurrentPage,
  setSearch,
}) {
  let duration = 100;
  const { getAllAiTools, loading, count, searchTools } = useSelector(
    (state) => state.aiTools
  );

  const pathname = usePathname();
  const lastPathname = pathname?.substring(pathname.lastIndexOf("/") + 1);
  const [filterData, setFilterData] = useState({ pricing: [], features: [] });
  const [filterModal, setFilterModal] = useState(false);
  const [CloseModal, setCloseModal] = useState(false);
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const [shouldCallApi, setShouldCallApi] = useState(false);
  const isFirstRender = useRef(true);
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  const parseQueryParam = (param) => {
    return typeof param === "string" ? param.split(",") : param || [];
  };
  const getMatchedNames = (queryArray, dataArray) => {
    return queryArray
      ?.map(
        (queryItem) =>
          dataArray?.find(
            (data) => data?.name?.toLowerCase() === queryItem?.toLowerCase()
          )?.name
      )
      .filter(Boolean);
  };
  const featuresQueryArray = parseQueryParam(router?.query?.features);
  const pricingQueryArray = parseQueryParam(router?.query?.pricing);
  const validFeatures = getMatchedNames(featuresQueryArray, FeaturesDataArray);
  const validPricing = getMatchedNames(pricingQueryArray, PricingDataArray);
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
    setFilterData({
      ...filterData,
      pricing: validPricing || [],
      features: validFeatures || [],
    });

    if (router?.query?.tag) {
      setTag(router?.query?.tag);
    }
  }, [
    router?.query?.page,
    router?.query?.search,
    router?.query?.pricing,
    router?.query?.features,
    router?.query?.tag,
  ]);
  useEffect(() => {
    const condition = router?.query?.search
      ? router?.query?.search == debouncedSearch
      : true;
    shouldCallApi && setLoader(true);
    if (currentPage && condition && shouldCallApi) {
      dispatch(
        getAiTools({
          page: currentPage,
          limit: 12,
          status: "approved",
          pricing: filterData?.pricing,
          features: filterData?.features,
          ...(tag?.toLowerCase() === "popular" && { isPopular: true }),
          ...(tag?.toLowerCase() == "verified" && { isVerified: true }),
          ...(pathname?.includes("/category") && {
            aiToolSubCategory: lastPathname,
          }),
          ...(pathname === "/popular-tools" && { isPopular: true }),
          selectedData: true,
          search: debouncedSearch || "",
        })
      ).then((res) => setCloseModal(false));
      setShouldCallApi(false);
      if (!isFirstRender.current) {
        componentRef?.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      } else {
        isFirstRender.current = false;
      }
      setLoader(false);
    }
  }, [
    currentPage,
    filterModal,
    filterData,
    tag,
    lastPathname,
    debouncedSearch,
    shouldCallApi,
  ]);
  useEffect(() => {
    if (currentPage) {
      setShouldCallApi(true);
    }
  }, [currentPage, tag, lastPathname, debouncedSearch]);
  const handleOnClick = () => {
    setFilterModal(!filterModal);
    setShouldCallApi(false);
  };
  const disableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
    }
  };
  const enableBodyScroll = () => {
    const body = document.body;
    if (body) {
      body.style.overflow = "auto";
    }
  };
  useEffect(() => {
    if (filterModal) {
      disableBodyScroll();
    } else {
      enableBodyScroll();
    }
  }, [filterModal]);
  const componentRef = useRef(null);
  return (
    <>
      <div ref={componentRef} className={styles.aitoolslistAllContnetAlignment}>
        <div className="container">
          {filterModal && (
            <Filtermodal
              filterModal={filterModal}
              setFilterModal={setFilterModal}
              setFilterData={setFilterData}
              filterData={filterData}
              setCloseModal={setCloseModal}
              {...{ setShouldCallApi }}
            />
          )}
          <div className={styles.aitoolslistHeaderAlignment}>
            <Filter onClick={handleOnClick} {...{ filterData }} />
            <Toolsdropdown
              setTag={setTag}
              setCloseModal={setCloseModal}
              {...{ tag }}
            />
          </div>
          <div>
            {loading || loader ? (
              <div className={styles.grid}>
                {[...Array(12)].map((_, index) => (
                  <React.Fragment key={index}>
                    <Carddesign loading={loading || loader} />
                  </React.Fragment>
                ))}
              </div>
            ) : (
              <>
                {getAllAiTools && getAllAiTools?.length > 0 ? (
                  <div className={styles.grid}>
                    {getAllAiTools?.slice(0, 12)?.map((aiTool, index) => {
                      duration = duration + (index ? 200 : 0);

                      return (
                        <Link
                          prefetch={false}
                          href={
                            !loading && !loader
                              ? `/tool/${aiTool?.slugId}`
                              : "#"
                          }
                          key={index}
                        >
                          <Carddesign
                            images={aiTool?.thumbnail}
                            name={aiTool?.title}
                            description={aiTool?.aiToolSubCategoryId?.name}
                            icon={aiTool?.icon}
                            isFeatured={aiTool?.isFeatured}
                            item={aiTool}
                          />
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <Nodatashow />
                )}
              </>
            )}
          </div>
          <div className={styles.paginationAlignment}>
            {count > 12 && getAllAiTools?.length > 0 && (
              <CommonPagination nPages={nPages} {...{ currentPage }} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
