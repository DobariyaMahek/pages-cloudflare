import React, { useEffect, useRef, useState } from "react";
import styles from "./navbar.module.scss";
const Logo = "/assets/logo/findmylogo1.webp";
import Link from "next/link";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenNavbar, setToken } from "@/store/ApiSlice/authSlice";
import { setCurrentPage } from "@/store/ApiSlice/gptSlice";
import { setScrollCategory } from "@/store/ApiSlice/aiToolsSlice";
import { getSession } from "@/helpers/authHelper";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import SearchIcon from "@/assets/icons/SearchIcon";
import Image from "next/image";
import GoogleWithLogin from "@/module/auth/googlewithlogin";
import LazyImage from "@/helpers/lazyImage";
const MessageIcon = "/assets/icons/message.webp";
const LogoutIcon = "/assets/images/logout-w.webp";
const CloseIcon = "/assets/icons/close-white-icon.webp";

const AnimatedIcon = ({ isOpen, onClick, backgroundClass }) => {
  return (
    <div onClick={onClick} className={classNames(styles.iconContainer)}>
      <span
        className={classNames(
          styles.line,
          isOpen ? styles.lineOpenTop : styles.lineCloseTop
        )}
      ></span>
      <span
        className={classNames(
          styles.line,
          isOpen ? styles.lineOpenMiddle : styles.lineCloseMiddle
        )}
      ></span>
      <span
        className={classNames(
          styles.line,
          isOpen ? styles.lineOpenBottom : styles.lineCloseBottom
        )}
      ></span>
    </div>
  );
};

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [scrollY, setScrollY] = useState(0);
  const firstName = getSession()?.userInfo?.fname;
  const isToken = getSession()?.access_token;
  const [mobileViewSidebar, setMobileViewSidebar] = useState(false);
  const { isOpenNavbar } = useSelector((state) => state.auth);
  const mobileViewSidebarRef = useRef();
  const isOpenModal = () => {
    dispatch(setIsOpenNavbar(!isOpenNavbar));
  };
  useEffect(() => {
    const onScroll = () => {
      const scrolling = window.scrollY;
      setScrollY(scrolling);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);
  const [dropdownVisible, setDropdownVisible] = useState(false); // State to track dropdown visibility
  const dropdownContainerRef = useRef();

  const createAvatar = (name) => {
    if (!name) return "";
    const initials = name.charAt(0).toUpperCase();
    return initials;
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible); // Toggle dropdown visibility
  };
useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownVisible && dropdownContainerRef.current && !dropdownContainerRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
    if (mobileViewSidebarRef.current && !mobileViewSidebarRef.current.contains(event.target)) {
      dispatch(setIsOpenNavbar(false));
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, [dropdownVisible, mobileViewSidebarRef]);

  const logout = () => {
    dispatch(setToken(""));
    localStorage.clear();
    setDropdownVisible(false);
    dispatch(setCurrentPage(1));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1201) {
        dispatch(setIsOpenNavbar(false));
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleSearch = () => {
    var searchInput = document.getElementById("searchInput");
    if (searchInput) {
      searchInput.focus();
    }
    if (pathname?.includes("/tool")) {
      router.push("/");
    } else if (pathname.includes("/gpt-store") || pathname.includes("/gpt")) {
      router.push("/gpt-store");
    } else if (pathname.includes("/blog")) {
      router.push("/blog");
    } else {
      router.push("/");
    }
  };

  useEffect(() => {
    if (isOpenNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpenNavbar]);

  return (
    <header className={classNames(styles.header, scrollY > 50 ? styles.app : "", isOpenNavbar ? styles.MobileviewHeaderBlack : "")}>
      <div className="container">
        <div className={styles.headerAlignment}>
          <div className={styles.leftContent}>
            <div className={styles.mobileViewMenu}>
              <AnimatedIcon isOpen={isOpenNavbar} onClick={isOpenModal} />
            </div>
            <div className={styles.logoDesign}>
              <Link prefetch={false} href="/" aria-label="visit-findmyaitool">
                <Image src={Logo} alt={`Logo`} quality={80} priority={true} width={182} height={40}  />
              </Link>
            </div>
            <nav>
              <Link prefetch={false} href="/" aria-label="visit-findmyaitool" className={pathname === "/" ? styles.activeClass : ""}>
                Home
              </Link>
              <div onClick={() => dispatch(setScrollCategory(""))}>
                <Link
                  prefetch={false}
                  href="/category"
                  aria-label="Categories"
                  className={pathname === "/category" || pathname?.includes("/category") ? styles.activeClass : ""}
                >
                  Categories
                </Link>
              </div>
              <Link
                prefetch={false}
                href="/gpt-store"
                aria-label="GPT Store"
                className={pathname === "/gpt-store" || pathname === "/browse-gpts" || pathname?.includes("/gpt-category") ? styles.activeClass : ""}
              >
                GPT Store
              </Link>
              <Link
                prefetch={false}
                href="/ai-shorts-videos"
                aria-label="Shorts Video"
                className={pathname === "/ai-shorts-videos" ? styles.activeClass : ""}
              >
                Shorts Video{" "}
              </Link>
              <Link
                prefetch={false}
                href="/blog"
                aria-label="Blog"
                className={pathname === "/blog" || pathname?.includes("blog") ? styles.activeClass : ""}
              >
                Blog
              </Link>
              <Link
                prefetch={false}
                href="/submit-tool"
                aria-label="Submit AI Tool"
                className={pathname === "/submit-tool" ? styles.activeClass : ""}
              >
                Submit AI Tool
              </Link>
            </nav>
          </div>

          <div className={styles.rightContent}>
            <div
              className={styles.searchIconDesign}
              onClick={() => {
                handleSearch();
              }}
            >
              <SearchIcon />
            </div>
            <div>
              {isToken ? (
                <div className={styles.topPositionAlignment} ref={dropdownContainerRef}>
                  <button onClick={toggleDropdown} aria-label="FirstName">
                    <div className={styles?.avatar}>{createAvatar(firstName)}</div>
                    <p>{firstName}</p>
                  </button>
                  <div className={dropdownVisible ? classNames(styles.toggleDropdownmenu, styles.show) : classNames(styles.toggleDropdownmenu)}>
                    <Link prefetch={false} href={"/user/bookmark"}>
                      <button
                        onClick={() => {
                          setDropdownVisible(false);
                          dispatch(setCurrentPage(1));
                        }}
                        aria-label=" Bookmark Tools"
                        className={styles.secondButon}
                      >
                        <LazyImage
                          image={{
                            src: MessageIcon,
                            alt: `MessageIcon`,
                          }}
                        />
                        Bookmark Tools
                      </button>
                    </Link>
                    <Link prefetch={false} href={"/user/gpt-bookmark"}>
                      <button
                        className={styles.secondButon}
                        onClick={() => {
                          setDropdownVisible(false);
                          dispatch(setCurrentPage(1));
                        }}
                        aria-label=" Bookmark GPTs"
                      >
                        <LazyImage
                          image={{
                            src: MessageIcon,
                            alt: `MessageIcon`,
                          }}
                        />
                        Bookmark GPTs
                      </button>
                    </Link>

                    <button
                      onClick={() => {
                        logout();
                      }}
                      className={styles.secondButon}
                      aria-label="Logout"
                    >
                      <LazyImage
                        image={{
                          src: LogoutIcon,
                          alt: `LogoutIcon`,
                        }}
                      />
                      Logout{" "}
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <GoogleWithLogin text={"Login"} />
                </>
              )}
            </div>
          </div>
        </div>
        {mobileViewSidebar && <div className={styles.mobileViewSidebarWrapper}></div>}
        <div
          className={
            mobileViewSidebar
              ? classNames(styles.mobileViewSidebar, styles.openSidebarMenu)
              : classNames(styles.mobileViewSidebar, styles.closeSidebarMenu)
          }
        >
          <div className={styles.mobileViewMenuHeader}>
            <Link prefetch={false} href="/" aria-label="visit-findmyaitool">
              <div className={styles.logo} onClick={() => setMobileViewSidebar(false)}>
                <LazyImage
                  image={{
                    src: Logo,
                    alt: `Logo`,
                  }}
                />
              </div>
            </Link>
            <div className={styles.closeIcon} onClick={() => setMobileViewSidebar(false)}>
              <LazyImage
                image={{
                  src: CloseIcon,
                  alt: `CloseIcon`,
                }}
              />
            </div>
          </div>
          <div className={styles.mobileMenuOptionDetails}></div>
        </div>

        <div className={classNames(styles.mobileSidebar, isOpenNavbar ? styles.show : styles.hide)} ref={mobileViewSidebarRef}>
          <div className={styles.mobileBodySpacer}>
            <Link prefetch={false} href="/" aria-label="visit-findmyaitool">
              <p className={mobileViewSidebar ? styles.activeMenu : ""} onClick={isOpenModal}>
                Home
              </p>
            </Link>
            <Link prefetch={false} href="/category" aria-label="AI Tools Category">
              <p className={mobileViewSidebar ? styles.activeMenu : ""} onClick={isOpenModal}>
                AI Tools Category
              </p>
            </Link>
            <Link prefetch={false} href="/gpt-store" aria-label="GPT Store">
              <p className={mobileViewSidebar ? styles.activeMenu : ""} onClick={isOpenModal}>
                GPT Store
              </p>
            </Link>
            <Link prefetch={false} href="/ai-shorts-videos" aria-label="AI Shorts Video">
              <p className={mobileViewSidebar ? styles.activeMenu : ""} onClick={isOpenModal}>
                AI Shorts Video
              </p>
            </Link>
            <Link prefetch={false} href="/blog" aria-label="Blog">
              <p className={mobileViewSidebar ? styles.activeMenu : ""} onClick={isOpenModal}>
                Blog
              </p>
            </Link>
            <Link prefetch={false} href="/submit-tool" aria-label="Submit AI Tool">
              <p className={mobileViewSidebar ? styles.activeMenu : ""} onClick={isOpenModal}>
                Submit AI Tool
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
