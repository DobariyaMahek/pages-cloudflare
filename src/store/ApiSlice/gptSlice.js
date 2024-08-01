import { axiosInstance } from "@/api/base";
import { authHeader, getSession } from "@/helpers/authHelper";
import { isEmpty } from "@/helpers/common";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = getSession()?.access_token;
    return token || null;
  }
  return null;
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
export const token = getToken();
export const Id = getId();

const initialState = {
  GetGptData: [],
  GptCount: 0,
  gptLoading: false,
  gptDataLoading:false,
  CategoryDataCount: 0,
  mainCategoryDataCount: 0,
  GptCategoryData: [],
  GptMainCategoryData: [],
  searchGpts: "",
  page: 1,
  realtiesuggestiondata: [],
  scrollgptcategory: "",
  gptssloader: false,
};

export const GetGpt = createAsyncThunk(
  "app/get-app",
  async ({
    search,
    limit,
    page,
    newestFirst,
    status = "approved",
    mainCategoryId,
    category,
    isPopular,
    selectedData,
    isRandom,
    slugId,
  }) => {
    try {
      let url = "/app/get-app";
      const params = {};
      if (selectedData) {
        params.selectedData = selectedData;
      }
      if (newestFirst) {
        params.newestFirst = newestFirst;
      }
      if (limit) {
        params.limit = limit;
      }
      if (mainCategoryId) {
        params.mainCategoryId = mainCategoryId;
      }
      if (category) {
        params.category = category;
      }
      if (page) {
        params.page = page;
      }
      if (status) {
        params.status = status;
      }
      if (!isEmpty(search)) {
        params.search = search;
      }
      if (isPopular) {
        params.isPopular = isPopular;
      }
      if (isRandom) {
        params.isRandom = isRandom;
      }
      if (slugId) {
        params.slugId = slugId;
      }
      const response = await axiosInstance.get(url, {
        headers: authHeader(),
        params: { ...params }, // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);

export const GetReleatedGpt = createAsyncThunk(
  "app/get-related-gpt",
  async ({
    search,
    limit,
    page,
    newestFirst,
    status = "approved",
    mainCategoryId,
    category,
    isPopular,
    selectedData,
    isRandom,
    slugId,
  }) => {
    try {
      let url = "/app/get-app";
      const params = {};
      if (selectedData) {
        params.selectedData = selectedData;
      }
      if (newestFirst) {
        params.newestFirst = newestFirst;
      }
      if (limit) {
        params.limit = limit;
      }
      if (mainCategoryId) {
        params.mainCategoryId = mainCategoryId;
      }
      if (category) {
        params.category = category;
      }
      if (page) {
        params.page = page;
      }
      if (status) {
        params.status = status;
      }
      if (!isEmpty(search)) {
        params.search = search;
      }
      if (isPopular) {
        params.isPopular = isPopular;
      }
      if (isRandom) {
        params.isRandom = isRandom;
      }
      if (slugId) {
        params.slugId = slugId;
      }
      const response = await axiosInstance.get(url, {
        headers: authHeader(),
        params: { ...params }, // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);

export const GetSingleGpt = createAsyncThunk(
  "app/get-single-app",
  async ({
    search,
    limit,
    page,
    newestFirst,
    status = "approved",
    mainCategoryId,
    category,
    isPopular,
    selectedData,
    isRandom,
    slugId,
  }) => {
    try {
      let url = "/app/get-app";
      const params = {};
      if (selectedData) {
        params.selectedData = selectedData;
      }
      if (newestFirst) {
        params.newestFirst = newestFirst;
      }
      if (limit) {
        params.limit = limit;
      }
      if (mainCategoryId) {
        params.mainCategoryId = mainCategoryId;
      }
      if (category) {
        params.category = category;
      }
      if (page) {
        params.page = page;
      }
      if (status) {
        params.status = status;
      }
      if (!isEmpty(search)) {
        params.search = search;
      }
      if (isPopular) {
        params.isPopular = isPopular;
      }
      if (isRandom) {
        params.isRandom = isRandom;
      }
      if (slugId) {
        params.slugId = slugId;
      }
      const response = await axiosInstance.get(url, {
        headers: authHeader(),
        params: { ...params }, // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);
export const GetGptMainCategoryData = createAsyncThunk(
  "/mainCategory/get",
  async ({ status, limit, page }) => {
    try {
      let url = "mainCategory/get";
      const params = {};

      if (limit) {
        params.limit = limit;
      }

      if (page) {
        params.page = page;
      }

      if (status) {
        params.status = status;
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
export const GetGptCategoryData = createAsyncThunk(
  "category/get-category",
  async ({ status, limit, page, search }) => {
    try {
      let url = "category/get-category";
      const params = {};

      if (limit) {
        params.limit = limit;
      }

      if (page) {
        params.page = page;
      }

      if (status) {
        params.status = status;
      }
      if (search) {
        params.search = search;
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

export const AddBookMark = createAsyncThunk("bookmark", async (body) => {
  try {
    const response = await axiosInstance.post("bookmark", body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response?.data;
  } catch (e) {
    return e.response?.data;
  }
});
export const GetGptData = createAsyncThunk("bookmarkData", async (id) => {
  try {
    const response = await axiosInstance.get(`bookmark?uid=${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });

    return response?.data;
  } catch (e) {
    return e.response?.data;
  }
});

export const gptSlice = createSlice({
  name: "gpt",
  initialState: initialState,
  reducers: {
    setGptDetails: (state, action) => {
      state.gptDetails = action.payload;
    },
    setSearchGpts: (state, action) => {
      state.searchGpts = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.page = action.payload ? action.payload : 1;
    },
    setScrollGptCategory: (state, action) => {
      state.scrollgptcategory = action.payload;
    },
    setGptLoader: (state, action) => {
      state.gptssloader = action.payload;
    },
    setGptData: (state, action) => {
      state.GetGptData = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(GetGpt.pending, (state) => {
        state.gptLoading = true;
        state.status = "pending";
      })
      .addCase(GetGpt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.GetGptData = action?.payload?.payload?.app;
        state.GptCount = action?.payload?.payload?.count;
        state.gptLoading = false;
      })
      .addCase(GetGpt.rejected, (state, action) => {
        state.gptLoading = false;
        state.status = "failed";
      })
      .addCase(GetSingleGpt.pending, (state) => {
        state.gptDataLoading = true;
        state.status = "pending";
      })
      .addCase(GetSingleGpt.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.gptDataLoading = false;
      })
      .addCase(GetSingleGpt.rejected, (state, action) => {
        state.gptDataLoading = false;
        state.status = "failed";
      })
      .addCase(GetGptCategoryData.pending, (state) => {
        state.gptDataLoading = true;
        state.status = "pending";
      })
      .addCase(GetGptCategoryData.fulfilled, (state, action) => {
        state.gptDataLoading = false;
        state.status = "succeeded";
        state.GptCategoryData = action?.payload?.payload?.categorys;
        state.CategoryDataCount = action?.payload?.payload?.count;
      })
      .addCase(GetGptCategoryData.rejected, (state, action) => {
        state.gptDataLoading = false;
        state.status = "failed";
      })
      .addCase(GetGptMainCategoryData.pending, (state) => {
        state.gptLoading = true;
        state.status = "pending";
      })
      .addCase(GetGptMainCategoryData.fulfilled, (state, action) => {
        state.gptLoading = false;
        state.status = "succeeded";
        state.GptMainCategoryData = action?.payload?.payload?.categorys;
        state.mainCategoryDataCount = action?.payload?.payload?.count;
      })
      .addCase(GetGptMainCategoryData.rejected, (state, action) => {
        state.gptLoading = false;
        state.status = "failed";
      });
  },
});
export const {
  setGptDetails,
  setSearchGpts,
  setCurrentPage,
  setScrollGptCategory,
  setGptLoader,
  setGptData,
} = gptSlice.actions;

export default gptSlice.reducer;
