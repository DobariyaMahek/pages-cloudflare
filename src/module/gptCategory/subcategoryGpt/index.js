import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useDebounce from "@/hook/useDebounce";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const GptBanner = dynamic(() => import("../gptBanner"), {
  ssr: true,
});
const Gpt = dynamic(() => import("../gptCategoriescard/gpt"), {
  ssr: true,
});
export default function SubcategoryGpt({ seoData }) {
  const { GptCount } = useSelector((state) => state.gpt);
  const [search, setSearch] = useState("");
  const [subcategoryData, setSubCatData] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const debouncedSearch = useDebounce(search, 1000);
  const nPages = Math.ceil(GptCount / 12);
  const router = useRouter();

  useEffect(() => {
    setSubCatData(seoData?.seoData);
  }, [seoData]);
  const handleOnSearch = (e) => {
    const value = e?.target?.value?.trimStart();
    setSearch(value);

    const query = { ...router.query, page: 1 };
    if (value) {
      query.search = value;
    } else {
      delete query.search;
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

  return (
    <div>
      <GptBanner
        handleOnSearch={handleOnSearch}
        search={search}
        description={subcategoryData?.Description}
      />
      <Gpt
        nPages={nPages}
        debouncedSearch={debouncedSearch}
        {...{
          setCurrentPage,
          currentPage,
          setSearch,
          search,
        }}
      />
    </div>
  );
}
