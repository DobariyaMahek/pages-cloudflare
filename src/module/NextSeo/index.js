import Head from "next/head";
import { NextSeo } from "next-seo";
const MetaSEO = ({ seo }) => {

  return (
    <>
      <NextSeo
        title={seo?.Title}
        description={seo?.Description}
        canonical={seo?.url}
        openGraph={{
          url: `${seo?.url}`,
          title: `${seo?.Title}`,
          description: `${seo?.Description}`,
          images: [
            {
              url: `${seo?.OG_Img}`,
              alt: `${seo?.Title}`,
              width: 1024,
              height: 768,
            },
          ],
          siteName: "findmyaitool.com",
          type: `${seo?.Type}`,
        }}
        twitter={{
          handle: "@findmyaitool",
          site: "@findmyaitool",
          cardType: "summary_large_image",
        }}
      />
      <Head>
        <meta name="keywords" content={seo?.KeyWords} />
        <meta property="og:image:secure_url" content={seo?.OG_Img} />
        <meta name="twitter:title" content={seo?.Title} />
        <meta name="twitter:description" content={seo?.Description} />
        <meta name="twitter:image" content={seo?.OG_Img} />
        <meta name="twitter:image:alt" content={seo?.Title} />
        {seo?.PageViewSchema && (
          <script
            async
            id="PageViewSchema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo?.PageViewSchema),
            }}
          />
        )}
      </Head>
    </>
  );
};
export default MetaSEO;
