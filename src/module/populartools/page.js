import React, { useEffect, useRef, useState } from "react";
import styles from "../subCategoryDetails/aitoolslist/aitoolslist.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import { FeaturesDataArray, PricingDataArray } from "@/helpers/constant";
import dynamic from "next/dynamic";
const CategoryBanner = dynamic(
  () => import("../subCategoryDetails/categoryBanner"),
  {
    ssr: true,
  }
);
const CommonPagination = dynamic(
  () => import("../../shared/components/pagination/CommonPagination"),
  {
    ssr: true,
  }
);
const Nodatashow = dynamic(() => import("../../shared/components/nodatashow"), {
  ssr: true,
});
const Filtermodal = dynamic(
  () => import("../../shared/components/filtermodal"),
  {
    ssr: true,
  }
);
const Carddesign = dynamic(() => import("../home/cardSection/carddesign"), {
  ssr: true,
});
const Toolsdropdown = dynamic(
  () => import("../../shared/components/toolsdropdown"),
  {
    ssr: true,
  }
);
const Filter = dynamic(() => import("../../shared/components/filter"), {
  ssr: true,
});
export default function PopularTools() {
  let duration = 100;
  const { getAllAiTools, loading, count, getRandomIcon } = useSelector(
    (state) => state.aiTools
  );
  const [CloseModal, setCloseModal] = useState(false);
  const nPages = Math.ceil(count / 12);
  const [filterModal, setFilterModal] = useState(false);
  const [tag, setTag] = useState("");
  const [filterData, setFilterData] = useState({ pricing: [], features: [] });
  const dispatch = useDispatch();
  const [shouldCallApi, setShouldCallApi] = useState(true);
  const [currentPage, setCurrentPage] = useState(null);

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
  const componentRef = useRef(null);
  const validPricing = getMatchedNames(pricingQueryArray, PricingDataArray);
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
    router?.query?.pricing,
    router?.query?.features,
    router?.query?.tag,
  ]);
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

  const isFirstRender = useRef(true);

  useEffect(() => {
    shouldCallApi && setLoader(true);
    if (currentPage && shouldCallApi) {
      dispatch(
        getAiTools({
          page: currentPage,
          limit: 12,
          status: "approved",
          ...(tag === "Popular" && { isPopular: true }),
          ...(tag == "Verified" && { isVerified: true }),
          pricing: filterData.pricing,
          features: filterData.features,
          selectedData: true,
        })
      );
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
  }, [currentPage, filterModal, filterData, tag, shouldCallApi]);

  const handleOnClick = () => {
    setFilterModal(!filterModal);
    setShouldCallApi(false);
  };
  useEffect(() => {
    setShouldCallApi(true);
  }, [currentPage, tag]);
  return (
    <>
      <CategoryBanner
        isSearch={false}
        placeholder={"Type to search for over 1500+ tools..."}
        isTool={true}
        heading={
          <>
            <h1>Popular AI Tools</h1>
            <p>
              Explore the most popular AI tools revolutionizing technology and
              driving innovation across industries.
            </p>
          </>
        }
        getRandomIcon={getRandomIcon}
      />

      <div className={styles.aitoolslistAllContnetAlignment} ref={componentRef}>
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

        <div className="container">
          <div className={styles.aitoolslistHeaderAlignment}>
            <Filter onClick={handleOnClick} {...{ filterData }} />
            <Toolsdropdown
              setTag={setTag}
              setCloseModal={setCloseModal}
              {...{ tag }}
            />
          </div>

          <div>
            {loading ? (
              <div className={styles.grid}>
                {[...Array(12)]?.map((_, index) => (
                  <React.Fragment key={index}>
                    <Carddesign loading={loading} />
                  </React.Fragment>
                ))}
              </div>
            ) : getAllAiTools && getAllAiTools?.length > 0 ? (
              <>
                <div className={styles.grid}>
                  {getAllAiTools.map((aiTool, index) => {
                    duration = duration + (index ? 200 : 0);
                    return (
                      <Link
                        prefetch={false}
                        href={`/tool/${aiTool?.slugId}`}
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
                {count > 12 && (
                  <CommonPagination nPages={nPages} {...{ currentPage }} />
                )}
              </>
            ) : (
              <Nodatashow />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
