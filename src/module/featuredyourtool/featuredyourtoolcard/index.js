import React, { useEffect, useRef } from "react";
import styles from "./featuredyourtoolcard.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { getAiTools } from "@/store/ApiSlice/aiToolsSlice";
import toast from "react-hot-toast";
import { getSession } from "@/helpers/authHelper";
import dynamic from "next/dynamic";
const Carddesign = dynamic(() => import("../../home/cardSection/carddesign"), {
  ssr: true,
});
const Pagination = dynamic(
  () => import("../../../shared/components/pagination"),
  {
    ssr: true,
  }
);
const Nodatashow = dynamic(
  () => import("../../../shared/components/nodatashow"),
  {
    ssr: true,
  }
);
export default function Featuredyourtoolcard({
  setSelectedTool,
  selectedTool,
}) {
  const dispatch = useDispatch();
  const { getAllAiTools, count, loading } = useSelector(
    (state) => state.aiTools
  );
  const isFirstRender = useRef(true);
  const { page } = useSelector((state) => state.gpt);
  const tokendata = getSession()?.access_token;
  const userId = getSession()?.userInfo;
  const nPages = Math.ceil(count / 12);
  useEffect(() => {
    if (!tokendata) {
      toast.error("Please login to show your features tools ");
    } else {
      dispatch(
        getAiTools({
          page: page,
          limit: 12,
          uid: userId?._id,
          selectedData: true,
        })
      );
    }
    if (!isFirstRender.current) {
      window.scrollTo(
        0,
        document.body.clientHeight * 0.3 - window.innerHeight * 0.3,
        "smooth"
      );
    } else {
      isFirstRender.current = false;
    }
  }, [page, tokendata]);

  const handleView = (item) => {
    setSelectedTool(item);
  };

  return (
    <div className={styles.featuredyourtoolcardAllContnetAlignment}>
      <div className="container">
        <div className={styles.titleAlignment}></div>{" "}
        <div>
          {loading ? (
            <div className={styles.grid}>
              {[...Array(12)]?.map((_, index) => (
                <React.Fragment key={index}>
                  <Carddesign loading={loading} />
                </React.Fragment>
              ))}
            </div>
          ) : tokendata && getAllAiTools?.length > 0 ? (
            <>
              <div className={styles.grid}>
                {getAllAiTools?.map((aiTool, index) => {
                  return (
                    <div key={index} onClick={() => handleView(aiTool)}>
                      <Carddesign
                        images={aiTool?.images?.[0]}
                        name={aiTool?.title}
                        description={aiTool?.aiToolSubCategoryId?.name}
                        icon={aiTool?.icon}
                        isSelected={selectedTool?._id === aiTool?._id} // Pass isSelected prop
                        item={aiTool}
                      />
                    </div>
                  );
                })}
              </div>
              {count > 12 && <Pagination nPages={nPages} currentPage={page} />}
            </>
          ) : (
            <Nodatashow />
          )}
        </div>
      </div>
    </div>
  );
}
