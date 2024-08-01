 
import { logIn, setSessionData } from "@/store/ApiSlice/authSlice";
import React, { useEffect } from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import styles from "../../shared/components/navbar/navbar.module.scss";
import firebase from "@/shared/components/navbar/firebase";
import axios from "axios";
import LazyImage from "@/helpers/lazyImage";
const GoogleLogo = "/assets/icons/google-icon.webp";

const GoogleWithLogin = ({ text }) => {
  const [signInWithGoogle, user] = useSignInWithGoogle(firebase);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user?.user?.email) {
      handleSignin(user);
    }
  }, [user]);

  const handleSignin = async (data) => {
    const body = {
      fname: data?.user?.displayName,
      email: data?.user?.email,
      isSocial: true,
      refreshToken: data?.user?.stsTokenManager?.refreshToken,
      accessToken: data?.user?.stsTokenManager?.accessToken,
      role: "65b2519a27683a1b04dd6305",
    };
    try {
      const response = await axios.get("https://ipapi.co/json/");

      body.city = response?.data?.city;
      body.country = response?.data?.country_name;
    } catch (error) {}

    await dispatch(logIn(body))
      .unwrap()
      .then((res) => {
        if (res?.success === true) {
          toast.success("Login successfully.");
          setSessionData(res?.payload?.token, res?.payload?.admin);
          localStorage.setItem("userInfo", JSON.stringify(res?.payload?.admin));
          localStorage.setItem("UserToken", res?.payload?.token);
          window.scrollTo({
            top: 1,
            left: 0,
            behavior: "smooth",
          });
        } else {
          toast.error(res?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message);
      });
  };

  return (
    <div
      className={styles.rightContent}
      onClick={() => {
        signInWithGoogle();
      }}
    >
      <button aria-label="google logo">
        <LazyImage
          image={{
            src: GoogleLogo,
            alt: `GoogleLogo`,
          }}
          className={styles.GoogleLogoAlignment}
        />
        {text}
      </button>
    </div>
  );
};

export default GoogleWithLogin;
