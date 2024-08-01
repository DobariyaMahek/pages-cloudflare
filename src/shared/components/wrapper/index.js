import React, { useEffect, useState, useRef } from "react";
import styles from "./wrapper.module.scss";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import store, { persistor } from "@/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import toast, { Toaster, useToasterStore } from "react-hot-toast";
import client from "@/helpers/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { getSession } from "@/helpers/authHelper";
import { usePathname } from "next/navigation";
import { isEmpty } from "@/helpers/common";
import dynamic from "next/dynamic";
import ProgressBar from "../ProgressBar";
import TopBar from "../topBar";
import Navbar from "../navbar";
import Continuewithgoogle from "../continuewithgoogle";
import Subscribenewsletter from "../subscribenewsletter";
import Footer from "../footer";

const validRoutes = [
  "/",
  "/ai-shorts-videos",
  "/auth/purchase/receipt",
  "/auth/purchase/featured-tool",
  "/auth/purchase/submit-ai-form",
  "/browse-tools",
  "/contact-us",
  "/hire-us",
  "/popular-tools",
  "/privacy-policy",
  "/submit-tool",
  "/terms-condition",
  "/browse-gpts",
  "/gpt-store",
  "/blog",
  "/gpt-category",
  "/category",
  "/authors",
];

const Wrapper = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [tokenData, setTokenData] = useState(null);
  const isLogin = useRef(null);
  const showSubscribeModal = useRef(null);
  const channelRef = useRef(null);
  const timerIdRef = useRef(null);
  const tabId = useRef(Date.now().toString()).current;
  const timerRef = useRef(null);
  const currentDateTime = new Date();
  const midnight = new Date(
    currentDateTime.getFullYear(),
    currentDateTime.getMonth(),
    currentDateTime.getDate() + 1, // Adding 1 to get the next day
    0, // Hours
    0, // Minutes
    0, // Seconds
    0 // Milliseconds
  ).getTime(); // expired at 12 o'clock midnight
  const broadcastChannel = useRef(null);
  const [lastVisit, setLastVisit] = useState(null);

  const onScroll = () => setScrollY(window.scrollY);

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    broadcastChannel.current = new BroadcastChannel("sessionStorageUpdateChannel");
    broadcastChannel.current.onmessage = function (event) {
      if (event?.data) {
        sessionStorage.setItem("lastPopupTime", event?.data?.value);
        setLastVisit(event?.data?.value);
      }
    };
    return () => {
      if (broadcastChannel.current) {
        broadcastChannel.current.close();
      }
    };
  }, []);

  const isDynamicRoute =
    pathname?.includes("/gpt-category/") ||
    pathname?.includes("/category/") ||
    pathname?.includes("/blog/") ||
    pathname?.includes("/gpt/") ||
    pathname?.includes("/tool/") ||
    pathname?.includes("/authors/");

  const broadcastMessage = (data) => {
    if (broadcastChannel.current && broadcastChannel.current.readyState !== "closed") {
      try {
        broadcastChannel.current.postMessage(data);
      } catch (e) {}
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    const interval = setInterval(() => {
      if (getSession()?.access_token) {
        setTokenData(getSession()?.access_token);
      } else {
        setTokenData(null);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    const isValidRoute = validRoutes.includes(pathname);
    if (pathname) {
      if (!isValidRoute && getSession()?.access_token && !isDynamicRoute && !["/user/bookmark", "/user/gpt-bookmark"]?.includes(pathname)) {
        // router.push("/");
      } else if (!isValidRoute && !isDynamicRoute && isEmpty(getSession()?.access_token)) {
        // router.push("/");
      }
    }
  }, [pathname, isDynamicRoute, tokenData]);

  const initialDelay = 45000;
  const subsequentDelay = 300000;
  const hideModal = () => {
    showSubscribeModal.current.classList.remove("visibleModal");
    showSubscribeModal.current.classList.add("hiddenModal");
    isLogin.current.classList.remove("visibleModal");
    isLogin.current.classList.add("hiddenModal");
    document.body.style.overflow = "";
  };
  const handleModalClose = () => {
    hideModal();
    if (channelRef.current) {
      channelRef.current.postMessage({
        action: "closeModal",
        tabId: localStorage.getItem("tabId"),
      });
    }
    clearTimeout(timerRef.current);
    const currentTime = new Date().getTime();
    sessionStorage.setItem("lastPopupTime", currentTime);
    setupTimeout();
  };
  useEffect(() => {
    if (tokenData) {
      hideModal();
    } else {
      const currentTime = new Date().getTime();
      sessionStorage.setItem("lastPopupTime", currentTime);
      Cookies.set("firstTimeVisit", currentTime);
    }
  }, [tokenData]);

  const setupTimeout = () => {
    if (typeof window === "undefined" || !isEmpty(tokenData) || getSession()?.access_token) return;
    const currentTime = new Date().getTime();
    const lastPopupTime = sessionStorage.getItem("lastPopupTime") ? parseInt(sessionStorage.getItem("lastPopupTime")) : currentTime;

    const firstPopupTime = Cookies.get("firstTimeVisit") ? parseInt(Cookies.get("firstTimeVisit")) : currentTime;
    const firstVisit = !Cookies.get("firstVisit");

    const calculateNextDelay = () => {
      if (firstVisit) {
        const elapsedTime = currentTime - firstPopupTime;
        return Math.max(initialDelay - elapsedTime, 0);
      }
      const elapsedTime = currentTime - lastPopupTime;
      return Math.max(subsequentDelay - elapsedTime, 0);
    };

    const showPopup = () => {
      if (!tokenData) {
        if (document.visibilityState === "visible") {
          Cookies.set("firstVisit", true, {
            expires: new Date(midnight),
          });
          const currentTime = new Date().getTime();
          if (pathname?.includes("/blog")) {
            showSubscribeModal.current.classList.add("visibleModal");
            showSubscribeModal.current.classList.remove("hiddenModal");
          } else {
            isLogin.current.classList.add("visibleModal");
            isLogin.current.classList.remove("hiddenModal");
          }
          document.body.style.overflow = "hidden";
          if (channelRef.current) {
            channelRef.current.postMessage({
              action: "openModal",
              tabId,
            });
          }
          broadcastMessage({
            value: currentTime?.toString(),
          });
          sessionStorage.setItem("lastPopupTime", currentTime?.toString());
          setupTimeout();
        }
      }
    };

    const delay = calculateNextDelay();
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => showPopup(), delay);
  };
  useEffect(() => {
    localStorage.setItem("tabId", tabId);
    channelRef.current = new BroadcastChannel("modalChannel");

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setupTimeout();
      } else {
        clearTimeout(timerIdRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    channelRef.current.onmessage = (event) => {
      if (event.data.action === "openModal") {
        if (event.data.tabId === tabId) {
          if (pathname?.includes("/blog")) {
            showSubscribeModal.current.classList.add("visibleModal");
            showSubscribeModal.current.classList.remove("hiddenModal");
          } else {
            isLogin.current.classList.add("visibleModal");
            isLogin.current.classList.remove("hiddenModal");
          }
          document.body.style.overflow = "hidden";
        } else {
          hideModal();
        }
      } else if (event.data.action === "closeModal") {
        if (event.data.tabId !== tabId) {
          hideModal();
        }
      }
    };
    setupTimeout();
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(timerIdRef.current);
      if (channelRef.current) {
        channelRef.current.close();
      }
      localStorage.removeItem("tabId");
    };
  }, [tabId]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!Cookies.get("firstTimeVisit") && !tokenData && !getSession()?.access_token) {
        const currentTime = new Date().getTime();
        Cookies.set("firstTimeVisit", currentTime, {
          expires: new Date(midnight),
        });
        sessionStorage.clear();
      }
      if (!sessionStorage.getItem("lastPopupTime")) {
        const currentTime = new Date().getTime();
        sessionStorage.setItem("lastPopupTime", currentTime);
      }
      setupTimeout();

      const handleStorageChange = (event) => {
        if (event.key === "lastPopupTime") {
          const currentTime = new Date().getTime();
          sessionStorage.setItem("lastPopupTime", currentTime);
          clearTimeout(timerRef.current);
          setupTimeout();
        }
      };

      window.addEventListener("storage", handleStorageChange);
      return () => {
        window.removeEventListener("storage", handleStorageChange);
        clearTimeout(timerRef.current);
      };
    }
  }, [pathname, lastVisit, tokenData]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1;

  useEffect(() => {
    toasts
      ?.filter((t) => t.visible)
      ?.filter((item, i) => i >= TOAST_LIMIT)
      ?.forEach((t) => toast?.dismiss(t.id));
  }, [toasts]);
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Toaster containerStyle={{ zIndex: "99999999999999" }} position="top-right" reverseOrder={false} />
          <div className={scrollY > 200 ? styles.showButton : styles.hideButton}>
            <div className={styles.bottomToTop} onClick={scrollToTop}>
              <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0.439852 7.99996C0.439852 7.7132 0.549341 7.42649 0.767857 7.20786L7.64757 0.328226C8.0852 -0.109409 8.79475 -0.109409 9.23221 0.328226C9.66967 0.765684 9.66967 1.47509 9.23221 1.91276L3.14466 7.99996L9.232 14.0872C9.66945 14.5248 9.66945 15.2342 9.232 15.6716C8.79454 16.1094 8.08499 16.1094 7.64735 15.6716L0.767644 8.79205C0.549092 8.57332 0.439852 8.2866 0.439852 7.99996Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <ProgressBar pathname={router.pathname} />
          <TopBar />
          <Navbar />
          <div className="details-layout">{children}</div>
          <Footer />
         <div ref={isLogin} className="hiddenModal">
            <Continuewithgoogle handleModalClose={handleModalClose} />
          </div>
          <div ref={showSubscribeModal} className="hiddenModal">
            <Subscribenewsletter handleModalClose={handleModalClose} />
          </div>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  );
};

export default Wrapper;
