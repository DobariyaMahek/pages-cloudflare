 
import React, { useState } from "react";
import styles from "./subscribe.module.scss";
import { useDispatch } from "react-redux";
import { PostSubscribe } from "@/store/ApiSlice/restAllSlice";
import toast from "react-hot-toast";
const RightIcon = "/assets/icons/right-fill.webp";
export default function Subscribe() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});


  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleOnSubscribe = () => {
    if (!values?.email || values?.email === "") {
      toast.error("Please enter email");
    } else if (!values?.email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter a valid email address!");
    }  else {
      const body = {
        email: values.email,
      };
      dispatch(PostSubscribe(body))
        .then((res) => {
          if (res?.payload?.success == true) {
            toast.success(res.payload?.message);
            setValues({ email: "" });
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
    <div className={styles.subscribeBox}>
      <h6>Subscribe</h6>
      <div className={styles.input}>
        <input
          placeholder="Email address"
          type="text"
          name="email"
          value={values?.email}
          onChange={(e) => handleOnChange(e)}
        />
        <div
          className={styles.sendButton}
          onClick={() => {
            handleOnSubscribe();
          }}
        >
          <img loading="lazy" src={RightIcon} alt="RightIcon" />
        </div>
      </div>
      <p>
        Stay up to date with our latest AI Tools List and New AI Tools by
        subscribing to our newsletter. Simply enter your email address below and
        click 'subscribe' to get started.
      </p>
    </div>
  );
}
