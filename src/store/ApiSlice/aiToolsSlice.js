import { axiosInstance } from "@/api/base";
import { authHeader, authHeaderForm, getSession } from "@/helpers/authHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = getSession()?.access_token;
    return token || null;
  }
  return null;
};
export const token = getToken();

const initialState = {
  getAllAiTools: [],
  getRandomIcon: [],
  getAllAiToolsName: [],
  aiToolSubCategory: [],
  getAiToolsCategoryData: [],
  count: 0,
  loading: false,
  homeloading: false,
  toolLoading: false,
  searchTools: "",
  categoryLoader: false,
  scrollcategory: "",
  toolsloader: false,
};
export const getId = () => {
  if (typeof window !== "undefined") {
    const data = getSession();
    const userInfo = data;
    const id = userInfo?.userInfo?._id;
    return id || null;
  }
  return null;
};
export const Id = getId();

export const getAiTools = createAsyncThunk(
  "aiTool/get-aiTool",
  async ({
    limit,
    page,
    search,
    aiToolCategoryId,
    aiToolSubCategoryId,
    isPopular,
    features,
    pricing,
    id,
    uid,
    aiToolSubCategory,
    isFeatured,
    isVerified,
    isLive = true,
    transactionId,
    status = "approved",
    selectedData,
  }) => {
    try {
      let url = "aiTool/get-aiTool";
      const params = {};

      if (transactionId) {
        params.transactionId = transactionId;
      }
      if (selectedData) {
        params.selectedData = selectedData;
      }
      if (status) {
        params.status = status;
      }
      if (isLive) {
        params.isLive = isLive;
      }
      if (uid) {
        params.uid = uid;
      }

      if (isVerified) {
        params.isVerified = isVerified;
      }
      if (id) {
        params.id = id;
      }
      if (limit) {
        params.limit = limit;
      }

      if (page) {
        params.page = page;
      }

      if (search) {
        params.search = search;
      }
      if (aiToolCategoryId) {
        params.aiToolCategoryId = aiToolCategoryId;
      }
      if (aiToolSubCategory) {
        params.aiToolSubCategory = aiToolSubCategory;
      }
      if (aiToolSubCategoryId) {
        params.aiToolSubCategoryId = aiToolSubCategoryId;
      }
      if (isPopular) {
        params.isPopular = isPopular;
      }
      if (pricing) {
        params.pricing = pricing;
      }

      if (features) {
        params.features = features;
      }
      if (isFeatured) {
        params.isFeatured = isFeatured;
      }
      const response = await axiosInstance.get(url, {
        headers: authHeader(),
        params: params, // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);
export const getAiToolsAllDetails = createAsyncThunk("aiTool/getAiToolsAllDetails", async ({ slugId }) => {
  const url = "pageWiseApis/get-aitool-by-slugid";
  const params = {};
  if (slugId) {
    params.slugId = slugId;
  }
  params.platform='website'
  try {
    const response = await axiosInstance.get(url, {
      headers: authHeader(),
      params: params,
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const getHomePageAllDetails = createAsyncThunk("aiTool/getHomePageAllDetails", async () => {
  const url = "pageWiseApis/get-home-page";
  try {
    const response = await axiosInstance.get(url, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const getAiToolsName = createAsyncThunk("aiTool/find-aiToolName", async ({ search, limit, page }) => {
  try {
    let url = "aiTool/find-aiToolName";
    const params = {};

    if (search) {
      params.search = search;
    }

    if (limit) {
      params.limit = limit;
    }

    if (page) {
      params.page = page;
    }

    const response = await axiosInstance.get(url, {
      headers: authHeader(),
      params: params, // Send params to the API call
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const updateAiTools = createAsyncThunk("aiTool/update-aiTool", async (obj) => {
  try {
    const response = await axiosInstance.post(`featuredAITool/add-featuredAITool`, obj, {
      headers: authHeader(),
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});

export const addAiTool = createAsyncThunk("aiTool/addAiTool", async ({ body }) => {
  try {
    let url = "aiTool/add-aiTool";

    const response = await axiosInstance.post(url, body, {
      headers: authHeaderForm(),
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const getAiToolsCategory = createAsyncThunk("aiTool/getAiToolsCategory", async ({ status, limit, page, getAllNames }) => {
  try {
    let url = "aiToolCategory/get-category";
    const params = {};

    if (status) {
      params.status = status;
    }

    if (limit) {
      params.limit = limit;
    }

    if (page) {
      params.page = page;
    }
    if (getAllNames) {
      params.getAllNames = getAllNames;
    }
    const response = await axiosInstance.get(url, {
      headers: authHeader(),
      params: params, // Send params to the API call
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const getAiToolsSubCategory = createAsyncThunk("aiTool/getAiToolsSubCategory", async ({ getAllNames, search }) => {
  try {
    const params = {};

    if (getAllNames) {
      params.getAllNames = getAllNames;
    }
    if (search) {
      params.search = search;
    }
    params.status = "active";

    let url = "aiToolSubCategory/get-subCategory";

    const response = await axiosInstance.get(url, {
      headers: authHeader(),
      params: { ...params, reorderData: true }, // Send params to the API call
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const getImage = createAsyncThunk("aiTool/getImage", async () => {
  try {
    let url = "advertisements/get-ad";

    const response = await axiosInstance.get(url, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const updateImage = createAsyncThunk("aiTool/updateImage", async ({ id }) => {
  try {
    let url = `advertisements/click-up/${id}`;

    const response = await axiosInstance.post(url, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});
export const aiToolsSlice = createSlice({
  name: "aiTools",
  initialState: initialState,
  reducers: {
    setCategoryDetails: (state, action) => {
      state.categoryDetails = action.payload;
    },
    setSearchTools: (state, action) => {
      state.searchTools = action.payload;
    },
    setSubCategoryDetails: (state, action) => {
      state.subCategoryDetails = action.payload;
    },
    setSubcategoryId: (state, action) => {
      state.subCategoryId = action.payload;
    },
    setSelectedDatesData: (state, action) => {
      state.selectedDatesData = action.payload;
    },
    setToolsData: (state, action) => {
      state.toolsData = action.payload;
    },
    setScrollCategory: (state, action) => {
      state.scrollcategory = action.payload;
    },
    setToolLoader: (state, action) => {
      state.toolsloader = action.payload;
    },
    setLoading: (state, action) => {
      state.toolLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      .addCase(getAiTools.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(getAiTools.fulfilled, (state, action) => {
        state.getAllAiTools = action?.payload?.payload?.aiTool;
        state.getRandomIcon = action?.payload?.payload?.icons;
        state.count = action?.payload?.payload?.count;
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(getAiTools.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
      })
      .addCase(getAiToolsAllDetails.pending, (state) => {
        state.toolsloader = true;
        state.status = "pending";
      })
      .addCase(getAiToolsAllDetails.fulfilled, (state, action) => {
        state.getAllAiTools = action?.payload?.payload?.aiTool;
        state.count = action?.payload?.payload?.count;
        state.status = "succeeded";
        state.toolsloader = false;
      })
      .addCase(getAiToolsAllDetails.rejected, (state, action) => {
        state.status = "failed";
        state.toolsloader = false;
      })
      .addCase(getHomePageAllDetails.pending, (state) => {
        state.homeloading = true;
        state.status = "pending";
      })
      .addCase(getHomePageAllDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.homeloading = false;
      })
      .addCase(getHomePageAllDetails.rejected, (state, action) => {
        state.status = "failed";
        state.homeloading = false;
      })
      .addCase(getAiToolsCategory.pending, (state) => {
        state.status = "pending";
        state.categoryLoader = true;
      })
      .addCase(getAiToolsCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getAiToolsCategoryData = action?.payload?.payload?.aiToolCategory;
        state.categoryLoader = false;
      })
      .addCase(getAiToolsCategory.rejected, (state, action) => {
        state.status = "failed";
        state.categoryLoader = false;
      })
      .addCase(getAiToolsSubCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAiToolsSubCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.aiToolSubCategory = action?.payload?.payload?.aiToolSubCategory || action?.payload?.payload?.aiToolCategory;
      })
      .addCase(getAiToolsSubCategory.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getAiToolsName.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getAiToolsName.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getAllAiToolsName = action?.payload?.payload?.aiToolNames;
      })
      .addCase(getAiToolsName.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {
  setCategoryDetails,
  setSubCategoryDetails,
  setSubcategoryId,
  setSelectedDatesData,
  setSearchTools,
  setToolsData,
  setScrollCategory,
  setToolLoader,
  setLoading,
} = aiToolsSlice.actions;

export default aiToolsSlice.reducer;
