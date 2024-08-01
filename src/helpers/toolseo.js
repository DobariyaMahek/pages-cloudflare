import store from "@/store";
import { getAiToolsAllDetails } from "@/store/ApiSlice/aiToolsSlice";
import { capitalizeWords } from "./common";
const homeImage = "/assets/images/homepage-w.webp";

export async function GET_TOOL_SEO(path, respo) {
  const dispatch = store.dispatch;
  let data = {};
  let tooldata = {};
  await dispatch(getAiToolsAllDetails({ slugId: path })).then((res) => {
    data = res?.payload?.payload?.aiTool;
    tooldata = res?.payload?.payload;
    if (res?.payload?.payload?.aiTool?._id) {
    } else {
      respo?.writeHead(301, { Location: "/" }); // Redirect to the login page
      respo?.end();
      return { props: {} };
    }
  });

  const seoData = {
    Title: capitalizeWords(data?.title) || "",
    Description: data?.description || "",
    KeyWords: `${data?.title},${data?.aiToolSubCategoryId?.name}`,
    url:
      path !== "home"
        ? `https://findmyaitool.com/tool/${path}`
        : `https://findmyaitool.com` || "",
    OG_Img: data?.icon || process.env.NEXT_PUBLIC_SITEMAP_URL + homeImage,
    PageViewSchema: data?.pageViewSchema ?? {},
    Type: "software",
    dynamicData: tooldata,
  };
  if (seoData?.Title) {
    return seoData;
  }
}
