import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import {
  getAiTools,
  setSelectedDatesData,
  updateAiTools,
} from "@/store/ApiSlice/aiToolsSlice";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { AuthCodeValidation } from "@/store/ApiSlice/restAllSlice";
import { getSession } from "@/helpers/authHelper";
import dynamic from "next/dynamic";
const NoDataFound = dynamic(() => import("../../shared/components/404"), {
  ssr: true,
});
const Featuredyourtoolbanner = dynamic(
  () => import("./featuredyourtoolbanner"),
  {
    ssr: true,
  }
);
const Featuredyourtoolcard = dynamic(() => import("./featuredyourtoolcard"), {
  ssr: true,
});
const FeaturedToolsBottom = dynamic(() => import("./featuredToolsBottom"), {
  ssr: true,
});
const MessagePage = dynamic(
  () => import("../../shared/components/messagePage"),
  {
    ssr: true,
  }
);
export default function Featuredyourtool() {
  const params = useSearchParams();
  const transactionId = params.get("authcode");
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [className, setClassName] = useState(null);
  const userId = getSession()?.userInfo;
  const [isValidate, setValidation] = useState(true);
  const [loader, setLoader] = useState(true);
  const [isSuccessFull, setIsSuccessFull] = useState(false);
  const [isValidateMsg, setValidationMsg] = useState("");
  const dispatch = useDispatch();
  let toastCount = 0;
  useEffect(() => {
    const handleOnAuthCodeValidation = async () => {
      setLoader(true);
      try {
        const response = await dispatch(
          AuthCodeValidation({
            type: "featured-aiTool",
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
  const handleOnSubmit = () => {
    if (!getSession()?.access_token) {
      toast.error("Please login to use services");
    } else if (selectedDates?.length === 0) {
      if (toastCount < 3) {
        toast.error("Please select featured date");
        toastCount++;
      }
    } else {
      if (selectedTool && selectedDates?.length > 0) {
        const featuredStartDate = moment(selectedDates[0]).format("YYYY-MM-DD");
        const obj = {
          authcode: transactionId,
          start_date: featuredStartDate,
          tool_id: selectedTool?._id,
        };
        dispatch(updateAiTools(obj)).then((res) => {
          if (res?.payload?.success === true) {
            toast.success("Your tool has been featured");
            setIsSuccessFull(true);
            dispatch(setSelectedDatesData(res?.payload?.payload));
            dispatch(
              getAiTools({
                page: 1,
                limit: 12,
                status: "approved",
                uid: userId?._id,
                selectedData: true,
              })
            );
          } else {
            toast.error("Your tool has not been featured");
          }
        });
      }
    }
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
      <div>
        <Featuredyourtoolbanner
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
        <Featuredyourtoolcard
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
          setSelectedTool={setSelectedTool}
          selectedTool={selectedTool}
          setClassName={setClassName}
          className={className}
        />
        <FeaturedToolsBottom
          handleOnSubmit={handleOnSubmit}
          selectedDates={selectedDates}
          selectedTool={selectedTool}
        />
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
