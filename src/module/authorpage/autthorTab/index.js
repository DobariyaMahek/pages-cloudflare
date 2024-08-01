import React, { useEffect, useState } from "react";
import styles from "./autthorTab.module.scss";
import classNames from "classnames";
import { getBlogCategory } from "@/store/ApiSlice/blogSlice";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import Slider from "react-slick";
import { useRouter } from "next/router";
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className={styles.rightArrowDesign} onClick={onClick}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.9" clipPath="url(#clip0_379_2664)">
          <path
            d="M6.30693 10.7032L0.287338 4.68338C-0.0957785 4.30045 -0.0957785 3.67959 0.287338 3.29685C0.670114 2.91407 1.29094 2.91407 1.67368 3.29685L7.0001 8.62342L12.3263 3.297C12.7093 2.91423 13.33 2.91423 13.7128 3.297C14.0957 3.67978 14.0957 4.3006 13.7128 4.68353L7.69312 10.7033C7.50164 10.8947 7.25095 10.9903 7.00013 10.9903C6.74919 10.9903 6.49832 10.8945 6.30693 10.7032Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_379_2664">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(14) rotate(90)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={styles.leftArrowDesign} onClick={onClick}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.9" clipPath="url(#clip0_379_2664)">
          <path
            d="M6.30693 10.7032L0.287338 4.68338C-0.0957785 4.30045 -0.0957785 3.67959 0.287338 3.29685C0.670114 2.91407 1.29094 2.91407 1.67368 3.29685L7.0001 8.62342L12.3263 3.297C12.7093 2.91423 13.33 2.91423 13.7128 3.297C14.0957 3.67978 14.0957 4.3006 13.7128 4.68353L7.69312 10.7033C7.50164 10.8947 7.25095 10.9903 7.00013 10.9903C6.74919 10.9903 6.49832 10.8945 6.30693 10.7032Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_379_2664">
            <rect
              width="14"
              height="14"
              fill="white"
              transform="translate(14) rotate(90)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

export default function AutthorTab({ setCategorySearch, categorySearch }) {
  const dispatch = useDispatch();
  const [categoryLoad, setCategoryLoad] = useState(true);
  const router = useRouter();
  const { getAllBlogCategory } = useSelector((state) => state.blog);
  const NavSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: getAllBlogCategory?.length > 10 ? <SampleNextArrow /> : <></>,
    prevArrow: getAllBlogCategory?.length > 10 ? <SamplePrevArrow /> : <></>,
    adaptiveHeight: true,
  };

  useEffect(() => {
    dispatch(getBlogCategory())
      .then((res) => {
        setCategoryLoad(false);
      })
      .catch((err) => {
        setCategoryLoad(false);
      });
  }, []);
  const handleSearch = (value) => {
    const query = { ...router.query, searchByCategory: value || "All" };
    router?.replace(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
    setCategorySearch(value);
  };
  return (
    <div className={styles.autthorTabSection}>
      {categoryLoad ? (
        <div className={styles.skeletonflex}>
          {[...Array(5)]?.map((_, index) => (
            <React.Fragment key={index}>
              <Skeleton baseColor="#232147" className={styles.filterBox} />
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div className={styles.autthorTabFlexAlignment}>
          <Slider {...NavSlider}>
            <div
              className={classNames(
                styles.tabBoxAlignment,
                categorySearch === "" ? styles.authorActiveTab : ""
              )}
              onClick={() => handleSearch('')}
              aria-label=""
            >
              <p>All</p>
            </div>
            {getAllBlogCategory?.map((item, i) => {
              const category = item?.attributes?.title;

              return (
                <button
                  className={classNames(
                    styles.tabBoxAlignment,
                    categorySearch === category ? styles.authorActiveTab : ""
                  )}
                  onClick={() => handleSearch(category)}
                  aria-label={category}
                  key={i}
                >
                  {category}
                </button>
              );
            })}
          </Slider>
        </div>
      )}
    </div>
  );
}
