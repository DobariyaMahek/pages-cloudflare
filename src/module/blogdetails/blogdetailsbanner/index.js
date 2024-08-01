import styles from "./blogdetailsbanner.module.scss";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import dynamic from "next/dynamic";
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});

const CardImages = "/assets/images/thumbnail-w.webp";
export default function Blogdetailsbanner({ blogDetail }) {
  const { blogDataLoading } = useSelector((state) => state.blog);
  return (
    <>
      {blogDataLoading ? (
        <div className="container">
          <Skeleton baseColor="#cccccc29" className={styles.blogSkeleton} />
        </div>
      ) : (
        <div className="container">
          <div className={styles.blogdetailsbanner}>
            <div className={styles.image}>
              <LazyImage
                image={{
                  src: blogDetail?.coverImage?.data?.attributes?.url
                    ? blogDetail?.coverImage?.data?.attributes?.url
                    : CardImages,
                  alt: "BlogdetailsImage",
                }}
                className={styles.cardImageChild}
              />
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
