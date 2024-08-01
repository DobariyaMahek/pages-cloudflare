import "../styles/globals.css";
import "../styles/mixins/index.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-loading-skeleton/dist/skeleton.css";
import { GET_SEO } from "@/helpers/seo";
import MetaSEO from "@/module/NextSeo";
import { GET_CATEGORY_SEO } from "@/helpers/categoryseo";
import { useEffect } from "react";
import { GET_BLOG_SEO } from "@/helpers/blogseo";
import { GET_AUTHOR_SEO } from "@/helpers/authorseo";
import { GET_GPT_SEO } from "@/helpers/gptseo";
import { GET_GPTCATEGORY_SEO } from "@/helpers/gptcategoryseo";
import { GET_TOOL_SEO } from "@/helpers/toolseo";
import Wrapper from "@/shared/components/wrapper";
export const runtime = "experimental-edge";
function App({ Component, pageProps, router, seoData }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js", { scope: "/" })
        .then((registration) => {})
        .catch((error) => {});
    }
  }, []);
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `.spinner { display: none }`;
    document.documentElement.appendChild(style);
  }, []);
  return (
    <>
      <MetaSEO seo={seoData} />
      <Wrapper>
        <Component {...pageProps} seoData={seoData} />
      </Wrapper>
    </>
  );
}

App.getInitialProps = async ({ Component, ctx, context }) => {
  let seoData = {};

  if (Component.getInitialProps) {
    const pageProps = await Component.getInitialProps(ctx);
    seoData = { ...seoData, ...pageProps.seoData };
  }
  const { pathname, query, res } = ctx;
  let response = { Title: "FindmyTool" };

  // Fetch SEO data from the server-side API
  if (pathname == "/category/[slug]") {
    response = await GET_CATEGORY_SEO(ctx.query.slug, res);
  } else if (ctx.pathname == "/blog/[slug]") {
    response = await GET_BLOG_SEO(ctx.query.slug, res);
  } else if (ctx.pathname == "/authors/[slug]") {
    response = await GET_AUTHOR_SEO(ctx.query.slug, res);
  } else if (ctx.pathname == "/gpt/[slug]") {
    response = await GET_GPT_SEO(ctx.query.slug, res);
  } else if (ctx.pathname == "/gpt-category/[categorySulg]") {
    response = await GET_GPTCATEGORY_SEO(ctx.query.categorySulg, res);
  } else if (ctx.pathname == "/tool/[toolSlug]") {
    response = await GET_TOOL_SEO(ctx.query.toolSlug, res);
  } else {
    response = await GET_SEO(ctx.pathname?.replace("/", "") || "home");
  }

  seoData = { ...seoData, ...response };

  return { seoData };
};

export default App;
