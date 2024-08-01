import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  ArticleLoading: false,
  getpaginationArticle: [],
  getAllArtical: [],
};

export const getArticle = createAsyncThunk(
  "getArticle",
  async ({ text, categorytext }) => {
    return new Promise((resolve, reject) => {
      let query = `
      query articles($filters: ArticleFiltersInput, $pagination: PaginationArg) {
        articles(filters: $filters, pagination: $pagination) {
        data {
          id
          attributes {
            title
            slug
            excerpt
            blogDetails
            tags
            createdAt
            updatedAt
            publishedAt
          
            author {
              name
              picture {
                data {
                  attributes {
                    url
                  }
                }
              }
              biography
              title
            }
            coverImage {
              data {
                attributes {
                  url
                }
              }
            }
            seo {
              description
              id
              image {
                data {
                  attributes {
                    url
                  }
                }
              }
              title
            }
          }
        }
      }
    }
    `;
     fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
            variables: {
              filters: {
                title: {
                  contains: text,
                },
              },
              pagination: {
                limit: 2000,
              },
            },
          }),
        })
        .then((response) => response.json())

        .then(({ data, errors }) => {
          if (errors) {
            reject(errors);

            return;
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);
export const getArticleForHome = createAsyncThunk(
  "getArticles",
  async ({ text, categorytext }) => {
    return new Promise((resolve, reject) => {
      let query = `
      query articles($filters: ArticleFiltersInput, $pagination: PaginationArg) {
        articles(filters: $filters, pagination: $pagination, sort: "createdAt:DESC") {
          data {
            attributes {
              slug
              title
              createdAt
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
            }
          }
        }
      }
      
    `;
     fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            query,
            variables: {
              filters: {
                title: {
                  contains: text,
                },
              },
              pagination: {
                limit: 3,
              },
            },
          }),
        })
        .then((response) => response.json())

        .then(({ data, errors }) => {
          if (errors) {
            reject(errors);

            return;
          }
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
);
export const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    setGraphqlAricals: (state, action) => {
      state.getpaginationArticle = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getArticle.pending, (state) => {
        state.status = "pending";
        state.ArticleLoading = true;
      })
      .addCase(getArticle.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ArticleLoading = false;
        const sortedArticles = action?.payload?.articles?.data?.sort(
          (a, b) =>
            new Date(b?.attributes?.publishedAt) -
            new Date(a?.attributes?.publishedAt)
        );

        state.getAllArtical = sortedArticles;
        state.getpaginationArticle = sortedArticles;
      })
      .addCase(getArticle.rejected, (state, action) => {
        state.status = "failed";

        state.ArticleLoading = false;
      })
      .addCase(getArticleForHome.pending, (state) => {
        state.status = "pending";
        state.ArticleLoading = true;
      })
      .addCase(getArticleForHome.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ArticleLoading = false;
        const sortedArticles = action?.payload?.articles?.data?.sort(
          (a, b) =>
            new Date(b?.attributes?.publishedAt) -
            new Date(a?.attributes?.publishedAt)
        );

        state.getAllArtical = sortedArticles;
        state.getpaginationArticle = sortedArticles;
      })
      .addCase(getArticleForHome.rejected, (state, action) => {
        state.status = "failed";

        state.ArticleLoading = false;
      });
  },
});
export const { setGraphqlAricals } = articleSlice.actions;
export default articleSlice.reducer;
