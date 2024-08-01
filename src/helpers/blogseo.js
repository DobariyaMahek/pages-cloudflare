import store from "@/store";
const homeImage = "/assets/images/homepage-w.webp";
import { getBlog } from "@/store/ApiSlice/blogSlice";


export async function GET_BLOG_SEO(path,respo) {
    const dispatch = store.dispatch
   let data={}
   await dispatch(getBlog({ slug: path,page:1,pageSize:1}))
   .then((res) => {
     data = res?.payload?.blogs?.data?.[0]?.attributes
     if (!res?.payload?.blogs?.data?.length) {
        respo?.writeHead(301, { Location: "/" }); // Redirect to the login page
        respo?.end();
        return { props: {} }; 
     }
   })

  const seoData = {
    Title: data?.seo?.title || "",
    Description: data?.seo?.description || "",
    KeyWords: data?.seo?.keywords?.map((item) => item.name)?.join(", ") || "",
    url: path !== "home" ? `https://findmyaitool.com/blog/${path}` : `https://findmyaitool.com` || "",
    OG_Img: data?.coverImage?.data?.attributes?.url ||  process.env.NEXT_PUBLIC_SITEMAP_URL +homeImage,
    PageViewSchema: data?.seo?.pageViewSchema ?? {},
    Type: "article",
    dynamicData:data
  };
  if(seoData?.Title){
  return seoData;
  }
}
