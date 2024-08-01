import React from "react";
import dynamic from "next/dynamic";
const Categoriessection = dynamic(() => import("./categoriessection"), {
  ssr: true,
});
export default function Toolscategories() {
  return <Categoriessection />;
}
