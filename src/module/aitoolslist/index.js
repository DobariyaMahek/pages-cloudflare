import { useSelector } from "react-redux";
import useDebounce from "@/hook/useDebounce";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Aitoolslist = dynamic(() => import("../subCategoryDetails/aitoolslist"), {
  ssr: true,
});
const CategoryBanner = dynamic(
  () => import("../subCategoryDetails/categoryBanner"),
  {
    ssr: true,
  }
);
export default function Aitoolslistindex() {
  const { count, searchTools, getRandomIcon } = useSelector(
    (state) => state.aiTools
  );
  const [currentPage, setCurrentPage] = useState(null);
  const [search, setSearch] = useState(searchTools || "");
  const debouncedSearch = useDebounce(search, 1000);
  const nPages = Math?.ceil(count / 12);
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
    const query = { ...router.query, page: 1 };
    if (searchTools) {
      query.search = searchTools;
      router.replace(
        {
          pathname: router.pathname,
          query: query,
        },
        undefined,
        { shallow: true }
      );
    }
  }, [searchTools]);
  return (
    <div>
      {/* <Aitoolslistbanner handleOnSearch={handleOnSearch} search={search} /> */}
      <CategoryBanner
        handleOnSearch={handleOnSearch}
        search={search}
        handleSearchClick={() => {}}
        isSearch={true}
        placeholder={"Type to search for over 1500+ tools..."}
        heading={
          <>
            <h1>Browse All 1500+ AI Tools</h1>
            <p>
              Unlock limitless possibilities with Browse AI Tools - Your gateway
              to the world of artificial intelligence.
            </p>
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
