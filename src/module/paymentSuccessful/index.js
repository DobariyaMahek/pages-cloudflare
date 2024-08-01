import React, { useEffect } from "react";
import styles from "./paymentSuccessful.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import {
  AuthCodeValidation,
  getPaymentbyAuthCode,
} from "@/store/ApiSlice/restAllSlice";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
const SuccessIcon = "/assets/icons/success-icon.webp";
import dynamic from "next/dynamic";
const MessagePage = dynamic(
  () => import("../../shared/components/messagePage"),
  {
    ssr: true,
  }
);
const NoDataFound = dynamic(() => import("../../shared/components/404"), {
  ssr: true,
});
export default function PaymentSuccessful() {
  const dispatch = useDispatch();
  const params = useSearchParams();
  const transactionId = params.get("authcode");
  const [paymentData, setPaymentData] = useState({});
  const [isValidate, setValidation] = useState(true);
  const [isValidateMsg, setValidationMsg] = useState("");
  const [loading, setLoader] = useState(true);

  useEffect(() => {
    const handleOnAuthCodeValidation = async () => {
      try {
        setLoader(true);
        const response = await dispatch(
          AuthCodeValidation({ type: "receipt", authcode: transactionId })
        );
        if (response?.payload?.success) {
          const paymentResponse = await dispatch(
            getPaymentbyAuthCode({ transactionId })
          );
          const paymentPayload = paymentResponse?.payload?.payload;

          if (paymentPayload && paymentPayload?.paymentData) {
            setPaymentData(paymentPayload?.paymentData);
            setValidation(true);
          } else {
            setValidation(false);
          }
        } else {
          setValidation(false);
          setValidationMsg(response?.payload?.message);
        }
        setTimeout(() => {
          setLoader(false);
        }, 1000);
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

  const createAvatar = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };
  if (!transactionId && !loading) {
    return <NoDataFound />;
  } else if (!isValidate) {
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
  } else {
    return (
      <div className={styles.paymentSuccessFullSection}>
        <div className="container">
          <div className={styles.paymentSuccessBg}>
            <div className={styles.paymentMain}>
              <div className={styles.paymentTopDetails}>
                <div className={styles.successIcon}>
                  {loading ? (
                    <Skeleton
                      baseColor="#cccccc29"
                      circle={true}
                      height={60}
                      width={60}
                    />
                  ) : (
                    <img loading="lazy" src={SuccessIcon} alt="SuccessIcon" />
                  )}
                </div>
                <div>
                  {loading ? (
                    <>
                      <h4>
                        {" "}
                        <Skeleton
                          baseColor="#cccccc29"
                          height={26}
                          width={150}
                        />
                      </h4>
                      <p>
                        <Skeleton
                          baseColor="#cccccc29"
                          height={16}
                          width={200}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <h4>Payment Success!</h4>
                      <p>Thank you for your transfer</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.paymentBottomDetails}>
              {loading ? (
                <div className={styles.paymentProfileDetails}>
                  <Skeleton
                    baseColor="#cccccc29"
                    height={58}
                    width={58}
                    circle={true}
                  />

                  <div>
                    <h6>
                      <Skeleton baseColor="#cccccc29" height={26} width={200} />
                    </h6>
                    <p>
                      <Skeleton baseColor="#cccccc29" height={16} width={200} />
                    </p>
                  </div>
                </div>
              ) : (
                <div className={styles.paymentProfileDetails}>
                  <div className={styles.paymentProfileImg}>
                    <div className={styles?.avatar}>
                      {createAvatar(paymentData?.uid?.fname)}
                    </div>
                  </div>
                  <div>
                    <h6>{paymentData?.uid?.fname}</h6>
                    <p>{paymentData?.uid?.email}</p>
                  </div>
                </div>
              )}

              {loading ? (
                <div className={styles.priceAlignment}>
                  <h5>$00.00</h5>
                </div>
              ) : (
                <div className={styles.priceAlignment}>
                  <h5>${paymentData?.subscriptionPlanData?.price}</h5>
                </div>
              )}

              <>
                <div className={styles.notesAlignment}>
                  <span>NOTE</span>
                  <p>
                    {paymentData?.subscriptionPlanData?.slugId ==
                    "standard_plan"
                      ? "You will also receive the submit tool link and feature tool link at your registered email address. If you haven't received the email, you can reach out to us at info@findmyaitool.com"
                      : paymentData?.subscriptionPlanData?.slugId ==
                        "featured_plan"
                      ? "You will also receive the feature tool link at your registered email address. If you haven't received the email, you can reach out to us at info@findmyaitool.com"
                      : "You will also receive the submit tool link at your registered email address. If you haven't received the email, you can reach out to us at info@findmyaitool.com"}
                  </p>
                </div>
                {loading ? (
                  <div className={styles.submitButton}>
                    <div className={styles.buttonAlignment}>
                      <Skeleton baseColor="#cccccc29" height={50} width={355} />
                    </div>
                  </div>
                ) : (
                  paymentData?.subscriptionPlanData?.slugId !==
                    "featured_plan" && (
                    <Link
                      prefetch={false}
                      href={`/auth/purchase/submit-ai-form?authcode=${transactionId}`}
                    >
                      <div className={styles.submitButton}>
                        <div className={styles.buttonAlignment}>
                          <button aria-label="Click Here to Submit Your Tool">
                            Click Here to Submit Your Tool
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                )}

                {loading ? (
                  <div className={styles.submitButton}>
                    <div className={styles.buttonAlignment}>
                      <Skeleton baseColor="#cccccc29" height={50} width={355} />
                    </div>
                  </div>
                ) : (
                  paymentData?.subscriptionPlanData?.slugId !==
                    "basic_plan" && (
                    <Link
                      prefetch={false}
                      href={`/auth/purchase/featured-tool?authcode=${transactionId}`}
                    >
                      <div className={styles.submitButton}>
                        <div className={styles.buttonAlignment}>
                          <button aria-label="Click Here to Feature Your Tool">
                            Click Here to Feature Your Tool
                          </button>
                        </div>
                      </div>
                    </Link>
                  )
                )}
              </>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
