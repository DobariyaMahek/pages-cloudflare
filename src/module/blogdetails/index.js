import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import Maturecontentmodal from "@/shared/components/maturecontentmodal";
import Blogdetailsbanner from "./blogdetailsbanner";
import Blogdetailslist from "./blogdetailslist";

export default function Blogdetails({ seoData }) {
  const [blogDetail, setBlogDetail] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setBlogDetail(seoData?.dynamicData);
  }, [seoData]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);
  useEffect(() => {
    const nsfwCategory = blogDetail?.blog_categories?.data?.some(
      (category) => category?.attributes?.title === "NSFW"
    );

    if (nsfwCategory) {
      const isOver18 = Cookies.get("18over");
      if (!isOver18) {
        setShowModal(true);
      }
    }
  }, [blogDetail]);

  const handleOver18 = () => {
    const now = new Date();
    const expireTime = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0
    );
    Cookies.set("18over", "yes", { expires: expireTime });
    setShowModal(false);
  };
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [showModal]);
  return (
    <div>
      {showModal &&<Maturecontentmodal {...{ showModal, handleOver18 }} />}
      <Blogdetailsbanner blogDetail={blogDetail} />
      <Blogdetailslist blogDetail={blogDetail} />
    </div>
  );
}
