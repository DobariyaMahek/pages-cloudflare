import React, { useEffect, useState } from "react";
import styles from "./promoteworkHack.module.scss";
import CopyIcon from "@/assets/icons/copyIcon";
import ShareIcon from "@/assets/icons/shareIcon";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";
const ShareModal = dynamic(() => import("../../gptDetails/shareModal"), {
  ssr: true,
});
const Logo = "/assets/logo/bg-logo.webp";
import { usePathname } from "next/navigation";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});

export default function PromoteWorkHack() {
  const pathname = usePathname();
  const [shareModal, setShareModal] = useState(false);

  const handleCopyCode = () => {
    const codeToCopy = `<a href="https://main.dn4tlmkqq1vdv.amplifyapp.com${pathname}" target="_blank" class="findmyaitool_tag">
    <img  loading="lazy" src="https://client-assets-rh.s3.ap-south-1.amazonaws.com/images/profileImg/svg-1713784651703" alt="Vana Portrait | Featured on Findmyaitool" width="260px">
  </a>`;

    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(codeToCopy)
        .then(() => {
          toast.success("Embed code copied");
        })
        .catch((error) => {});
    } else {
      const tempTextArea = document.createElement("textarea");
      tempTextArea.value = codeToCopy;
      document.body.appendChild(tempTextArea);
      tempTextArea.select();
      document.execCommand("copy");
      document.body.removeChild(tempTextArea);
    }
  };

  useEffect(() => {
    if (shareModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [shareModal]);

  return (
    <div className={styles.promteWorkHardSection}>
      <div className={styles.promteWorkHardBox}>
        <div className="container">
          <div className={styles.promteWorkHardFlex}>
            <div className={styles.promteWorkHardLeftSide}>
              <h2>Promote WorkHack</h2>
              <p>
                Maximize Your Reach: Unleashing the Potential of Promote Your
                Tool
              </p>
              <div className={styles.bottomDetailsAlignment}>
                <div>
                  <LazyImage
                    image={{
                      src: Logo,
                      alt: `Logo`,
                    }}
                    className={styles.logoAlignment}
                  />
                </div>

                <div className={styles.copyEmbedAlignment}>
                  <p>Copy Embed Code</p>
                  <div onClick={() => handleCopyCode()}>
                    <CopyIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.promteWorkHardRightSide}>
              <div
                className={styles.shareButtonAlignment}
                onClick={() => {
                  setShareModal(true);
                }}
              >
                <p>Share on</p>
                <ShareIcon />
              </div>
              <div className={styles.socialIcon}></div>
            </div>
          </div>
        </div>
      </div>

      {shareModal && (
        <ShareModal setShareModal={setShareModal} shareModal={shareModal} />
      )}
    </div>
  );
}
