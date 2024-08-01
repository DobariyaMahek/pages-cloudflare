import React, { useEffect, useState, lazy, Suspense } from "react";
import styles from "./home.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
const Herobanner = lazy(() => import("./herobanner"));
const CompanyImage = lazy(() => import("./companyImage"));
const CardSection = lazy(() => import("./cardSection"));
const Trendingaishortsvideo = lazy(() => import("./trendingaishortsvideo"));
const Toolssection = lazy(() => import("./toolssection"));
const CategoriesTools = lazy(() => import("./categoriesTools"));
const ExploreGptTools = lazy(() => import("./exploregptTools"));
const Testimonial = lazy(() => import("./testimonial"));
const Blog = lazy(() => import("./blog"));
const Faqsection = lazy(() => import("./faqsection"));
import { getHomePageAllDetails } from "@/store/ApiSlice/aiToolsSlice";
export default function Homeindex({ seoData }) {
  const [loading, setLoading] = useState(true);
  const [categoryToolsDetails, setCategoryToolsDetails] = useState({});
  const dispatch = useDispatch();
  const ismobile = window.innerWidth;
  useEffect(() => {
    dispatch(setCurrentPage(1));
    dispatch(getHomePageAllDetails())
      .then((respon) => {
        setCategoryToolsDetails(respon?.payload?.payload);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div className={styles.homePageAlignment}>
      <Suspense fallback={<div>Loading...</div>}>
        <Herobanner />
        <CompanyImage />
        <CardSection {...{ categoryToolsDetails }} />
        {ismobile > 600 && <Trendingaishortsvideo {...{ categoryToolsDetails }} loading={loading} />}
        <Toolssection {...{ categoryToolsDetails }} loading={loading} />
        <CategoriesTools {...{ categoryToolsDetails }} loading={loading} />
        <ExploreGptTools {...{ categoryToolsDetails }} loading={loading} />
        <Testimonial />
        <Blog />
        <Faqsection />
      </Suspense>
    </div>
  );
}
