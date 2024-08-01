import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/hook/useDebounce";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const BrowserAllGptsCard = dynamic(() => import("./browserAllGptsCard"), {
  ssr: true,
});
const BrowseAllGPTsBanner = dynamic(() => import("./browseAllGPTsBanner"), {
  ssr: true,
});
export default function BrowseAllGPTs() {
  const { searchGpts } = useSelector((state) => state.gpt);
  const [currentPage, setCurrentPage] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [search, setSearch] = useState(searchGpts || "");
  const debouncedSearch = useDebounce(search, 500);
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
  useEffect(() => {
    const query = { ...router.query, page: 1 };
    if (searchGpts) {
      query.search = searchGpts;
      router.replace(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [searchGpts]);

  return (
    <div>
      <BrowseAllGPTsBanner handleOnSearch={handleOnSearch} search={search} />
      <BrowserAllGptsCard
        {...{ debouncedSearch, currentPage, setCurrentPage, setSearch }}
      />
    </div>
  );
}
