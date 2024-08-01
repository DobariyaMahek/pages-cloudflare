import React from "react";
import dynamic from "next/dynamic";
const Bookmarkedbanner = dynamic(() => import("./bookmarkedbanner"), {
  ssr: true,
});
const Bookmarkedcard = dynamic(() => import("./bookmarkedcard"), {
  ssr: true,
});
export default function Bookmarked() {
  return (
    <div>
      <Bookmarkedbanner />
      <Bookmarkedcard />
    </div>
  );
}
