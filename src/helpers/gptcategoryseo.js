import store from "@/store";
const homeImage = "/assets/images/homepage-w.webp";
import {  GetGptCategoryData } from "@/store/ApiSlice/gptSlice";
import { capitalizeWords } from "./common";


export async function GET_GPTCATEGORY_SEO(path,respo) {
    const dispatch = store.dispatch
   let data={}
   await    dispatch(GetGptCategoryData({ search:path }))
   .then((res) => {
     data = res?.payload?.payload?.categorys[0]
     if (! res?.payload?.payload?.categorys?.length) {
        respo?.writeHead(301, { Location: "/" }); // Redirect to the login page
        respo?.end();
        return { props: {} }; 
     }
   })

  
  const seoData = {
    Title: capitalizeWords(data?.name)+ " GPTs"|| "",
    Description: data?.description || "",
    KeyWords: `${capitalizeWords(data?.name)},${data?.mainCategory?.[0]?.name}`,
    url: path !== "home" ? `https://findmyaitool.com/gpt-category/${path}` : `https://findmyaitool.com` || "",
    OG_Img: data?.icon ||  process.env.NEXT_PUBLIC_SITEMAP_URL +homeImage,
    PageViewSchema: data?.pageViewSchema ?? {},
    Type: "software",
    dynamicData:data
  };
  if(seoData?.Title){
  return seoData;
  }
}
