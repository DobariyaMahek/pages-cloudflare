import LazyImage from "@/helpers/lazyImage";


const Search = "/assets/icons/SearchIcon.webp";

function SearchIcon() {
  return (


    <LazyImage
            image={
        {

          src:Search
          ,
          alt:'search'
        }
      }

      />
  );
}

export default SearchIcon;