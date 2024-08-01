import React, { useState } from "react";
import styles from "./promptStarters.module.scss";
const CopyIcon = "/assets/icons/copy-icon.webp";
const check = "/assets/images/check-w.webp";

export default function PromptStarters({ gptDetails }) {
  const prompts = gptDetails?.promptStater
    ? (() => {
        try {
          return JSON.parse(gptDetails?.promptStater?.replace(/'/g, '"'));
        } catch (error) {
          return [];
        }
      })()
    : [];

  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyClick = (index, prompt) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <div className={styles.promptStartersSection}>
      <div className={styles.promptStartersHeading}>
        <h2>Prompt Starters</h2>

        <p>Unleash your creativity with our prompt starters, sparking ideas and inspiration right from the start.</p>
      </div>

      <div className={styles.promptStartersDetails}>
        <div className={styles.promptStartersBox}>
          <ul>
            {prompts?.length > 0 ? (
              prompts?.map((prompt, index) => (
                <li key={index} onClick={() => handleCopyClick(index, prompt)}>
                  {" "}
                  {prompt} <img src={copiedIndex !== null && index === copiedIndex ? check : CopyIcon} width="20px" height="20px" alt="CopyIcon" />
                </li>
              ))
            ) : (
              <li>No Prompt Starters Found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
