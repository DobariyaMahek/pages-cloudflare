
import React, { useState } from "react";
import styles from "./footer.module.scss";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { PostSubscribe } from "@/store/ApiSlice/restAllSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import LazyImage from "@/helpers/lazyImage";
const FooterImg = "/assets/images/footer-img-w.webp";
const EmailIcon = "/assets/icons/email-icon.webp";
const Logo = "/assets/logo/findmylogo1.webp";
const SocialIcon1 = "/assets/icons/social-icon-1.webp";
const SocialIcon2 = "/assets/icons/social-icon-2.webp";
const SocialIcon3 = "/assets/icons/social-icon-3.webp";
const SocialIcon4 = "/assets/icons/social-icon-4.webp";
const SocialIcon5 = "/assets/icons/social-icon-5.webp";
const FooterEmailIcon = "/assets/icons/blue-email-icon.webp";
export default function Footer() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({});
  const pathname = usePathname();
  const handleOnChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value?.trim() });
  };
  const handleOnSubscribe = () => {
    if (!values?.email || values?.email === "") {
      toast.error("Please enter email");
    } else if (!values?.email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      toast.error("Please enter a valid email address!");
    } else {
      const body = {
        email: values.email,
      };
      dispatch(PostSubscribe(body))
        .then((res) => {
          if (res?.payload?.success == true) {
            toast.success(res.payload?.message);
            setValues({ email: "" });
          } else {
            toast.error(res?.payload?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.payload?.message);
        });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        {pathname === "/" && (
          <div className={styles.footerBoxALignment}>
            <div className={styles.footerImg}>
              <LazyImage
                image={{
                  src: FooterImg,
                  alt: "FooterImg",
                }}
              />
            </div>
            <div className={styles.footerRightSIde}>
              <h3>Stay tuned!</h3>
              <p>
                Get the latest articles and business updates that you need to
                know, you’ll even get special recommendations weekly.
              </p>

              <div className={styles.searchInputAlignment}>
                <div className={styles.subscribeInput}>
                  <div className={styles.emailBox}>
                    <LazyImage
                      image={{
                        src: EmailIcon,
                        alt: "EmailIcon",
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    name="email"
                    value={values?.email?.trimStart()}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <div className={styles.subscribeButton}>
                  <button
                    onClick={() => {
                      handleOnSubscribe();
                    }}
                    aria-label="Subscribe"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className={styles.footerAlignment}>
          <div className={styles.footerGrid}>
            <div className={styles.footerLeftSide}>
              <div className={styles.logoDesign}>
                <Link prefetch={false} href={"/"}>
                  <Image
                    src={Logo}
                    alt={`Logo`}
                    quality={80}
                    priority={true}
                    width={100}
                    height={100}
                    layout="responsive"
                  />
                </Link>
              </div>
              <p>
                FindMyAITool is a website dedicated to providing a comprehensive
                list of AI tools to assist individuals and businesses in finding
                the most suitable AI tool for their specific requirements.
              </p>
              <div className={styles.socialIconFlex}>
                <a
                  href="https://www.instagram.com/findmyaitool/"
                  target="_blank"
                  className={styles.socialIconAlignment}
                  aria-label="visit-instagram"
                >
                  <LazyImage
                    image={{
                      src: SocialIcon1,
                      alt: "insta",
                    }}
                  />
                </a>
                <a
                  href="https://www.facebook.com/findmyaitool.official"
                  target="_blank"
                  className={styles.socialIconAlignment}
                  aria-label="visit-facebook"
                >
                  <LazyImage
                    image={{
                      src: SocialIcon2,
                      alt: "facebook",
                    }}
                  />
                </a>
                <a
                  href="https://twitter.com/findmyaitool
"
                  target="_blank"
                  className={styles.socialIconAlignment}
                  aria-label="visit-twitter"
                >
                  <LazyImage
                    image={{
                      src: SocialIcon3,
                      alt: "twiter",
                    }}
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/findmyaitool"
                  target="_blank"
                  className={styles.socialIconAlignment}
                  aria-label="visit-linkdin"
                >
                  <LazyImage
                    image={{
                      src: SocialIcon4,
                      alt: "linkdin",
                    }}
                  />
                </a>
                <a
                  href="https://www.producthunt.com/products/findmyaitool?utm_source=badge-featured&utm_medium=badge#findmyaitool"
                  target="_blank"
                  className={styles.socialIconAlignment}
                  aria-label="visit-producthunt"
                >
                  <LazyImage
                    image={{
                      src: SocialIcon5,
                      alt: "producthunt",
                    }}
                  />
                </a>
              </div>
            </div>
            <div className={styles.footerLinkAlignment}>
              <div>
                <h2>Useful Links</h2>
                <a href="/" aria-label="visit-home">
                  Home
                </a>
                <a href="/category" aria-label="visit-category">
                  AI Tools Category
                </a>
                <a href="/blog" aria-label="visit-blog">
                  Blog{" "}
                </a>
                <a href="/submit-tool" aria-label="visit-submit-ai-tool">
                  Submit AI Tool
                </a>
                <a href="/gpt-store" aria-label="gpt-store">
                  {" "}
                  GPT Store
                </a>
              </div>
              <div>
                <h2>Company</h2>
                <a href="/hire-us" aria-label="hire-us">
                  Hire Us
                </a>
                <a href="/contact-us" aria-label="contact-us">
                  Contact Us
                </a>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  aria-label="visit-sitemap"
                >
                  Sitemap
                </a>
                <a
                  href="/sitemap/blog.xml"
                  target="_blank"
                  aria-label="visit-blog-sitemap"
                >
                  Blog Sitemap
                </a>
                <a
                  href="/sitemap/tool.xml"
                  target="_blank"
                  aria-label="visit-tool-sitemap"
                >
                  Tool Sitemap
                </a>
                <a
                  href="/sitemap/gpt.xml
"
                  target="_blank"
                  aria-label="visit-gpt-sitemap"
                >
                  GPT Sitemap
                </a>
                <a href="/terms-condition" aria-label="visit-terms-condition">
                  Terms & Condition
                </a>

                <a href="/privacy-policy" aria-label="visit-privacy-policy">
                  Privacy Policy
                </a>
              </div>
              <div>
                <h2>Contact Us</h2>
                <div className={styles.concateAlignment}>
                  {" "}
                  <div className={styles.iconAlignment}>
                    <LazyImage
                      image={{
                        src: FooterEmailIcon,
                        alt: "FooterEmailIcon",
                      }}
                    />
                  </div>
                  <a href="mailto:info@findmytool.com" aria-label="visit-site">
                    info@findmytool.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.copyRightAlignment}>
          <p>
            Copyright Find My AI Tools © 2024 All Rights Reserved by{" "}
            <span>FindMyAITool</span> Team.
          </p>
        </div>
      </div>
    </footer>
  );
}
