import styles from "./featuredToolsBottom.module.scss";
import moment from "moment";
import { isEmpty } from "@/helpers/common";

export default function FeaturedToolsBottom({
  handleOnSubmit,
  selectedTool,
  selectedDates,
}) {

  const formatDate = (date) => {
    return moment(date).format("MMMM DD, YYYY");
  };
  return (
    <>
      {!isEmpty(selectedTool) && selectedDates.length > 0 ? (
        <div className={styles.featuredToolsBottom_section}>
          <div className="container">
            <div className={styles.notes_box_alignment}>
              <h6>Note:</h6>
              <p>
                Your <span> {selectedTool?.title}Ai tool</span> tool has already
                been featured from{" "}
                <span>
                  {selectedDates.length > 0
                    ? formatDate(selectedDates[0])
                    : formatDate(moment())}
                </span>{" "}
                to{" "}
                <span>
                  {selectedDates?.length > 1
                    ? formatDate(selectedDates[1])
                    : formatDate(moment().add(7, "days"))}
                </span>
              </p>
            </div>
            <div className={styles.featured_button_alignment}>
              <button
                onClick={() => handleOnSubmit()}
                aria-label="Save your Featured Tool"
              >
                Save your Featured Tool
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
