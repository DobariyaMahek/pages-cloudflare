import store from "@/store";
import { getAiToolsSubCategory } from "@/store/ApiSlice/aiToolsSlice";
const homeImage = "/assets/images/homepage-w.webp";

export async function GET_CATEGORY_SEO(path,respo) {
    const dispatch = store.dispatch
   let data={}
    await dispatch(getAiToolsSubCategory({ search: path })).then((response)=>{
        data=response?.payload?.payload?.aiToolSubCategory[0]
        if (! response?.payload?.payload?.aiToolSubCategory?.length) {
          respo?.writeHead(301, { Location: "/" }); // Redirect to the login page
          respo?.end();
          return { props: {} }; 
       }
    })
     
  const seoData = {
    Title: data?.metaTitle || "",
    Description: data?.metaDescription || "",
    KeyWords: data?.metaKeywords?.map((item) => item)?.join(", ") || "",
    url: path !== "home" ? `https://findmyaitool.com/category/${path}` : `https://findmyaitool.com` || "",
    OG_Img:data?.metaImg ||  process.env.NEXT_PUBLIC_SITEMAP_URL +homeImage,
    PageViewSchema: data?.pageViewSchema ?? {},
    Type: "website",
    dynamicData:data
  };
  if(seoData?.Title){
  return seoData;
  }
}
