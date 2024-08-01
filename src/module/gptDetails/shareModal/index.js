import React, { useRef } from "react";
import styles from "./shareModal.module.scss";
import classNames from "classnames";
const CloseIcon = "/assets/icons/close-white.webp";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import LazyImage from "@/helpers/lazyImage";
const TwitterIcon = "/assets/icons/Twitter-md.webp";
const InstagramIcon = "/assets/icons/instaIcon.webp";
const FacebookIcon = "/assets/icons/Facebook-md.webp";
const LinkedInIcon = "/assets/icons/LinkedIn-md.webp";
const WhatsappIcon = "/assets/icons/Whatsapp-md.webp";
const DiscordIcon = "/assets/icons/Discord-md.webp";
const RedditIcon = "/assets/icons/Reddit.webp";
const TelegramIcon = "/assets/icons/Telegram-md.webp";
const LinkIcon = "/assets/icons/link-md.webp";

export default function ShareModal({ shareModal, setShareModal, shareIndex }) {
  const pathname = usePathname();
  let url;
  const SherebarRef = useRef();

  url = `${process.env.NEXT_PUBLIC_SITEMAP_URL}${pathname}`;
  const handleIconClick = (platform) => {
    navigator.clipboard.writeText(url);
    let shareUrl;
    const message = url;
    switch (platform) {
      case "instagram":
        shareUrl = `https://www.instagram.com/direct/new/?text=${encodeURIComponent(
          message
        )}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          message
        )}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          message
        )}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          message
        )}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        break;
      case "discord":
        shareUrl = `https://discord.com/channels/@me?text=${encodeURIComponent(
          message
        )}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?title=${encodeURIComponent(
          "FindMyAItool"
        )}&url=${encodeURIComponent(message)}&type=link`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(
          message
        )}&text=${encodeURIComponent(message)}`;
        break;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
  };
  return (
    <div
      className={
        shareModal
          ? classNames(styles.shareModalWrapper, styles.openModalWrapper)
          : classNames(styles.shareModalWrapper)
      }
    >
      <div className={styles.shareModalWrapperBoxAlignment} ref={SherebarRef}>
        <div className={styles.shareModalHeader}>
          <h2>Share</h2>
          {/* <img src={CloseIcon} alt="CloseIcon" /> */}
          <div
            onClick={() => {
              setShareModal(false);
            }}
          >
            <LazyImage
              image={{
                src: CloseIcon,
                alt: "CloseIcon",
              }}
            />
          </div>
        </div>
        <div className={styles.grid}>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("instagram")}
              >
                <LazyImage
                  image={{
                    src: InstagramIcon,
                    alt: "InstagramIcon",
                  }}
                />
              </div>
            </div>
            <span>Instagram</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("twitter")}
              >
                <LazyImage
                  image={{
                    src: TwitterIcon,
                    alt: "TwitterIcon",
                  }}
                />
              </div>
            </div>
            <span>Twitter</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("facebook")}
              >
                <LazyImage
                  image={{
                    src: FacebookIcon,
                    alt: "FacebookIcon",
                  }}
                />
              </div>
            </div>
            <span>Facebook</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("linkedin")}
              >
                <LazyImage
                  image={{
                    src: LinkedInIcon,
                    alt: "LinkedInIcon",
                  }}
                />
              </div>
            </div>
            <span>LinkedIn</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("whatsapp")}
              >
                <LazyImage
                  image={{
                    src: WhatsappIcon,
                    alt: "WhatsappIcon",
                  }}
                />
              </div>
            </div>
            <span>Whatsapp</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("discord")}
              >
                <LazyImage
                  image={{
                    src: DiscordIcon,
                    alt: "DiscordIcon",
                  }}
                />
              </div>
            </div>
            <span>Discord</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("reddit")}
              >
                <LazyImage
                  image={{
                    src: RedditIcon,
                    alt: "RedditIcon",
                  }}
                />
              </div>
            </div>
            <span>Reddit</span>
          </div>
          <div className={styles.griditems}>
            <div className={styles.centerAlignment}>
              <div
                className={styles.icon}
                onClick={() => handleIconClick("telegram")}
              >
                <LazyImage
                  image={{
                    src: TelegramIcon,
                    alt: "TelegramIcon",
                  }}
                />
              </div>
            </div>
            <span>Telegram</span>
          </div>
        </div>
        <div className={styles.copyPageLink}>
          <h4>Copy Page link</h4>
          <div className={styles.relativeDiv}>
            <input type="text" disabled={true} value={url} />
            <div className={styles.leftIconAlignment}>
              <LazyImage
                image={{
                  src: LinkIcon,
                  alt: "LinkIcon",
                }}
              />
            </div>
            <div className={styles.rightAlignment}>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  toast.success("Link copied successfully!");
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10 0.833496H7.296C6.07067 0.833496 5.1 0.833496 4.34067 0.935496C3.55933 1.04083 2.92667 1.26216 2.42733 1.76083C1.92867 2.26016 1.70733 2.89283 1.602 3.67416C1.5 4.43416 1.5 5.40416 1.5 6.6295V10.6668C1.50002 11.2624 1.71262 11.8385 2.09956 12.2913C2.48649 12.7441 3.02234 13.0439 3.61067 13.1368C3.702 13.6462 3.87867 14.0808 4.232 14.4348C4.63333 14.8362 5.13867 15.0082 5.73867 15.0895C6.31667 15.1668 7.052 15.1668 7.96333 15.1668H10.0367C10.948 15.1668 11.6833 15.1668 12.2613 15.0895C12.8613 15.0082 13.3667 14.8362 13.768 14.4348C14.1693 14.0335 14.3413 13.5282 14.4227 12.9282C14.5 12.3502 14.5 11.6148 14.5 10.7035V7.29683C14.5 6.3855 14.5 5.65016 14.4227 5.07216C14.3413 4.47216 14.1693 3.96683 13.768 3.5655C13.414 3.21216 12.9793 3.0355 12.47 2.94416C12.3771 2.35584 12.0773 1.81999 11.6245 1.43305C11.1717 1.04612 10.5956 0.833512 10 0.833496ZM11.42 2.8475C11.3186 2.5515 11.1272 2.2946 10.8726 2.11278C10.618 1.93096 10.3129 1.83331 10 1.8335H7.33333C6.062 1.8335 5.15933 1.83483 4.47333 1.92683C3.80333 2.01683 3.41667 2.18616 3.13467 2.46816C2.85267 2.75016 2.68333 3.13683 2.59333 3.8075C2.50133 4.49283 2.5 5.3955 2.5 6.66683V10.6668C2.49981 10.9797 2.59746 11.2848 2.77928 11.5394C2.96111 11.7941 3.218 11.9855 3.514 12.0868C3.5 11.6802 3.5 11.2202 3.5 10.7035V7.29683C3.5 6.3855 3.5 5.65016 3.578 5.07216C3.658 4.47216 3.83133 3.96683 4.232 3.5655C4.63333 3.16416 5.13867 2.99216 5.73867 2.9115C6.31667 2.8335 7.052 2.8335 7.96333 2.8335H10.0367C10.5533 2.8335 11.0133 2.8335 11.42 2.8475ZM4.93867 4.2735C5.12333 4.08883 5.382 3.96883 5.872 3.90283C6.37467 3.8355 7.04267 3.83416 7.99933 3.83416H9.99933C10.956 3.83416 11.6233 3.8355 12.1273 3.90283C12.6167 3.96883 12.8753 4.0895 13.06 4.2735C13.2447 4.45816 13.3647 4.71683 13.4307 5.20683C13.498 5.7095 13.4993 6.3775 13.4993 7.33416V10.6675C13.4993 11.6242 13.498 12.2915 13.4307 12.7955C13.3647 13.2848 13.244 13.5435 13.06 13.7282C12.8753 13.9128 12.6167 14.0328 12.1267 14.0988C11.6233 14.1662 10.956 14.1675 9.99933 14.1675H7.99933C7.04267 14.1675 6.37467 14.1662 5.87133 14.0988C5.382 14.0328 5.12333 13.9122 4.93867 13.7282C4.754 13.5435 4.634 13.2848 4.568 12.7948C4.50067 12.2915 4.49933 11.6242 4.49933 10.6675V7.33416C4.49933 6.3775 4.50067 5.7095 4.568 5.20616C4.634 4.71683 4.75467 4.45816 4.93867 4.2735Z"
                    fill="white"
                  />
                </svg>
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
