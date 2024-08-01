import React, { useEffect } from "react";
import styles from "./blogbanner.module.scss";
import Searchbar from "@/module/home/herobanner/searchbar";
import { useDispatch, useSelector } from "react-redux";
import { getBlogCategory } from "@/store/ApiSlice/blogSlice";
import classNames from "classnames";
const BlogerImg = "/assets/images/bloger-img-w.webp";
import Slider from "react-slick";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
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

export default function Blogbanner({
  search,
  handleOnSearch,
  categorySearch,
  setCategorySearch,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { getAllBlogCategory } = useSelector((state) => state.blog);

  const NavSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    nextArrow: getAllBlogCategory?.length > 5 ? <SampleNextArrow /> : <></>,
    prevArrow: getAllBlogCategory?.length > 5 ? <SamplePrevArrow /> : <></>,
    adaptiveHeight: true,
  };
  useEffect(() => {
    dispatch(getBlogCategory());
  }, []);
  const handleSelect = (value) => {
    router?.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          searchByCategory: value ? value : "All",
        },
      },
      undefined,
      { shallow: true }
    );
    setCategorySearch(value);
  };
  return (
    <div className={styles.blogbannerAlignment}>
      <div className="container">
        <div className={styles.line}></div>
        <div className={styles.textSectionAlignment}>
          <div className={styles.textwidth}>
            <h1>Discover New Blog’s Here</h1>

            <p>
              Discover the latest and hottest blogs based on current trends.
            </p>

            <div className={styles.lastContnet}>
              <div className={styles.blogsearch}>
                <Searchbar
                  placeholder="Search blog here..."
                  handleOnSearch={handleOnSearch}
                  search={search}
                  name="search"
                />
              </div>

              <div className={styles.buttonalignment}>
                <Slider {...NavSlider}>
                  <button
                    className={classNames(
                      categorySearch === "" ? styles.active : ""
                    )}
                    onClick={() => {
                      handleSelect("");
                    }}
                    aria-label="all"
                  >
                    All
                  </button>
                  {getAllBlogCategory?.map((item, index) => {
                    const category = item?.attributes?.title;

                    return (
                      <button
                        className={classNames(
                          categorySearch === category ? styles.active : ""
                        )}
                        key={index}
                        onClick={() => {
                          handleSelect(category);
                        }}
                        aria-label={category}
                      >
                        {category}
                      </button>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
          <div className={styles.imgwidth}>
            <div className={styles.bannerRightImg}>
              <img src={BlogerImg} alt="BlogerImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
