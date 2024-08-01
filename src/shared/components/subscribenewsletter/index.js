import React, { useRef, useState } from "react";
import styles from "./subscribenewsletter.module.scss";
import classNames from "classnames";
import toast from "react-hot-toast";
import { PostSubscribe } from "@/store/ApiSlice/restAllSlice";
import { isEmpty } from "@/helpers/common";
import { useDispatch } from "react-redux";
import LazyImage from "@/helpers/lazyImage";
const CloseIcon = "/assets/icons/close-white.webp";
const EmailIcon = "/assets/icons/email-sm.webp";
const EmailIconLg = "/assets/icons/email-lg.webp";
const Subscribe = "/assets/icons/Subscribe.webp";

export default function Subscribenewsletter({
  showSubscribeModal,
  handleModalClose,
}) {
  const dispatch = useDispatch();
  const loginRef = useRef();

  const [values, setValues] = useState("");

  const handleOnSubscribe = () => {
    if (isEmpty(values)) {
      toast.error("Please enter email");
    } else if (!values?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter a valid email address!");
    } else {
      const body = {
        email: values,
      };
      dispatch(PostSubscribe(body))
        .then((res) => {
          if (res?.payload?.success == true) {
            toast.success(res.payload?.message);
            setValues({ email: "" });
            handleModalClose();
          } else {
            toast.error(res?.payload?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.payload?.message);
        });
    }
  };
  return (
    <div className={classNames(styles.subscribenewsletterwrapper)}>
      <div className={styles.subscribenewsletterModal} ref={loginRef}>
        <div className={styles.imgstyle}>
          <img src={Subscribe} alt="Subscribe" />
        </div>
        <div
          className={styles.closeiconAlignment}
          onClick={() => {
            handleModalClose();
            setValues("");
          }}
        >
          {/* <img
            src={CloseIcon}
            alt="CloseIcon"
 
          /> */}
          <LazyImage
            image={{
              src: CloseIcon,
              alt: "CloseIcon",
            }}
          />
        </div>
        <div className={styles.centerIcon}>
          <img src={EmailIconLg} alt="EmailIconLg" />
        </div>
        <h2>Subscribe Newsletter</h2>
        <p>
          Subscribe to our AI Tools Newsletter for exclusive insights,
          cutting-edge innovations, and the latest AI advancements delivered
          straight to your inbox!
        </p>
        <div className={styles.subscribeCenter}>
          <div className={styles.relativeDiv}>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={values?.trimStart()}
              onChange={(e) => setValues(e.target.value?.trim())}
            />
            <div className={styles.leftIcon}>
              {/* <img src={EmailIcon} alt="EmailIcon" /> */}
              <LazyImage
                image={{
                  src: EmailIcon,
                  alt: "EmailIcon",
                }}
              />
            </div>

            <div className={styles.subscribe}>
              <button
                onClick={() => {
                  handleOnSubscribe();
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
