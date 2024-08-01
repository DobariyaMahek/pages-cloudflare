import React, { useState } from "react";
import styles from "./prisingDetails.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { addSubscriptionPlan } from "@/store/ApiSlice/subscriptionPlanSlice";
import Skeleton from "react-loading-skeleton";
import toast from "react-hot-toast";
import { getSession } from "@/helpers/authHelper";
import { isEmpty } from "@/helpers/common";
import dynamic from "next/dynamic";
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
const RightSign = "/assets/icons/right-check-sign.webp";
const closeSign = "/assets/icons/close-sign.webp";

export default function PrisingDetails({ loading }) {
  const { getAllplan } = useSelector((state) => state.subscriptionPlan);


  const [loader, setLoader] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const dispatch = useDispatch();

  const handlePurchesPlan = (item) => {
    if (isEmpty(getSession()?.access_token)) {
      return toast.error("Please login to use services");
    }
    setLoader(true);
    setSelectedPlan(item);

    dispatch(addSubscriptionPlan({ id: item?._id }))
      .unwrap()
      .then((res) => {
        window.open(res?.payload, "_self");
        setTimeout(() => {
          setLoader(false);
        }, 800);
      })
      .catch((err) => {
        setLoader(false);
      });
  };
  return (
    <div className={styles.prisingSection}>
      <div>
        {loading ? (
          <div className={styles.prisingGrid}>
            {Array.from({ length: 3 }).map((_, i) => (
              <div className={styles.prisingGridItem} key={i}>
                <Skeleton height={500} baseColor="#cccccc29" className={styles.paymentCardSkeletonAlignment} />
              </div>
            ))}
          </div>
        ) : getAllplan?.length > 0 ? (
          <div className={styles.prisingGrid}>
            {getAllplan.map((item, i) => {
              return (
                <div className={styles.prisingGridItem} key={i}>
                  <div className={styles.prisingBox}>
                    <div className={styles.prisingTop}>
                      <h6>{item?.name}</h6>
                      <span>
                        {item?.slugId == "basic_plan"
                          ? "List Your Tool"
                          : item?.slugId == "featured_plan"
                          ? "Sponsor Your Tool"
                          : "List & Sponsor Your Tool"}
                      </span>
                      <div className={styles.priceDetails}>
                        <p>${item?.price}</p>
                        <span>One Time Fee</span>
                      </div>
                    </div>
                    <div className={styles.prisignPlanList}>
                      <div className={styles.listName}>
                        <div className={styles.prisingIcon}>
                          <img
                            loading="lazy"
                            src={
                              item?.slugId === "featured_plan"
                                ? closeSign
                                : RightSign
                            }
                            alt="RightSign"
                          />
                        </div>
                        <p>Submit one AI tool for listing.</p>
                      </div>
                      <div className={styles.listName}>
                        <div className={styles.prisingIcon}>
                          <img
                            loading="lazy"
                            src={
                              item?.slugId === "basic_plan"
                                ? closeSign
                                : RightSign
                            }
                            alt="closeSign"
                          />
                        </div>
                        <p>
                          Displaying the tool at the top of that category for 7
                          days.{" "}
                        </p>
                      </div>
                      <div className={styles.listName}>
                        <div className={styles.prisingIcon}>
                          <img
                            loading="lazy"
                            src={
                              item?.slugId === "basic_plan"
                                ? closeSign
                                : RightSign
                            }
                            alt="closeSign"
                          />
                        </div>
                        <p>
                          Tool will be featured on the website's homepage on a
                          rotating basis for 7 days.{" "}
                        </p>
                      </div>
                      <div className={styles.listName}>
                        <div className={styles.prisingIcon}>
                          <img loading="lazy" src={RightSign} alt="RightSign" />
                        </div>
                        <p>Standard support.</p>
                      </div>
                    </div>
                    <div className={styles.selectButton}>
                      <button
                        onClick={() => (loader ? {} : handlePurchesPlan(item))}
                        aria-label="select Plan"
                        disabled={loader}
                      >
                        Select Plan
                        {selectedPlan === item && loader && (
                          <span className={styles.loader}></span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          !loading && <Nodatashow />
        )}
      </div>
    </div>
  );
}
