import { Html, Head, Main, NextScript } from "next/document";
import { Fragment } from "react";
export default function Document() {
  return (
    <Html lang="en">
      <Fragment>
        <Head>
          <link
            rel="icon"
            href="/assets/logo/favicon-icon.svg"
            sizes="any"
            as="image"
          />
          <link
            rel="preload"
            href="/assets/images/docs-right.webp"
            sizes="any"
            as="image"
          />
          {/* <link rel="preload" href="/assets/icons/Jasper.webp" sizes="any" as="image" />
          <link rel="preload" href="/assets/icons/Chatgpt.webp" sizes="any" as="image" />
          <link rel="preload" href="/assets/icons/bing.webp" sizes="any" as="image" />
          <link rel="preload" href="/assets/icons/loopin.webp" sizes="any" as="image" /> */}
          <link
            rel="preload"
            href="/assets/icons/close-white-icon.webp"
            sizes="any"
            as="image"
          />
          <link
            rel="preload"
            href="/assets/icons/google-icon.webp"
            sizes="any"
            as="image"
          />
          {process.env.NEXT_PUBLIC_SITEMAP_URL &&
            process.env.NEXT_PUBLIC_SITEMAP_URL ==
              "https://findmyaitool.com" && (
              <>
                {/* Google tag (gtag.js) */}
                <script
                  async
                  src="https://www.googletagmanager.com/gtag/js?id=G-397N53RFW8"
                  strategy="worker"
                ></script>
                <script
                  async
                  dangerouslySetInnerHTML={{
                    __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-397N53RFW8');
        `,
                  }}
                />

                {/* Google Ads tag */}
                <script
                  async
                  src="https://www.googletagmanager.com/gtag/js?id=AW-16459444902"
                  strategy="worker"
                ></script>
                <script
                  async
                  dangerouslySetInnerHTML={{
                    __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-16459444902');
          gtag('event', 'conversion', {
            'send_to': 'AW-16459444902/rl6BCMW03ZEZEKblvKg9'
          });
        `,
                  }}
                />

                {/* Google Tag Manager */}
                <script
                  async
                  dangerouslySetInnerHTML={{
                    __html: `
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P5395L3V');
        `,
                  }}
                />

                {/* Meta Pixel Code */}
                <script
                  async
                  dangerouslySetInnerHTML={{
                    __html: `
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '377839228051698');
          fbq('track', 'PageView');
        `,
                  }}
                />
                <noscript>
                  <img
                    height="1"
                    width="1"
                    style={{ display: "none" }}
                    src="https://www.facebook.com/tr?id=377839228051698&ev=PageView&noscript=1"
                    alt="facebook"
                  />
                </noscript>

                {/* Microsoft Clarity */}
                <script
                  async
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `
           (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mmjkn59fw9");
        `,
                  }}
                />
                <script
                  async
                  type="application/javascript"
                  src="https://news.google.com/swg/js/v1/swg-basic.js"
                  strategy="worker"
                ></script>
                <script
                  async
                  type="text/javascript"
                  dangerouslySetInnerHTML={{
                    __html: `
            (self.SWG_BASIC = self.SWG_BASIC || []).push( basicSubscriptions => {
              basicSubscriptions.init({
                type: "NewsArticle",
                isPartOfType: ["Product"],
                isPartOfProductId: "CAoww7bRCw:openaccess",
                clientOptions: { theme: "light", lang: "en" },
              })
            })
        `,
                  }}
                />
              </>
            )}
        </Head>
      </Fragment>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
