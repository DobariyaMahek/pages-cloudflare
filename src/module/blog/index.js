import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useDebounce from "@/hook/useDebounce";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Blogbanner = dynamic(() => import("./blogbanner"), {
  ssr: true,
});
const Blogcard = dynamic(() => import("./blogcard"), {
  ssr: true,
});
export default function Blogindex() {
  const [search, setSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");
  const searchData = useDebounce(search, 1000);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOnSearch = (e) => {
    setSearch(e?.target?.value?.trimStart());
    router?.replace(
      {
        pathname: router?.pathname,
        query: {
          ...router?.query,
          page: 1,
          search: e?.target?.value?.trimStart(),
        },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, []);

  return (
    <div>
      <Blogbanner
        handleOnSearch={handleOnSearch}
        search={search}
        setSearch={setSearch}
        {...{ categorySearch, setCategorySearch }}
      />
      <Blogcard
        {...{ searchData, categorySearch, setCategorySearch, setSearch }}
      />
    </div>
  );
}
