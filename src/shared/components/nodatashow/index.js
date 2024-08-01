import React from 'react'
import styles from './nodatashow.module.scss';
import dynamic from 'next/dynamic';
const LazyImage = dynamic(() => import("../../../helpers/lazyImage"), {
  ssr: true,
});
const SearchIcon = "/assets/icons/search-lg.webp";
export default function Nodatashow() {
  return (
    <div className={styles.nodatashowAlignment}>
      <div className={styles.iconCenteralignment}>
        <LazyImage
          image={{
            src: SearchIcon,
            alt: `SearchIcon`,
          }}
        />
      </div>
      <h2>No results found</h2>
      <span>Oops! We couldn't find any results matching your search.</span>
      <span>Please try again with different keywords or filters.</span>
    </div>
  );
}
