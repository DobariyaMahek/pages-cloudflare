import React, { useEffect, useState } from "react";
import styles from "./submitAITool.module.scss";
import { getSession } from "@/helpers/authHelper";
import { useDispatch } from "react-redux";
import { getSubscriptionPlan } from "@/store/ApiSlice/subscriptionPlanSlice";
import dynamic from "next/dynamic";
const PrisingDetails = dynamic(() => import("./prisingDetails"), {
  ssr: true,
});
const GoogleWithLogin = dynamic(() => import("../auth/googlewithlogin"), {
  ssr: true,
});
export default function SubmitAITool() {
  const [isToken, setIsToken] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(getSubscriptionPlan({}))
      .then((resp) => {
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      const token = getSession()?.access_token;
      setIsToken(token);
    }, 100);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className={styles.submitAiToolsSection}>
      <div className="container">
        <div className={styles.submitAiToolsAlignment}>
          <div className={styles.submitAiToolsTop}>
            <div className={styles.heading}>
              <h1>Submit AI Tool</h1>
            </div>
            <p>
              Welcome to FindMyAITool.com! We're a platform that focuses on
              promoting and sharing the latest and greatest AI tools. We're
              super excited to give you the opportunity to showcase your tool to
              our users. Here's how you can submit your tool to be featured on
              our website:
            </p>
            {getSession()?.access_token ? (
              <PrisingDetails setLoading={setLoading} loading={loading} />
            ) : (
              <div className={styles.createToolsAlignment}>
                <div className={styles.createToolsBox}>
                  <div className={styles.title}>
                    <h5>Create an Account/Login:</h5>
                  </div>

                  <p>
                    Sign up/log in with Google to create a new account. It'll be
                    super quick!
                  </p>

                  <div className={styles.continueWithGoogleButton}>
                    <GoogleWithLogin text={"Continue with Account"} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.submitAiToolsBottom}>
            <p>
              FindMyAITool is a popular directory of AI tools, attracting over
              100,000+ visitors each month. We provide a platform for AI tool
              creators to showcase their innovations to a wide audience. To
              cater to various needs and preferences, we offer three different
              plans for tool submissions:
            </p>

            <ul>
              <li>
                <span>Basic Plan:</span> The Basic Plan is a simple way to get
                started. It lets you add one of your AI tools to our list. This
                means more people can find and use your tool. And if you ever
                need assistance or have questions, our support team is here to
                help.
              </li>
              <li>
                <span>Sponsored Plan:</span> If you want to really make your AI
                tool shine, the Sponsored Plan is for you. For a whole week
                (that's 7 days), your tool will be shown on the main page of our
                website. It's like putting a spotlight on it! Not only that, but
                it will also be placed right at the top of its category This
                way, anyone looking for tools like yours will see it first. Of
                course, you'll still have access to our support team if you need
                anything.
              </li>
              <li>
                <span>Standard Plan:</span> The Standard Plan is a great choice
                if you want a bit of everything. You can list one AI tool, just
                like with the Basic Plan. But here's the cool part: your tool
                will also get that prime spot on our main page for 7 days. And
                yes, it will still be at the top of its category too. So, if
                you're looking for a solid mix of exposure and visibility, along
                with support when you need it, the Standard Plan has got you
                covered.
              </li>
            </ul>
            <p>
              Submitting your tool is a simple process. After completing the
              payment, you will receive an email containing a link to submit
              your tool. Just click on the link and provide the URL of your
              tool, along with some basic information. Our dedicated team will
              handle everything else, ensuring that all details are accurate and
              complete.
            </p>
            <p>
              The fees associated with our plans enable us to maintain the
              platform, reach more people, and offer dedicated support to the
              creators of the tools. We have high standards in selecting AI
              tools and maintain a focused and well-curated platform by
              excluding items like AI newsletters or unrelated directories.
            </p>
            <p>
              At FindMyAITool, we are confident in our rules for choosing tools.
              In the rare case that your tool doesn't meet our requirements, we
              offer a full refund to show our commitment to excellence.
            </p>
            <p>
              Thank you for choosing FindMyAITool. We are excited to feature
              your outstanding AI tool on our platform and help it reach a
              broader audience.
            </p>
            <p>
              For any assistance or questions, feel free to email us at 
              <a href="mailto:info@findmytool.com" aria-label="visit-site">
                info@findmytool.com
              </a>{" "}
              Our professional support team is always ready to help you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
