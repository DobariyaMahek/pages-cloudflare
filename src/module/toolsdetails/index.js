import React, { useEffect, useState } from "react";
import styles from "./toolsdetails.module.scss";
import ToolsdetailsBreadcrumbs from "./toolsdetailsBreadcrumbs";
import ToolsDetailsMain from "./toolsdetailsmain";
import ToolsDetailsAllDetails from "./toolsdetailsallDetails";
import PromoteWorkHack from "./promoteworkHack";
import Categoriestools from "../categoriesdetails/categoriestools";
import ExploreGptTools from "../home/exploregptTools";
import { useSelector } from "react-redux";

export default function ToolsDetails({ seoData }) {
    const { toolsloader } = useSelector((state) => state.aiTools);

  const [categoryToolsDetails, setCategoryToolsDetails] = useState({});
  useEffect(() => {
    setCategoryToolsDetails(seoData?.dynamicData);
  }, [seoData]);
  return (
    <div className={styles.toolsCategoryAlignment}>
      <div className="container">
        <ToolsdetailsBreadcrumbs categoryToolsDetails={categoryToolsDetails} />
        <ToolsDetailsMain
          categoryToolsDetails={categoryToolsDetails}
          {...{ setCategoryToolsDetails }}
        />
        <div className={styles.detailComponentAlignment}>
          <ToolsDetailsAllDetails categoryToolsDetails={categoryToolsDetails} />
        </div>
      </div>
      <PromoteWorkHack />
      <div className="container">
        <Categoriestools categoryToolsDetails={categoryToolsDetails} />
      </div>
      <ExploreGptTools
        categoryToolsDetails={categoryToolsDetails}
        loading={toolsloader}
      />
    </div>
  );
}
