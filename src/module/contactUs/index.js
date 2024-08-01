import React, { useState } from "react";
import styles from "./contactUs.module.scss";
import { useDispatch } from "react-redux";
import { AddContactUs } from "@/store/ApiSlice/authSlice";
const ContactImg = "/assets/images/contact-img-w.webp";
import toast from "react-hot-toast";


export default function ContactUs() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setValues({ ...values, [e?.target?.name]: e?.target?.value });
    setErrors({ ...errors, [e?.target?.name]: "" });
  };

  const validation = () => {
    let isFormValid = true;
    let newErrors = {};
    if (!values?.name || values?.name === "") {
      isFormValid = false;
      newErrors["name"] = "Please enter name";
    }
    if (!values?.dec || values?.dec === "") {
      isFormValid = false;
      newErrors["dec"] = "Please enter description ";
    }
    if (!values?.email || values?.email === "") {
      isFormValid = false;
      newErrors["email"] = "Please enter email";
    } else {
      if (!values?.email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        isFormValid = false;
        newErrors["email"] = "Please enter a valid email address!";
      }
    }

    setErrors(newErrors);
    return isFormValid;
  };

  const handleOnSubmit = () => {
 if (validation()) {
      const body = {
        name: values?.name,
        email: values?.email,
        message: values?.dec,
        publishedAt: new Date(),
      };
      setLoading(true);
      dispatch(AddContactUs(body))
        .then((res) => {
          setLoading(false);
          setErrors({});
          toast.success("Thank you for contacting us!");
          setValues({ dec: "", email: "", name: "" });
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  return (
      <div className={styles.contactUsSection}>
        <div className="container">
          <div className={styles.contactUsAlignment}>
            <h1>Contact Us</h1>

            <div className={styles.contactUsFormAlignment}>
              <div className={styles.formBox}>
                <div className={styles.formGrid}>
                  <div>
                    <img loading="lazy" src={ContactImg} alt="ContactImg" />
                  </div>

                  <div className={styles.formDetailsAlignment}>
                    <h2>Get In Touch</h2>
                    <p>We are here for you! How can we help?</p>

                    <div className={styles.formInputAlignment}>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          name="name"
                          value={values?.name}
                          onChange={(e) => handleOnChange(e)}
                        />
                        <span className={styles.errors}>{errors.name}</span>
                      </div>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Enter your email address"
                          name="email"
                          value={values?.email}
                          onChange={(e) => handleOnChange(e)}
                        />
                        <span className={styles.errors}>{errors.email}</span>
                      </div>
                      <div className={styles.input}>
                        <textarea
                          placeholder="Go ahead, We are listening..."
                          name="dec"
                          value={values?.dec}
                          onChange={(e) => handleOnChange(e)}
                        ></textarea>
                        <span className={styles.errors}>{errors.dec}</span>
                      </div>
                    </div>

                    <div className={styles.formButtonAlignment}>
                      <button
                        onClick={() => handleOnSubmit()}
                        aria-label="Submit Now"
                      >
                        Submit Now{" "}
                        {loading && <span className={styles.loader}></span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
