import GET_SEO_DATA from "@/graphql/query/getSeoData";
import client from "./apolloClient";
const homeImage = "/assets/images/homepage-w.webp";


export async function GET_SEO(path) {
  const { data } = await client.query({
    query: GET_SEO_DATA,
    variables: {
      filters: {
        slug: {
          eq: path,
        },
      },
    },
    fetchPolicy: "network-only",
  });

  let staticData = path == "auth/purchase/receipt" ? "Purchase Receipt" :
    path == "auth/purchase/featured-tool" ? "Feature Your Tool" :
      path == "auth/purchase/submit-ai-form" ? "Sumbmit AI Tool" :
        path == "user/bookmark" ? "Bookmarked AI Tools" :
          path == "user/gpt-bookmark" ? "Bookmarked GPT's" :
            "404 - Page Not Found";

  const seoData = {
    Title: data?.staticMetatags?.data?.[0]?.attributes?.metaTitle || staticData,
    Description: data?.staticMetatags?.data?.[0]?.attributes?.metaDescription || "",
    KeyWords: data?.staticMetatags?.data?.[0]?.attributes?.keywords?.map((item) => item?.name)?.join(", ") || "",
    url: path !== "home" ? `https://findmyaitool.com/${path}` : `https://findmyaitool.com` || "",
    OG_Img: data?.staticMetatags?.data?.[0]?.attributes?.metaImg?.data?.attributes?.url ||  process.env.NEXT_PUBLIC_SITEMAP_URL +homeImage,
    PageViewSchema: data?.staticMetatags?.data?.[0]?.attributes?.pageViewSchema ? data?.staticMetatags?.data?.[0]?.attributes?.pageViewSchema : {},
    Type: path === "blog" ? "article" : path?.includes("tool/") || path?.includes("gpt/") ? "software" : "website",
  };
  return seoData;
}
