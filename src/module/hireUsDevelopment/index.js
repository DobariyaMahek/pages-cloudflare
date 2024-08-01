 
import React, { useMemo, useState } from "react";
import styles from "./hireUsDevelopment.module.scss";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { Hireus } from "@/store/ApiSlice/restAllSlice";
import { useRouter } from "next/navigation";
import Select from "react-select";
import countryList from "react-select-country-list";
import { getSession } from "@/helpers/authHelper";
export default function HireUsDevelopment() {
  const route = useRouter();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleOnChange = (e) => {
    setValues({ ...values, [e?.target?.name]: e?.target?.value });
    setErrors({ ...errors, [e?.target?.name]: "" });
  };
  const [value, setValue] = useState("");
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (value) => {
    setValue(value);
    setValues({ ...values, country: value?.label });
    setErrors({ ...errors, country: "" });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "none",
      color: "#fff",
      width: ` 100%`,
      height: ` 55px`,
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    }),
    option: (provided, state) => ({
      ...provided,
      border: "none",
      backgroundColor: state.isFocused
        ? "rgba(255, 255, 255, 0.08)"
        : "#252438",
      color: state.isFocused ? "#fff" : "#fff",
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#252438",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "white",
    }),
    input: (provided, state) => ({
      ...provided,
      color: "white",
    }),
  };
  const clearForm = () => {
    setValues({
      name: "",
      email: "",
      summary: "",
      shortans: "",
      questionans: "",
      country: null,
      customerType: "",
    });
    setErrors({});
  };
  const validation = () => {
    let isFormValid = true;
    let newErrors = {};
    if (!values?.name || values?.name === "") {
      isFormValid = false;
      newErrors["name"] = "Please enter name";
    }
    if (!values?.country || values?.country === "") {
      isFormValid = false;
      newErrors["country"] = "Please select country";
    }

    if (!values?.shortans || values?.shortans === "") {
      isFormValid = false;
      newErrors["shortans"] = " Please enter shorty idea of your tool";
    }
    if (!values.customerType || values.customerType === "") {
      isFormValid = false;
      newErrors["customerType"] = "This filed is required";
    }
    if (!values?.summary || values?.summary === "") {
      isFormValid = false;
      newErrors["summary"] = "Please enter summary of your tool";
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
    if (!getSession()?.access_token) {
      toast.error("Please login to use services");
    } else if (validation()) {
      setLoading(true);

      const body = {
        email: values?.email,
        fullName: values?.name,
        country: values?.country,
        shortIdea: values?.shortans,
        summary: values?.summary,
        questionsAndComments: values?.questionans,
        existingCustomer: values.customerType === "existingCustomer" ? true : false,
      };
      dispatch(Hireus(body))
        .then((res) => {
          if (res.payload.result === 0) {
            setLoading(false);
            setErrors({});
            toast.success("Your response has been saved");
            setValues({});
            route.push("/");
          } else {
            setLoading(false);

            toast.error(res?.payload?.message);
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  };
  return (
    <div className={styles.hireUsDevelopmentSection}>
      <div className="container">
        <div className={styles.hireUsDevelopmentAlignment}>
          <div className={styles.heading}>
            <h4>Hire Us For Your Next AI Tool Development</h4>
            <p>
              {" "}
              You can also contact us on{" "}
              <a aria-label="visit-link" href="#">info@findmytool.com</a> for any
              queries.
            </p>
          </div>

          <div className={styles.hireUsFormAlignment}>
            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>Email</label>

                <div className={styles.inputBox}>
                  <input
                    type="text"
                    placeholder="Your Email"
                    name="email"
                    value={values?.email}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <span className={styles.errors}>{errors?.email}</span>
                </div>
              </div>
            </div>
            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>Full Name</label>

                <div className={styles.inputBox}>
                  <input
                    type="text"
                    placeholder="Your Answer"
                    name="name"
                    value={values?.name}
                    onChange={(e) => handleOnChange(e)}
                  />
                  <span className={styles.errors}>{errors?.name}</span>
                </div>
              </div>
            </div>

            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>
                  Are You A New Or Existing Customer Of Find My AI Tool?
                </label>

                <div className={styles.optionDetailsAlignment}>
                  <div className={styles.optionFlexAlignment}>
                    <div className={styles.radioAlignment}>
                      <input
                        type="radio"
                        name="customerType"
                        value="newCustomer"
                        checked={values?.customerType === "newCustomer"}
                        onChange={handleOnChange}
                      />
                    </div>
                    <p>I Am A New Customer</p>
                  </div>

                  <div className={styles.optionFlexAlignment}>
                    <div className={styles.radioAlignment}>
                      <input
                        type="radio"
                        name="customerType"
                        value="existingCustomer"
                        checked={values?.customerType === "existingCustomer"}
                        onChange={handleOnChange}
                      />
                    </div>
                    <p>I Am An Existing Customer</p>
                  </div>
                </div>
              </div>
              <span className={styles.errors}>{errors?.customerType}</span>
            </div>

            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>Country</label>
                <Select
                  options={options}
                  value={value}
                  name="country"
                  onChange={changeHandler}
                  placeholder="Select Your Country"
                  styles={customStyles}
                />
                <span className={styles.errors}>{errors?.country}</span>
              </div>
            </div>

            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>Short Idea Of Your Tool</label>

                <div className={styles.inputBox}>
                  <textarea
                    placeholder="Your Answer"
                    name="shortans"
                    value={values?.shortans}
                    onChange={(e) => handleOnChange(e)}
                  ></textarea>
                  <span className={styles.errors}>{errors?.shortans}</span>
                </div>
              </div>
            </div>
            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>Summary</label>

                <div className={styles.inputBox}>
                  <textarea
                    placeholder="Your Answer"
                    name="summary"
                    value={values?.summary}
                    onChange={(e) => handleOnChange(e)}
                  ></textarea>
                  <span className={styles.errors}>{errors?.summary}</span>
                </div>
              </div>
            </div>
            <div className={styles.hireFormBox}>
              <div className={styles.inputAlignment}>
                <label>Questions And Comments</label>

                <div className={styles.inputBox}>
                  <textarea
                    placeholder="Your Answer"
                    name="questionans"
                    value={values?.questionans}
                    onChange={(e) => handleOnChange(e)}
                  ></textarea>
                </div>
              </div>
            </div>
            <div className={styles.hireFormButtonAlignment}>
              <button aria-label="Submit" onClick={() => handleOnSubmit()}>
                Submit {loading && <span className={styles.loader}></span>}
              </button>
              <button aria-label="Clear" onClick={() => clearForm()}>
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
