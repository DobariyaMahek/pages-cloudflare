const { gql } = require("@apollo/client");

const GET_SEO_DATA = gql`
  query StaticMetatags($filters: StaticMetatagFiltersInput) {
    staticMetatags(filters: $filters) {
      data {
        id
        attributes {
          metaTitle
          metaDescription
          keywords
          pageViewSchema
          metaImg {
            data {
              attributes {
                url
              }
            }
          }
          slug
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;
export default GET_SEO_DATA;
