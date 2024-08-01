import { axiosInstance } from "@/api/base";
import { authHeader } from "@/helpers/authHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
loading:false,
  getAllplan: [],
};

export const getSubscriptionPlan= createAsyncThunk(
  "subscriptionPlan/get",
  async ({
    status,
    limit,
    page,
   
  }) => {
    try {
      let url = "subscriptionPlan/get";
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
        params: params // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);
export const addSubscriptionPlan = createAsyncThunk(
  "payments/create-payment",
  async ({ id }) => {
    try {
      let url = `payments/create-payment?subscriptionPlanId=${id}`;

      const response = await axiosInstance.post(url,{}, {
        headers: authHeader(),
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);
export const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getSubscriptionPlan.pending, (state) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(getSubscriptionPlan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getAllplan = action?.payload?.payload?.allRole;
        state.loading = false;

      })
      .addCase(getSubscriptionPlan.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
      });
  },
});

export const {} = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;
