import store from "@/store";
const homeImage = "/assets/images/homepage-w.webp";
import { GetSingleGpt } from "@/store/ApiSlice/gptSlice";
import { capitalizeWords } from "./common";


export async function GET_GPT_SEO(path,respo) {
    const dispatch = store.dispatch
   let data={}
   await   dispatch(
    GetSingleGpt({
      slugId: path,
      selectedData: "false",
      isRandom: false,
    })
  )
   .then((res) => {
     data = res?.payload?.payload?.app?.[0]
     if (!res?.payload?.payload?.app?.length) {
        respo?.writeHead(301, { Location: "/" }); // Redirect to the login page
        respo?.end();
        return { props: {} }; 
     }
   })

  const seoData = {
    Title: data?.projectName || "",
    Description: data?.description || "",
    KeyWords: `${data?.projectName},${capitalizeWords(data?.category?.[0]?.name)}` || "",
    url: path !== "home" ? `https://findmyaitool.com/gpt/${path}` : `https://findmyaitool.com` || "",
    OG_Img: data?.icon||  process.env.NEXT_PUBLIC_SITEMAP_URL +homeImage,
    PageViewSchema: data?.pageViewSchema ?? {},
    Type: "software",
    dynamicData:data
  };
  if(seoData?.Title){
  return seoData;
  }
}
