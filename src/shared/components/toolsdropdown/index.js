import React, { useEffect, useRef, useState } from "react";
import styles from "./toolsdropdown.module.scss";
import { useDispatch } from "react-redux";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import { useRouter } from "next/router";
import LazyImage from "@/helpers/lazyImage";
const NoteIcon = "/assets/icons/note.webp";
const FrameIcon = "/assets/icons/Frame.webp";
const PopularIcon = "/assets/icons/Popular.webp";
const DropdownArrowIcon = "/assets/icons/dropdown-arrow.webp";

export default function Toolsdropdown({ setTag, setCloseModal, tag, ref }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    name: "New",
    icon: NoteIcon,
  });
  const dropdownContainerRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const options = [
    { name: "New", icon: NoteIcon },
    { name: "Popular", icon: PopularIcon },
    { name: "Verified", icon: FrameIcon },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setCloseModal(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setTag(option.name);
    setIsOpen(false);
    setCloseModal(false);
    dispatch(setCurrentPage(1));
    const query = { ...router.query, page: 1 };
    if (option?.name) {
      query.tag = option?.name;
    } else {
      delete query.tag;
    }

    router?.replace(
      {
        pathname: router.pathname,
        query: query,
      },
      undefined,
      { shallow: true }
    );
  };
  useEffect(() => {
    if (
      tag &&
      (tag?.toLowerCase() == "new" ||
        tag?.toLowerCase() == "popular" ||
        tag?.toLowerCase() == "verified")
    ) {
      const selectedData = options?.find((item) => {
        return item?.name?.toLowerCase() == tag?.toLowerCase();
      });
      setSelectedOption(selectedData);
    }
  }, [tag]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setCloseModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className={styles.toolsdropdown} ref={dropdownContainerRef}>
      <button onClick={toggleDropdown} aria-label="Selected Option">
        <LazyImage
          image={{
            src: selectedOption.icon,
            alt: selectedOption.name + "Icon",
          }}
          className={styles.iconAlignment}
        />
        <div className={styles.dropdownNameAlignment}>
          <p>{selectedOption.name}</p>
          <LazyImage
            image={{
              src: DropdownArrowIcon,
              alt: "DropdownArrowIcon",
            }}
            className={styles.iconAlignment}
          />
        </div>
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {options
            ?.filter(
              (option) =>
                option?.name?.toLowerCase() !==
                selectedOption?.name?.toLowerCase()
            ) // Filter out the selected option
            ?.map((option) => {
              return (
                <div
                  className={styles.dropdownDetailsBox}
                  key={option.name}
                  onClick={() => handleOptionClick(option)}
                >
                  <LazyImage
                    image={{
                      src: option.icon ? option.icon : NoteIcon,
                      alt: option.name + "Icon",
                    }}
                    className={styles.dropdownOptionIconAlignment}
                  />
                  <p>{option.name} </p>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
