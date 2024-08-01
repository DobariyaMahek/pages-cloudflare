import React, { useEffect, useState } from "react";
import styles from "./filtermodal.module.scss";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FeaturesDataArray, PricingDataArray } from "@/helpers/constant";
import LazyImage from "@/helpers/lazyImage";

const CloseIcon = "/assets/icons/close-white.webp";

export default function Filtermodal(props) {
  const {
    setFilterModal,
    setFilterData,
    filterData,
    setCloseModal,
    setShouldCallApi,
  } = props;
  const [isFilterEmpty, setIsFilterEmpty] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const isEmpty =
      filterData?.pricing?.length === 0 && filterData?.features?.length === 0;
    setIsFilterEmpty(isEmpty);
  }, [filterData]);

  const handlePricingCheckboxChange = (e) => {
    const value = e.target.value;
    let pricingInfo;
    if (filterData?.pricing?.includes(value)) {
      pricingInfo = filterData?.pricing?.filter((item) => item !== value);
    } else {
      pricingInfo = [...filterData?.pricing, value];
    }
    setFilterData({
      ...filterData,
      pricing: pricingInfo,
    });
  };

  const handleFeaturesCheckboxChange = (e) => {
    const value = e?.target?.value;
    let newData;
    if (filterData?.features?.includes(value)) {
      newData = {
        ...filterData,
        features: filterData?.features?.filter(
          (item) => item?.toLowerCase() !== value?.toLowerCase()
        ),
      };
    } else {
      newData = {
        ...filterData,
        features: [...filterData?.features, value],
      };
    }
    setFilterData(newData);
  };

  const clearFilters = () => {
    setFilterData({ pricing: [], features: [] });
    setFilterModal(false);
    setCloseModal(false);
    dispatch(setCurrentPage(1));
    setShouldCallApi(true);
    const query = { ...router?.query, page: 1 };
    delete query.pricing;
    delete query.features;

    router?.replace(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  };

const applyFilters = () => {
  setFilterModal(false);
  setCloseModal(false);
  dispatch(setCurrentPage(1));
  setShouldCallApi(true);
  const query = { ...router.query, page: 1 };

  if (filterData?.pricing?.length && Array.isArray(filterData?.pricing)) {
    query.pricing = filterData?.pricing.join(",");
  } else {
    delete query.pricing;
  }

  if (filterData?.features?.length && Array.isArray(filterData?.features)) {
    query.features = filterData?.features.join(",");
  } else {
    delete query.features;
  }
  router.replace(
    {
      pathname: router.pathname,
      query: query,
    },
    undefined,
    { shallow: true }
  );
};



const handleonModalClose = () => {
  setCloseModal(true);
  setFilterModal(false);

  const parseQueryParam = (param) => {
    return typeof param === "string" ? param.split(",") : param || [];
  };

  setFilterData({
    ...filterData,
    pricing: parseQueryParam(router?.query?.pricing),
    features: parseQueryParam(router?.query?.features),
  });
};


  return (
    <div className={styles.filtermodalwrapper}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h6>
            <span>Select Filters</span> to Apply
          </h6>
          <div
            className={styles.closeIcon}
            onClick={() => {
              handleonModalClose();
            }}
          >
            <LazyImage
              image={{
                src: CloseIcon,
                alt: "CloseIcon",
              }}
            />
            {/* <img loading="lazy" src={CloseIcon} alt="CloseIcon" /> */}
          </div>
        </div>
        <div className={styles.modalbody}>
          <div className={styles.grid}>
            <div className={styles.griditems}>
              <h5>Pricing</h5>
              <div className={styles.allCheckboxContentAlignment}>
                {PricingDataArray?.map((item, i) => (
                  <div className={styles.checkboxText} key={i}>
                    <div className={styles.leftContent}>
                      <input
                        type="checkbox"
                        id={item?.name}
                        value={item?.name}
                        onChange={handlePricingCheckboxChange}
                        checked={filterData?.pricing?.includes(item?.name)}
                      />
                      <label htmlFor={item?.name}></label>
                    </div>
                    <div className={styles.rightContent}>
                      <label
                        htmlFor={item?.name}
                        className={styles.rightContentflex}
                      >
                        <img loading="lazy" src={item?.img} alt="FreeIcon" />
                        <span>{item?.name}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.griditems}>
              <h5>Features</h5>
              <div className={styles.allCheckboxContentAlignment}>
                {FeaturesDataArray?.map((item, i) => (
                  <div className={styles.checkboxText} key={i}>
                    <div className={styles.leftContent}>
                      <input
                        type="checkbox"
                        id={item?.name}
                        value={item?.name}
                        onChange={handleFeaturesCheckboxChange}
                        checked={filterData?.features?.includes(item?.name)}
                      />
                      <label htmlFor={item?.name}></label>
                    </div>
                    <div className={styles.rightContent}>
                      <label
                        htmlFor={item?.name}
                        className={styles.rightContentflex}
                      >
                        <img
                          loading="lazy"
                          src={item?.img}
                          alt="BrowserIcon"
                        />
                        <span>{item?.name}</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button
            onClick={clearFilters}
            aria-label="Clear"
          >
            Clear
          </button>
          <button
            onClick={applyFilters}
            aria-label="Apply Filter"
          >
            Apply Filter
          </button>
        </div>
      </div>
    </div>
  );
}
