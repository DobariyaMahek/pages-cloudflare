import ToolsDetails from "@/module/toolsdetails";
export const runtime = "experimental-edge";
export default function index({ seoData }) {
  return <ToolsDetails seoData={seoData} />;
}
