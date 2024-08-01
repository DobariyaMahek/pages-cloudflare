import LazyImage from '@/helpers/lazyImage';
import React from 'react'
const viewAll='/assets/icons/view-all-arrow.webp'
export default function RightIconLg() {
  return (
    <>
      <LazyImage
        image={{
          src: viewAll,
          alt:'viewAll'
        }}
      
      />
    </>
  );
}
