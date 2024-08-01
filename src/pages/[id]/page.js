import React from "react";
export const runtime = "edge";
const page = ({ params }) => {
  return <div>{JSON.stringify(params)}</div>;
};

export default page;
