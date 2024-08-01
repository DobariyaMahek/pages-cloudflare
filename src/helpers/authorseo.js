import store from "@/store";
const homeImage = "/assets/images/homepage-w.webp";
import { getSingleAuthor } from "@/store/ApiSlice/blogSlice";


export async function GET_AUTHOR_SEO(path,respo) {
    const dispatch = store.dispatch
  
   let data={}

   await    dispatch(getSingleAuthor({ text: path }))
   .then((res) => {
     data = res?.payload?.addAuthors?.data?.[0]?.attributes
     if (!res?.payload?.addAuthors?.data?.length) {
        respo?.writeHead(301, { Location: "/" }); // Redirect to the login page
        respo?.end();
        return { props: {} }; 
     }
   })

  const seoData = {
    Title: data?.author_name || "",
    Description: data?.description || "",
    KeyWords: `${data?.author_name}` || "",
    url: path !== "home" ? `https://findmyaitool.com/authors/${path}` : `https://findmyaitool.com` || "",
    OG_Img: data?.author_profile?.data?.attributes?.url ||  process.env.NEXT_PUBLIC_SITEMAP_URL +homeImage,
    PageViewSchema: data?.pageViewSchema ?? {},
    Type: "article",
    dynamicData:data
  };
  if(seoData?.Title){
  return seoData;
  }
}
