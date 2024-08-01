 

import React, { } from "react";
import styles from "./featuredyourtoolbanner.module.scss";
import Flatpickr from "react-flatpickr";
import toast from "react-hot-toast";
import moment from "moment";
import "flatpickr/dist/flatpickr.css";
const DateIcon = "/assets/icons/date.webp";
export default function Featuredyourtoolbanner({
  selectedDates,
  setSelectedDates,
}) {
  const handleDateChange = (date) => {
    const selectedDate = moment(date[0]);
    const today = moment().startOf("day");
    if (selectedDate.isBefore(today, "day")) {
      toast.error("Selected date should be today or later");
    } else {
      const startDate = date[0];
      let sevenDaysLaterDate = new Date(startDate);
      sevenDaysLaterDate.setDate(sevenDaysLaterDate.getDate() + 7);
      let data = [startDate, sevenDaysLaterDate];
      setSelectedDates(data);
    }
  };

  return (
      <div className={styles.featuredyourtoolbanner}>
        <div className="container">
          <div className={styles.title}>
            <h3>Featured Your Tool</h3>

            <p>
              Select one of your AI tools and choose the start date for its
              feature spotlight
            </p>
            <div className={styles.centnerAlignment}>
              <div className={styles.inputBox}>
                <Flatpickr
                  value={selectedDates}
                  placeholder="Select Date"
                  onChange={handleDateChange}
                  options={{
                    minDate: "today",
                    dateFormat: "d-m-Y",
                    maxDate: new Date().fp_incr(365), // Limit selectable dates to one year from now
                  }}
                />

                <div className={styles.searchIcon}>
                  <img loading="lazy" src={DateIcon} alt="DateIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
