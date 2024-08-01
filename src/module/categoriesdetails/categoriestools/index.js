import React from "react";
import styles from "./categoriestools.module.scss";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
const Carddesign = dynamic(() => import("../../home/cardSection/carddesign"), {
  ssr: true,
});
export default function Categoriestools({ categoryToolsDetails }) {
  const { toolsloader } = useSelector((state) => state.aiTools);

  return (
    <>
      {(toolsloader ||
        categoryToolsDetails?.relatedAiTools?.length > 0) && (
          <div className={styles.categoriestoolsallContnetAlignment}>
            <div className={styles.headingAlignment}>
              <h4>Releated AI Tools</h4>
              <p>
                Explore related AI tools for diverse applications and enhanced
                productivity
              </p>
            </div>
            <div className={styles.grid}>
              {toolsloader
                ?[...Array(8)]?.map((aiTool, index) => {
                    return (
                      <div key={index}>
                        <Link prefetch={false} href={`/tool/${aiTool?.slugId}`}>
                          <Carddesign
                  loading={toolsloader}
                          />
                        </Link>
                      </div>
                    );
                  })
                : categoryToolsDetails?.relatedAiTools?.map((aiTool, index) => {
                    return (
                      <div key={index}>
                        <Link prefetch={false} href={`/tool/${aiTool?.slugId}`}>
                          <Carddesign
                            images={aiTool?.thumbnail}
                            name={aiTool?.title}
                            description={aiTool?.aiToolSubCategory?.[0]?.name}
                            icon={aiTool?.icon}
                            isFeatured={aiTool?.isFeatured}
                            item={aiTool}
                          />
                        </Link>
                      </div>
                    );
                  })}
            </div>
          </div>
        )}
    </>
  );
}
