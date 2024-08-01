import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAllBlog: [],
  blogDataLoading: false,
  blogLoading: false,
  getpaginationBlog: [],
  getAllArtical: [],
  blogauthorloading: false,
  getallauthore: [],
  getpaginationauthore: [],
  getAllHomeBlog: [],
  relatedBlog: [],
  getAllBlogCategory: [],
};
const apiUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
export const getBlog = createAsyncThunk("blog/get-blog", async ({ text, categorytext, slug, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    let query = `  query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput,$sort: [String]) {
        blogs(pagination: $pagination, filters: $filters, sort: $sort ) {
          data {
            attributes {
              slug
              title
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              blog_categories {
                data {
                  attributes {
                    title
                  }
                }
              }
              author {
                add_author {
                  data {
                    attributes {
                      slug
                      author_name
                      author_profile {
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
              publishedAt
              blogDetails
              seo {
                description
                keywords
                pageViewSchema
                title
              }
            }
            
          }
          meta {
            pagination {
              pageCount
              total
              page
              pageSize
            }
          }
        }
      }`;

    let filterdata = {};
    if (text) {
      filterdata = {
        ...filterdata,
        title: {
          contains: text,
        },
      };
    }
    if (categorytext) {
      filterdata = {
        ...filterdata,
        blog_categories: {
          title: {
            contains: categorytext,
          },
        },
      };
    }
    if (slug) {
      filterdata = {
        ...filterdata,
        slug: {
          contains: slug,
        },
      };
    }

    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
        variables: {
          pagination: {
            page: page,
            pageSize: pageSize,
          },

          filters: filterdata,
          sort: ["publishedAt:desc"],
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
});
export const getBlogCategory = createAsyncThunk("blog/get-blog-category", async () => {
  return new Promise((resolve, reject) => {
    let query = `  query Query($pagination: PaginationArg) {
  blogCategories(pagination: $pagination) {
    data {
      attributes {
        title
      }
    }
  }
}`;

    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
        variables: {
          pagination: {
            limit: 2000,
          },

          filters: {},
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
});
export const getAuthor = createAsyncThunk("blog/get-authore", async ({ text, categorytext, slug }) => {
  return new Promise((resolve, reject) => {
    let query = `query AddAuthors($pagination: PaginationArg, $filters: AddAuthorFiltersInput) {
        addAuthors(pagination: $pagination, filters: $filters) {
          data {
            attributes {
              slug
              author_name
              author_profile {
                data {
                  attributes {
                    size
                    url
                  }
                }
              }
              createdAt
              publishedAt
              description
              social_media {
                id
                social_media_icon {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                social_media_link
                social_media_name
              }
            }
          }
        }
      }`;

    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
        variables: {
          pagination: {
            limit: 2000,
          },

          filters: {
            slug: {
              eq: text,
            },
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
});

export const getSingleAuthor = createAsyncThunk("blog/get-single-authore", async ({ text, categorytext, slug }) => {
  return new Promise((resolve, reject) => {
    let query = `query AddAuthors($pagination: PaginationArg, $filters: AddAuthorFiltersInput) {
        addAuthors(pagination: $pagination, filters: $filters) {
          data {
            attributes {
              slug
              author_name
              author_profile {
                data {
                  attributes {
                    size
                    url
                  }
                }
              }
              createdAt
              publishedAt
              description
              social_media {
                id
                social_media_icon {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                social_media_link
                social_media_name
              }
            }
          }
        }
      }`;

    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
        variables: {
          pagination: {
            limit: 2000,
          },

          filters: {
            slug: {
              eq: text,
            },
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
});

export const getBlogForHomePage = createAsyncThunk("blog/get-blogs", async ({ text, categorytext, slug }) => {
  return new Promise((resolve, reject) => {
    let query = `
      query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput) {
        blogs(pagination: $pagination, filters: $filters, sort: "createdAt:DESC" ) {
          data {
            attributes {
              slug
              title
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              blog_categories {
                data {
                  attributes {
                    title
                  }
                }
              }
              author {
                add_author {
                  data {
                    attributes {
                      slug
                      author_name
                      author_profile {
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
              publishedAt
            }
          }
        }
      }
      
    `;
    window
      .fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          query,
          variables: {
            pagination: {
              limit: 3,
            },

            filters: {
              title: {
                contains: text,
              },
              blog_categories: {
                title: {
                  contains: categorytext,
                },
              },
              slug: {
                notContains: slug,
              },
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
});
export const getAuthoreBlog = createAsyncThunk("blog/get-blogss-authore", async ({ categorytext, slug, page, pageSize }) => {
  return new Promise((resolve, reject) => {
    let query = `
      query Blogs($pagination: PaginationArg, $filters: BlogFiltersInput,$sort: [String]) {
        blogs(pagination: $pagination, filters: $filters, sort: $sort ) {
          data {
            attributes {
              slug
              title
              coverImage {
                data {
                  attributes {
                    url
                  }
                }
              }
              blog_categories {
                data {
                  attributes {
                    title
                  }
                }
              }
              publishedAt
              author {
                add_author {
                  data {
                    attributes {
                      slug
                      author_name
                      author_profile {
                        data {
                          attributes {
                          alternativeText
                            url
                          }
                        }
                      }
                    
                    }
                  }
                }
              }
            }
          }
          meta {
            pagination {
              pageCount
              total
              page
              pageSize
            }
          }
        }
      }
      
    `;

    let filters = {};
    if (slug) {
      filters.author = {
        add_author: {
          slug: {
            eq: slug,
          },
        },
      };
    }
    // Add category filter if categorytext is available
    if (categorytext) {
      filters.blog_categories = {
        title: {
          eq: categorytext,
        },
      };
    }

    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        query,
        variables: {
          pagination: {
            page: page,
            pageSize: pageSize,
          },

          filters: filters,
          sort: ["publishedAt:desc"],
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
});
export const blogSlice = createSlice({
  name: "blog",
  initialState: initialState,
  reducers: {
    setGraphqlBlogs: (state, action) => {
      state.getpaginationBlog = action.payload;
    },
    setGraphqlAuthore: (state, action) => {
      state.getpaginationauthore = action.payload;
    },
    setGetallauthore: (state, action) => {
      state.getallauthore = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getBlog.pending, (state) => {
        state.status = "pending";
        state.blogDataLoading = true;
      })
      .addCase(getBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogDataLoading = false;
        let blogData = action?.payload?.blogs?.data?.sort((a, b) => new Date(b?.attributes?.publishedAt) - new Date(a?.attributes?.publishedAt));
        state.getAllBlog = blogData;
        state.getpaginationBlog = blogData;
      })
      .addCase(getBlog.rejected, (state, action) => {
        state.status = "failed";
        state.blogDataLoading = false;
      })
      .addCase(getBlogCategory.pending, (state) => {
        state.status = "pending";
        state.blogLoading = true;
      })
      .addCase(getBlogCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogLoading = false;
        let blogData = action?.payload?.blogCategories?.data;
        state.getAllBlogCategory = blogData;
      })
      .addCase(getBlogCategory.rejected, (state, action) => {
        state.status = "failed";
        state.blogLoading = false;
      })
      .addCase(getSingleAuthor.pending, (state) => {
        state.status = "pending";
        state.blogauthorloading = true;
      })
      .addCase(getSingleAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogauthorloading = false;
      })
      .addCase(getSingleAuthor.rejected, (state, action) => {
        state.status = "failed";
        state.blogauthorloading = false;
      })
      .addCase(getAuthor.pending, (state) => {
        state.status = "pending";
        state.blogauthorloading = true;
      })
      .addCase(getAuthor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogauthorloading = false;
        state.getpaginationauthore = action?.payload?.addAuthors?.data;
      })
      .addCase(getAuthor.rejected, (state, action) => {
        state.status = "failed";

        state.blogauthorloading = false;
      })
      .addCase(getBlogForHomePage.pending, (state) => {
        state.status = "pending";
        // state.blogLoading = true;
      })
      .addCase(getBlogForHomePage.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.blogLoading = false;
        state.relatedBlog = action?.payload?.blogs?.data;
        state.getAllHomeBlog = action?.payload?.blogs?.data;
        state.getpaginationBlog = action?.payload?.blogs?.data;
      })
      .addCase(getBlogForHomePage.rejected, (state, action) => {
        state.status = "failed";

        // state.blogLoading = false;
      })
      .addCase(getAuthoreBlog.pending, (state) => {
        state.status = "pending";
        state.blogLoading = true;
      })
      .addCase(getAuthoreBlog.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogLoading = false;

        state.getAllBlog = action?.payload?.blogs?.data;
        state.getpaginationBlog = action?.payload?.blogs?.data;
      })
      .addCase(getAuthoreBlog.rejected, (state, action) => {
        state.status = "failed";

        state.blogLoading = false;
      });
  },
});
export const { setGraphqlBlogs, setGraphqlAuthore, setGetallauthore } = blogSlice.actions;
export default blogSlice.reducer;
