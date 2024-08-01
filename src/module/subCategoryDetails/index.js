import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import useDebounce from "@/hook/useDebounce";
import dynamic from "next/dynamic";
const CategoryBanner = dynamic(() => import("./categoryBanner"), {
  ssr: true,
});
const Aitoolslist = dynamic(() => import("./aitoolslist"), {
  ssr: true,
});

export default function SubCategoryDetails({ seoData }) {
  const { count, getAllAiTools, getRandomIcon } = useSelector(
    (state) => state.aiTools
  );
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(null);
  const nPages = Math.ceil(count / 12);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const debouncedSearch = useDebounce(search, 1000);
  const lastPathname = pathname?.substring(pathname.lastIndexOf("/") + 1);
  const [subcategoryData, setSubCatData] = useState("");
  const router = useRouter();
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
    setSubCatData(seoData?.dynamicData);
  }, [seoData]);
  const handleSearchClick = (search) => {
    dispatch(
      getAiTools({
        page: 1,
        limit: 12,
        status: "approved",
        search: search,
        aiToolSubCategory: lastPathname,
        selectedData: true,
      })
    ).then((res) => {});
  };

  return (
    <div>
      <CategoryBanner
        handleOnSearch={handleOnSearch}
        search={search}
        handleSearchClick={handleSearchClick}
        placeholder={"Type to search for over 1500+ tools..."}
        isTool={true}
        isSearch={true}
        heading={
          <>
            <h1>{subcategoryData?.name} AI Tools</h1>
            <p>{subcategoryData?.description}</p>
          </>
        }
        getRandomIcon={getRandomIcon}
      />
      <Aitoolslist
        nPages={nPages}
        {...{ debouncedSearch, currentPage, setCurrentPage, setSearch }}
      />
    </div>
  );
}
