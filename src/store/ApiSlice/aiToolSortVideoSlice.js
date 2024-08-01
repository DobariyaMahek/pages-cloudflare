import { axiosInstance } from "@/api/base";
import { authHeader } from "@/helpers/authHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  getAllAiToolsVideo: [],
  AiToolsVideoCount: 0,
  videoloading: false,
};

export const getAiToolsShortVideo = createAsyncThunk(
  "aiToolSortVideo/get",
  async ({ status, limit, page }) => {
    try {
      let url = "aiToolSortVideo/get";
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

export const aiToolSortVideoSlice = createSlice({
  name: "aiToolsshortvideo",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getAiToolsShortVideo.pending, (state) => {
        state.videoloading = true;
        state.status = "pending";
      })
      .addCase(getAiToolsShortVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.videoloading = false;
        

        state.getAllAiToolsVideo = action?.payload?.payload?.videoData;
        state.AiToolsVideoCount = action?.payload?.payload?.totalCount;
      })
      .addCase(getAiToolsShortVideo.rejected, (state, action) => {
        state.videoloading = false;
        state.status = "failed";
      });
  },
});

export const {
  setCategoryDetails,
  setSubCategoryDetails,
  setSubcategoryId,
  setSearchTools,
} = aiToolSortVideoSlice.actions;

export default aiToolSortVideoSlice.reducer;
