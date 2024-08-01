 
import { usePathname } from "next/navigation";

const GptMetaTag = ({ gptDetails }) => {
  const pathname = usePathname();
  if (gptDetails) {
    const titleTag = document.getElementsByTagName("title");

    if (titleTag?.[0]?.innerText) {
      titleTag[0].innerText = `${gptDetails?.projectName} `;
    }

    const metaKeywords = document.querySelector('meta[name="keywords"]');

    if (metaKeywords) {
      const newKeywords = `${gptDetails?.projectName} `;
      metaKeywords.setAttribute("content", newKeywords);
    }
    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute("content", gptDetails?.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      const newOgTitle = `${gptDetails?.projectName} `;
      ogTitle.setAttribute("content", newOgTitle);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]'
    );
    if (ogDescription) {
      ogDescription.setAttribute("content", gptDetails?.description);
    }
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      const newOgImageUrl = gptDetails?.icon;
      ogImage.setAttribute("content", newOgImageUrl);
    }
    const ogSecureImageUrl = document.querySelector(
      'meta[property="og:image:secure_url"]'
    );
    if (ogSecureImageUrl) {
      const newOgSecureImageUrl = gptDetails?.icon;
      ogSecureImageUrl.setAttribute("content", newOgSecureImageUrl);
    }
    const ogimgalt = document.querySelector('meta[property="og:image:alt"]');
    if (ogimgalt) {
      const newOgSecureImageUrl = `${gptDetails?.projectName} Logo`;
      ogimgalt.setAttribute("content", newOgSecureImageUrl);
    }
    const twitterSecureImageUrl = document.querySelector(
      'meta[name="twitter:image:secure_url"]'
    );
    if (twitterSecureImageUrl) {
      const newTwitterSecureImageUrl = gptDetails?.icon;
      twitterSecureImageUrl.setAttribute("content", newTwitterSecureImageUrl);
    }
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      const newTwitterTitle = `${gptDetails?.projectName} `;
      twitterTitle.setAttribute("content", newTwitterTitle);
    }

    const twitterDescription = document.querySelector(
      'meta[name="twitter:description"]'
    );
    if (twitterDescription) {
      twitterDescription.setAttribute("content", gptDetails?.description);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      const newTwitterImageUrl = gptDetails?.icon;
      twitterImage.setAttribute("content", newTwitterImageUrl);
    }
    const ogurl = document.querySelector('meta[property="og:url"]');
    if (ogurl) {
      const newOgUrl = `https://findmyaitool.com${pathname}`;
      ogurl.setAttribute("content", newOgUrl);
    }
    const twitterimgalt = document.querySelector(
      'meta[name="twitter:image:alt"]'
    );
    if (twitterimgalt) {
      const newOgUrl = `${gptDetails?.projectName} Logo`;
      twitterimgalt.setAttribute("content", newOgUrl);
    }
  }
  return <div></div>;
};

export default GptMetaTag;
