import React, { useEffect, useRef, useState } from "react";
import styles from "./submitAIToolForm.module.scss";
import { useDispatch } from "react-redux";
import { addAiTool } from "@/store/ApiSlice/aiToolsSlice";
import { useRouter, useSearchParams } from "next/navigation";
import classNames from "classnames";
import Slider from "react-slick";
import toast from "react-hot-toast";
import "suneditor/dist/css/suneditor.min.css";
import { AuthCodeValidation } from "@/store/ApiSlice/restAllSlice";
import { getSession } from "@/helpers/authHelper";
import {
  BUTTON_LIST,
  FACEBOOK_REGEX,
  FeaturesDataArray,
  INSTRAGRAM_REGEX,
  LINKDIN_REGEX,
  PricingDataArray,
  TWITTER_REGEX,
  WEBSITE_URL_REGEX,
} from "@/helpers/constant";
import { isEmpty } from "@/helpers/common";
import dynamic from "next/dynamic";
import Select from "react-select";
import useDebounce from "@/hook/useDebounce";
const MessagePage = dynamic(
  () => import("../../shared/components/messagePage"),
  {
    ssr: true,
  }
);
const NoDataFound = dynamic(() => import("../../shared/components/404"), {
  ssr: true,
});
const UploadIcon = "/assets/icons/upload-icon.webp";
const CloseIcon = "/assets/icons/close-icon.webp";
const LeftArrow = "/assets/icons/slider-left.webp";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});
function SampleNextArrow(props) {
  const { onClick } = props;
  return (
    <div className={styles.rightArrow} onClick={onClick}>
      <img loading="lazy" src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { onClick } = props;
  return (
    <div className={styles.leftArrow} onClick={onClick}>
      <img loading="lazy" src={LeftArrow} alt="LeftArrow" />
    </div>
  );
}
export default function SubmitAiToolsForm() {

  const [editorValues, setEditorValues] = useState({
    details: "",
    pros: "",
    cons: "",
  });
  const params = useSearchParams();
  const transactionId = params?.get("authcode");
  const [aiFormData, setAiFormData] = useState({
    websiteimg: [],
    aiToolSubCategoryName: "",
    pricing: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);
  const [imageErrors, setImageErrors] = useState({});
  const [isValidate, setValidation] = useState(true);
  const [isValidateMsg, setValidationMsg] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const [isSuccessFull, setIsSuccessFull] = useState(false);
  const dispatch = useDispatch();
  const sunEditorRef = useRef(null);
  const debouncedSearch = useDebounce(aiFormData?.aiToolSubCategoryName, 500);
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);
  useEffect(() => {
    const handleOnAuthCodeValidation = async () => {
      setLoader(true);
      try {
        const response = await dispatch(
          AuthCodeValidation({
            type: "submit-aiTool",
            authcode: transactionId,
          })
        );
        if (response?.payload?.success) {
          setValidation(true);
        } else {
          setValidation(false);
          setValidationMsg(response?.payload?.message);
        }
        setLoader(false);
      } catch (error) {
        setValidation(false);
        setLoader(false);
      }
    };
    if (transactionId) {
      handleOnAuthCodeValidation();
    } else {
      setTimeout(() => {
        setLoader(false);
      }, 1000);
    }
  }, [dispatch, transactionId]);
  async function loadOptions(search) {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }aiToolSubCategory/get-subCategory?page=${1}&limit=${100}&status=active&reorderData=true${
        search ? `&search=${search}` : ""
      }`
    );
    const responseJSON = await response.json();

    const data = responseJSON?.payload?.aiToolSubCategory?.map((item) => {
      return {
        value: item?._id,
        label: item?.name,
      };
    });
    setCategoryList(data);
  }
  useEffect(() => {
    loadOptions(debouncedSearch);
  }, [debouncedSearch]);
  const handleOnChange = (e, isIngleItem) => {
    const { name, value, checked } = e?.target;
    const isLinkName =
      name == "websiteLink" ||
      name == "instaChannelLink" ||
      name == "linkedInChannelLink" ||
      name == "twitterChannelLink" ||
      name == "facebookChannelLink" ||
      name == "youTubeChannelLink";
    let error = "";
    if (name == "features") {
      let values = [
        ...(aiFormData?.features?.length > 0 ? aiFormData?.features : []),
      ];
      values = values?.includes(value)
        ? values?.filter((item) => item !== value)
        : [...values, value];

      setAiFormData({ ...aiFormData, [name]: values });
    } else if (name === "pricing") {
      const silglePriceList = PricingDataArray?.filter(
        (item) => item.type === "single"
      ).map((item2) => {
        return item2.name;
      });

      setAiFormData((preValue) => {
        let newValue = preValue.pricing;

        if (checked && isIngleItem) {
          newValue = newValue?.filter(
            (item) => !silglePriceList.includes(item)
          );
          newValue.push(value);
        } else if (checked) {
          newValue.push(value);
        } else {
          newValue = newValue?.filter((item) => item !== value);
        }

        return {
          ...preValue,
          pricing: newValue,
        };
      });
    } else if (name === "websiteimg") {
      const files = e?.target?.files;
      const maxSizePerImage = 7 * 1024 * 1024; // 7MB in bytes
      let updatedImages = [];

      Array.from(files)?.forEach((file) => {
        if (file.size <= maxSizePerImage) {
          updatedImages?.push(file);
        } else {
          toast.error(`${file?.name} size more then to 7MB`);
        }
      });

      if (!files[0]?.type?.startsWith("image/")) {
        const validationErrors = "Please select only image";

        setImageErrors({
          ...imageErrors,
          [name]: validationErrors,
        });
      } else if (
        files[0] &&
        files[0]?.type &&
        !["image/jpeg", "image/jpg", "image/png"].includes(files[0]?.type)
      ) {
        const validationErrors = "Please select a JPG, JPEG, or PNG image";

        setImageErrors({
          ...imageErrors,
          [name]: validationErrors,
        });
      } else {
        setAiFormData((prevFormData) => ({
          ...prevFormData,
          websiteimg: [...prevFormData.websiteimg, ...updatedImages],
        }));
      }
    } else if (name === "aiToolCategoryId") {
      setAiFormData({
        ...aiFormData,
        aiToolCategoryId: value,
        aiToolSubCategoryId: {},
      });
    } else if (name === "websitelogo") {
      const file = e?.target?.files[0];
      const maxSize = 2 * 1024 * 1024;

      if (file) {
        if (!file?.type?.startsWith("image/")) {
          const validationErrors = "Please select only image";

          setImageErrors({
            ...imageErrors,
            [name]: validationErrors,
          });
        }
        if (file.size <= maxSize) {
          setAiFormData({ ...aiFormData, websitelogo: file });
          setErrors({ ...errors, [name]: "" });
          setImageErrors({
            ...imageErrors,
            [name]: " ",
          });
        } else {
          const validationErrors =
            "Website logo size should be less than or equal to 2MB.";

          setImageErrors({
            ...imageErrors,
            [name]: validationErrors,
          });
        }
      }
    } else if (isLinkName && !WEBSITE_URL_REGEX.test(value)) {
      setAiFormData({ ...aiFormData, [name]: value });
      error = value ? "Please enter valid link" : "";
    } else {
      setAiFormData({ ...aiFormData, [name]: value });
    }
    setErrors({ ...errors, [name]: error });
  };
  const handleRemoveImage = (indexToRemove) => {
    setAiFormData((prevFormData) => ({
      ...prevFormData,
      websiteimg: prevFormData.websiteimg.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 476,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 390,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };
  const validation = () => {
    let isFormValid = true;
    let newErrors = { ...errors };

    if (isEmpty(aiFormData?.title)) {
      isFormValid = false;
      newErrors.title = "Please enter title";
    }
    if (isEmpty(editorValues?.details)) {
      isFormValid = false;
      newErrors["details"] = "Please enter a detailed description";
    }
    if (isEmpty(aiFormData?.description)) {
      isFormValid = false;
      newErrors["description"] = "Please enter a short description";
    }
    if (isEmpty(aiFormData?.websiteimg)) {
      isFormValid = false;
      newErrors["websiteimg"] = " Please add your website img";
    }
    if (isEmpty(aiFormData?.websitelogo)) {
      isFormValid = false;
      newErrors["websitelogo"] = " Please add your website logo";
    }

    if (isEmpty(aiFormData?.aiToolSubCategoryId)) {
      isFormValid = false;
      newErrors["aiToolSubCategoryId"] = "Please select your category!";
    }

    if (isEmpty(aiFormData?.websiteLink)) {
      isFormValid = false;
      newErrors["websiteLink"] = "Please enter Website link";
    }
    if (
      !isEmpty(aiFormData?.websiteLink) &&
      !WEBSITE_URL_REGEX.test(aiFormData?.websiteLink)
    ) {
      isFormValid = false;
      newErrors["websiteLink"] = " Please enter valid Website link";
    }
    if (isEmpty(aiFormData?.pricing)) {
      isFormValid = false;
      newErrors["pricing"] = " Please select pricing";
    }
    setErrors(newErrors);

    return isFormValid;
  };
  const handleEditorChange = (content, editorId) => {
    setEditorValues((prevState) => ({
      ...prevState,
      [editorId]: content,
    }));
    if (editorId === "details") {
      setErrors((errors) => ({ ...errors, details: "" }));
    } else if (editorId === "pros") {
      setErrors((errors) => ({ ...errors, pros: "" }));
    } else if (editorId === "cons") {
      setErrors((errors) => ({ ...errors, cons: "" }));
    }
  };
  const handleSubmit = () => {
    const allErrorsEmpty = Object.values(errors).every((error) =>
      isEmpty(error)
    );
    if (!getSession()?.access_token) {
      toast.error("Please login to submit form");
    } else {
      if (validation() && allErrorsEmpty) {
        setLoading(true);
        let formdata = new FormData();
        Object.keys(aiFormData).forEach((key) => {
          if (key === "pricing") {
            aiFormData[key].map((item) => {
              return formdata.append("pricing[]", [item]);
            });
            return;
          }
          if (key === "features") {
            aiFormData[key].map((item) => {
              return formdata.append("features[]", [item]);
            });
            return;
          }
        });
        formdata.append("title", aiFormData?.title);
        formdata.append("description", aiFormData?.description);
        formdata.append("details", editorValues?.details);
        formdata.append("status", "pending");

        formdata.append("aiToolSubCategoryId", aiFormData?.aiToolSubCategoryId);
        formdata.append("websiteLink", aiFormData?.websiteLink);
        if (transactionId) {
          formdata.append("authcode", transactionId);
        }
        if (aiFormData.couponDeals) {
          formdata.append("couponDeals", aiFormData.couponDeals);
        }
        if (aiFormData.instaChannelLink) {
          formdata.append("instagramChannelLink", aiFormData.instaChannelLink);
        }
        if (aiFormData.linkedInChannelLink) {
          formdata.append("linkedInChannelLink", aiFormData.linkedInChannelLink);
        }
        if (aiFormData.facebookChannelLink) {
          formdata.append("facebookChannelLink", aiFormData.facebookChannelLink);
        }
        if (aiFormData.twitterChannelLink) {
          formdata.append("twitterChannelLink", aiFormData.twitterChannelLink);
        }
        if (aiFormData.youTubeChannelLink) {
          formdata.append("youTubeChannelLink", aiFormData.youTubeChannelLink);
        }
        if (aiFormData?.paidPlanDeals) {
          formdata.append("planDeals", aiFormData?.paidPlanDeals);
        }

        formdata.append("icon", aiFormData?.websitelogo);

        aiFormData.websiteimg.forEach((file) => {
          formdata.append("images", file);
        });

        dispatch(addAiTool({ body: formdata }))
          .then((res) => {
            if (res?.payload.result === 0) {
              toast.success("AI tools submitted successfully");
              setLoading(false);

              setAiFormData({ websiteimg: [] });
              setErrors({});
              setIsSuccessFull(true);
            } else {
              toast.error(res?.payload?.message);
              setLoading(false);
            }
          })
          .catch((err) => {
            setLoading(false);
          });
      }
    }
  };

  const handleOnChangeCategory = (e) => {
    setAiFormData({
      ...aiFormData,
      aiToolSubCategoryName: e,
      aiToolSubCategoryId: e.value,
    });
    setErrors({ ...errors, aiToolSubCategoryId: " " });
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderRadius: "5px",
      border: "none",
      color: "#fff",
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
      color: "rgba(255, 255, 255, 0.8)", // Change the color of the placeholder here
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#252438",
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: "#fff", // Change the color of the selected value here
    }),
  };

  if (!transactionId && !loader && !isSuccessFull) {
    return <NoDataFound />;
  } else if (!isValidate && !loader && !isSuccessFull) {
    return (
      <MessagePage
        {...{
          text:
            isValidateMsg == "Expired authorization code"
              ? "Link Expired!"
              : "Invalid URL",
          description:
            isValidateMsg == "Expired authorization code"
              ? "We're sorry, but the page you were trying to reach may have expired or been removed."
              : "We apologize for the inconvenience, but the URL you've accessed appears to be invalid or incorrect.",
        }}
      />
    );
  } else if (isValidate && !loader && !isSuccessFull) {
    return (
      <div className={styles.submitAiToolsFormSection}>
        <div className="container">
          <div className={styles.submitAiToolsFormAlignment}>
            <div className={styles.heading}>
              <h4>Submit AI Tool</h4>
              <p>
                We aim to review every tool within 7 days and inclide them in
                the directory.
              </p>
            </div>
            <div className={styles.submitAiToolsMainForm}>
              <div className={styles.grid}>
                <div className={styles.formBoxAlignment}>
                  <div className={styles.formInput}>
                    {aiFormData.websitelogo ? (
                      <div className={styles.uploadedImgAlignment}>
                        <img
                          className={styles.sliderImg}
                          src={
                            typeof aiFormData.websitelogo === "string"
                              ? aiFormData?.websitelogo
                              : URL.createObjectURL(aiFormData.websitelogo)
                          }
                          alt="websitelogo"
                        />

                        <div
                          className={styles.closeIconAlignment}
                          onClick={() => {
                            setAiFormData({
                              ...aiFormData,
                              websitelogo: null,
                            });
                          }}
                        >
                          <img loading="lazy" src={CloseIcon} alt="CloseIcon" />
                        </div>
                      </div>
                    ) : (
                      <div className={styles.formInput}>
                        <label>
                          Upload your website Logo{" "}
                          <span>
                            * {errors.websitelogo && errors.websitelogo}
                          </span>
                        </label>
                        <div className={styles.uploadedBoxAlignment}>
                          <img
                            loading="lazy"
                            src={UploadIcon}
                            alt="UploadIcon"
                          />
                          <p>Browse Files to upload</p>
                          <input
                            type="file"
                            name="websitelogo"
                            accept="image/*"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </div>

                        {imageErrors.websitelogo && (
                          <div className={styles.errormessage}>
                            <p>{imageErrors.websitelogo}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className={styles.formBoxAlignment}>
                  <div className={styles.formInput}>
                    {aiFormData.websiteimg?.length === 0 ? (
                      <div>
                        <label>
                          Upload your website Images{" "}
                          <span>
                            * {errors.websiteimg && errors.websiteimg}
                          </span>
                        </label>
                        <div className={styles.uploadedBoxAlignment}>
                          <img
                            loading="lazy"
                            src={UploadIcon}
                            alt="UploadIcon"
                          />
                          <p>Browse Files to upload</p>
                          <input
                            type="file"
                            name="websiteimg"
                            accept="image/*"
                            onChange={(e) => handleOnChange(e)}
                          />
                        </div>

                        {imageErrors.websiteimg && (
                          <div className={styles.errormessage}>
                            <p>{imageErrors.websiteimg}</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className={styles.formInput}>
                        {aiFormData.websiteimg &&
                          aiFormData.websiteimg.length > 0 &&
                          (aiFormData.websiteimg.length > 1 ? (
                            <div
                              className={classNames(
                                styles.uploadedImgAlignment,
                                styles.secondImg
                              )}
                            >
                              <Slider {...settings}>
                                {aiFormData.websiteimg.map((image, index) => (
                                  <div
                                    key={index}
                                    className={styles.imageContainer}
                                  >
                                    <img
                                      className={styles.sliderImg}
                                      src={
                                        typeof image === "string"
                                          ? image
                                          : URL.createObjectURL(image)
                                      }
                                      alt={`Uploaded Image ${index}`}
                                    />
                                    <div
                                      className={styles.closeIconAlignment}
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      <img
                                        loading="lazy"
                                        src={CloseIcon}
                                        alt="CloseIcon"
                                      />
                                    </div>
                                  </div>
                                ))}
                              </Slider>
                            </div>
                          ) : (
                            aiFormData.websiteimg.map((image, index) => (
                              <div
                                key={index}
                                className={classNames(
                                  styles.uploadedImgAlignment,
                                  styles.secondImg
                                )}
                              >
                                <img
                                  className={styles.sliderImg}
                                  src={
                                    typeof image === "string"
                                      ? image
                                      : URL.createObjectURL(image)
                                  }
                                  alt={`Uploaded Image ${index}`}
                                />
                                <div
                                  className={styles.closeIconAlignment}
                                  onClick={() => handleRemoveImage(index)}
                                >
                                  <img
                                    loading="lazy"
                                    src={CloseIcon}
                                    alt="CloseIcon"
                                  />
                                </div>
                              </div>
                            ))
                          ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.grid}>
                <div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>
                        Tool Name <span>* {errors.title && errors.title}</span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Tool Name"
                          name="title"
                          value={aiFormData.title}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                    <div className={styles.formInput}>
                      <label>
                        Website URL{" "}
                        <span>
                          * {errors.websiteLink && errors.websiteLink}
                        </span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Website URL"
                          name="websiteLink"
                          value={aiFormData.websiteLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>

                    <div className={styles.formInput}>
                      <label>
                        Choose Category{" "}
                        <span>
                          *{" "}
                          {errors.aiToolSubCategoryId &&
                            errors.aiToolSubCategoryId}{" "}
                        </span>
                      </label>
                      {/* <AsyncPaginate
                          name="aiToolSubCategoryName"
                          className="dropdown-input"
                          value={aiFormData.aiToolSubCategoryName}
                          loadOptions={loadOptions}
                          onChange={handleOnChangeCategory}
                          styles={customStyles}
                          setvalues={aiFormData.aiToolSubCategoryName}
                          additional={{
                            page: 1,
                          }}
                          placeholder="Select Category"
                        /> */}
                      <Select
                        options={categoryList}
                        value={aiFormData?.aiToolSubCategoryName}
                        name="aiToolSubCategoryName"
                        onChange={handleOnChangeCategory}
                        placeholder="Select Category"
                        styles={customStyles}
                      />
                    </div>
                  </div>

                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>
                        Instagram social media link{" "}
                        <span>
                          {" "}
                          {errors.instaChannelLink && errors.instaChannelLink}
                        </span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Instagram social media link"
                          name="instaChannelLink"
                          value={aiFormData.instaChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                    <div className={styles.formInput}>
                      <label>
                        Facebook social media link{" "}
                        <span>
                          {errors.facebookChannelLink &&
                            errors.facebookChannelLink}
                        </span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Facebook social media link"
                          name="facebookChannelLink"
                          value={aiFormData.facebookChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>{" "}
                    </div>
                    <div className={styles.formInput}>
                      <label>
                        Twitter social media link{" "}
                        <span>
                          {" "}
                          {errors.twitterChannelLink &&
                            errors.twitterChannelLink}{" "}
                        </span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Twitter social media link"
                          name="twitterChannelLink"
                          value={aiFormData.twitterChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>{" "}
                    </div>
                    <div className={styles.formInput}>
                      <label>
                        Linkdin social media link{" "}
                        <span>
                          {" "}
                          {errors.linkedInChannelLink &&
                            errors.linkedInChannelLink}
                        </span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Linkdin social media link"
                          name="linkedInChannelLink"
                          value={aiFormData.linkedInChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>{" "}
                    </div>
                  </div>
                </div>
                <div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formOptionDetailsAlignment}>
                      <div
                        className={classNames(
                          styles.formInput,
                          styles.leftSide
                        )}
                      >
                        <label className={styles.secondPadding}>
                          Pricing{" "}
                          <span>*{errors.pricing && errors.pricing}</span>
                        </label>
                        <div className={styles.otherOptionDetails}>
                          {PricingDataArray?.map((item) => {
                            return (
                              <div
                                className={styles.allOtherDetailsMain}
                                key={item.name}
                              >
                                <div className={styles.optionFlexAlignment}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={item.name}
                                      name="pricing"
                                      value={item.name}
                                      checked={aiFormData.pricing?.includes(
                                        item.name
                                      )}
                                      onChange={(e) =>
                                        handleOnChange(e, item.type)
                                      }
                                    />

                                    <label htmlFor={item.name}></label>
                                  </div>
                                  <div
                                    className={styles.optionRightSideAlignment}
                                  >
                                    <label
                                      htmlFor={item?.name}
                                      className={styles.rightContentflex}
                                    >
                                      <img
                                        src={item.img}
                                        alt={`${item?.name}Icon`}
                                      />
                                      <p>{item?.name}</p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div
                        className={classNames(
                          styles.formInput,
                          styles.rightSide
                        )}
                      >
                        <label className={styles.secondPadding}>
                          Features{" "}
                          <span>{errors.features && errors.features}</span>
                        </label>
                        <div className={styles.otherOptionDetails}>
                          {FeaturesDataArray?.map((item, index) => {
                            return (
                              <div
                                className={styles.allOtherDetailsMain}
                                key={index}
                              >
                                <div className={styles.optionFlexAlignment}>
                                  <div>
                                    <input
                                      type="checkbox"
                                      id={item.name}
                                      name="features"
                                      value={item.name}
                                      onChange={(e) => handleOnChange(e)}
                                    />
                                    <label htmlFor={item.name}></label>
                                  </div>
                                  <div
                                    className={styles.optionRightSideAlignment}
                                  >
                                    <label
                                      htmlFor={item?.name}
                                      className={styles.rightContentflex}
                                    >
                                      <img
                                        src={item?.img}
                                        alt={`${item?.name}Icon`}
                                      />
                                      <p>{item.name}</p>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className={classNames(
                      styles.formBoxAlignment,
                      styles.formBoxAlignment
                    )}
                  >
                    <div className={styles.formInput}>
                      <label>Coupon Deals</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Get a disccount of X% by using the code ‘XXXXX’.  "
                          name="couponDeals"
                          value={aiFormData.couponDeals}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                      {errors.couponDeals && (
                        <div className={styles.errormessage}>
                          <p>{errors.couponDeals}</p>
                        </div>
                      )}
                    </div>
                    <div className={styles.formInput}>
                      <label>Paid Plan Deals</label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Starting at just $X/month"
                          name="paidPlanDeals"
                          value={aiFormData?.paidPlanDeals}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                      {errors.paidPlanDeals && (
                        <div className={styles.errormessage}>
                          <p>{errors.paidPlanDeals}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className={styles.formBoxAlignment}>
                    <div className={styles.formInput}>
                      <label>
                        Website youtube introduction video link{" "}
                        <span>
                          {errors.youTubeChannelLink &&
                            errors.youTubeChannelLink}
                        </span>
                      </label>
                      <div className={styles.input}>
                        <input
                          type="text"
                          placeholder="Website youtube introduction video link"
                          name="youTubeChannelLink"
                          value={aiFormData.youTubeChannelLink}
                          onChange={(e) => handleOnChange(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.formBoxAlignment}>
                <div className={styles.formInput}>
                  <label>
                    Short Description{" "}
                    <span>* {errors.description && errors.description}</span>
                  </label>
                  <div className={styles.input}>
                    <textarea
                      placeholder="Write a short description of your tool"
                      name="description"
                      value={aiFormData.description}
                      onChange={(e) => handleOnChange(e)}
                      className={styles.textareaWrap}
                    ></textarea>
                  </div>{" "}
                </div>
              </div>

              <div className={styles.formBoxAlignment}>
                <div className={styles.formInput}>
                  <label>
                    Description{" "}
                    <span>* {errors.details && errors.details}</span>
                  </label>
                  <div className={styles.input}>
                    <SunEditor
                      setOptions={{
                        buttonList: BUTTON_LIST,
                      }}
                      ref={sunEditorRef}
                      placeholder="Write a detailed description of your tool"
                      name="details"
                      className="custom-sun-editor"
                      onChange={(content) =>
                        handleEditorChange(content, "details")
                      }
                      background="red"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.formButtonAlignment}>
              <div className={styles.button}>
                <button
                  onClick={() => handleSubmit()}
                  aria-label="Submit Your Tool"
                >
                  Submit Your Tool{" "}
                  {loading && (
                    <div>
                      <div className={styles.spinner}></div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else if (isSuccessFull) {
    return (
      <MessagePage
        {...{
          text: "Submission Received",
          description:
            "Thank you for submitting your AI tool. We have received your submission and it is currently under review by our team.",
        }}
      />
    );
  }
}
