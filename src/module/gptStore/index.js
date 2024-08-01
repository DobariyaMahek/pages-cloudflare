import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setScrollGptCategory,
  setSearchGpts,
} from "@/store/ApiSlice/gptSlice";
import dynamic from "next/dynamic";
const GptStoreBanner = dynamic(() => import("./gptStoreBanner"), {
  ssr: true,
});
const GptStoreLogo = dynamic(() => import("./gptStoreLogo"), {
  ssr: true,
});
const FeaturedGPT = dynamic(() => import("./featuredGPT"), {
  ssr: true,
});
const TrendingGPT = dynamic(() => import("./trendingGPT"), {
  ssr: true,
});
const GptFsq = dynamic(() => import("./gptfsq"), {
  ssr: true,
});
export default function GptStore() {
  const { searchGpts } = useSelector((state) => state.gpt);
  const dispatch = useDispatch();

  const handleOnSearch = (e) => {
    const value = e?.target?.value?.trimStart();
    dispatch(setSearchGpts(value));
  };
  useEffect(() => {
    dispatch(setCurrentPage(1));
    dispatch(setSearchGpts(""));
    dispatch(setScrollGptCategory(""));
  }, []);

  return (
    <div>
      <GptStoreBanner handleOnSearch={handleOnSearch} search={searchGpts} />
      <GptStoreLogo />
      <FeaturedGPT />
      <div className="container">
        <TrendingGPT />
      </div>
      <GptFsq />
    </div>
  );
}
