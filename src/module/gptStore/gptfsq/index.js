 
import React, { useState } from "react";
import styles from "./gptfsq.module.scss";
import classNames from "classnames";
const PlusIcon = "/assets/icons/plus.webp";
const MinusIcon = "/assets/icons/minus-icon.webp";
export default function GptFsq() {
  const faqsData = [
    {
      question: "  What is a GPT Store?      ",
      answer:
        "  GPT Store is an online platform where users can access a wide range of custom-based GPTs to enhance their projects, streamline workflows, and explore creative possibilities.",
    },
    {
      question: "  What types of custom GPTs are available on the GPT Store?",
      answer:
        "      GPT Store offers a diverse selection of custom GPT models tailored to various industries and purposes, including but not limited to creative writing, coding assistance, content generation, customer support, and language translation.",
    },
    {
      question: "  How reliable are the GPTs from the GPT Store?",
      answer:
        "  At GPT Store, we prioritize quality and accuracy. Our GPT models undergo rigorous testing and validation processes to ensure reliability and consistency in their output. Additionally, we provide ongoing support and updates to maintain their performance standards.",
    },
    {
      question:
        "  Can I request a custom GPT model tailored to my specific requirements?",
      answer:
        "  Absolutely! At GPT Store, we understand that every project is unique. If you have specific requirements or need a custom GPT model developed, our team of experts can work with you to create a solution that meets your needs.",
    },
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqsectionAlignment}>
      <div className="container">
        <div className={styles.title}>
          <h3>
            Frequently <span>Asked</span> Questions
          </h3>
        </div>
        <div className={styles.boxcenterAlignment}>
          {faqsData?.map((item, index) => (
            <div className={classNames(styles.mainBox)} key={index}>
              <div className={styles.header}>
                <div className={styles.text}>
                  <p>{`0${index + 1}`}</p>
                  <p>{item?.question}</p>
                </div>
                <div
                  className={classNames(
                    styles.icon,
                    openIndex === index ? styles.iconsColorChange : ""
                  )}
                  onClick={() => handleToggle(index)}
                >
                  <img
                    src={openIndex === index ? MinusIcon : PlusIcon}
                    alt={openIndex === index ? "MinusIcon" : "PlusIcon"}
                  />
                </div>
              </div>
              <div
                className={classNames(
                  styles.body,
                  openIndex === index ? styles.showData : styles.hideData
                )}
              >
                <div className={styles.bodyTextGrid}>
                  <div></div>
                  {item?.answer?.split("\n")?.map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
