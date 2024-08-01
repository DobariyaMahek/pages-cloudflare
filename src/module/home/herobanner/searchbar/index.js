import React, { useEffect, useRef, useState } from "react";
import styles from "./searchbar.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTools } from "@/store/ApiSlice/aiToolsSlice";
import { usePathname } from "next/navigation";
import SearchIcon from "@/assets/icons/SearchIcon";
import { isEmpty } from "@/helpers/common";
import Link from "next/link";

export default function Searchbar({
  placeholder,
  search,
  handleOnSearch,
  handleSearchClick,
}) {
  const { getAllAiToolsName } = useSelector((state) => state.aiTools);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const dropdownContainerRef = useRef();
  const ref = useRef();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const isMobile = typeof window && window.innerWidth > 600;
  useEffect(() => {
    if (getAllAiToolsName?.length > 0) {
      setDropdownVisible(true);
    }

    if (isMobile) {
      ref.current.focus();
    }
  }, [getAllAiToolsName]);
  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        name="search"
        placeholder={placeholder}
        onChange={handleOnSearch}
        value={search}
        ref={ref}
        autoComplete="off"
        id="searchInput"
      />
      <div
        className={styles.searchIcon}
        onClick={() => {
          ref.current.focus();
          !isEmpty(search) ? handleSearchClick(search) : {};
        }}
      >
        <SearchIcon />
      </div>
      {search &&
        pathname === "/" &&
        getAllAiToolsName?.length > 0 &&
        dropdownVisible && (
          <div
            className={styles.searchbarDropdownDesign}
            ref={dropdownContainerRef}
          >
            <div className={styles.spacer}>
              {getAllAiToolsName?.length === 0 ? (
                <span className={styles.notFoundMessage}>No Results Found</span>
              ) : (
                getAllAiToolsName?.map((item, i) => (
                  <Link prefetch={false} href={`/tool/${item?.slugId}`} key={i}>
                    <span
                      onClick={() => {
                        dispatch(setSearchTools(item?.title));
                      }}
                    >
                      {item?.title}
                    </span>
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
    </div>
  );
}
