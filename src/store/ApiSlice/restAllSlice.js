import { axiosInstance } from "@/api/base";
import { authHeader, authHeaderForm } from "@/helpers/authHelper";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken } from "./aiToolsSlice";

const initialState = {
  offerData: [],
  getpaymentdata: {},
  getstaticemetatag: [],
};

export const getOffer = createAsyncThunk("offer/get-offer", async () => {
  try {
    const response = await axiosInstance.get(`offer/get-offer`, {
      headers: authHeader(),
    });
    return response?.data;
  } catch (e) {
    return e?.response?.data;
  }
});

export const getPayment = createAsyncThunk(
  "payments/get-payment",
  async ({ transactionId }) => {
    try {
      let url = "payments/get-payment";
      const params = {};

      if (transactionId) {
        params.transactionId = transactionId;
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
export const getPaymentbyAuthCode = createAsyncThunk(
  "payments/get-paymentbyauthcode",
  async ({ transactionId }) => {
    try {
      let url = "payments/get-payment-by-authcode";
      const params = {};

      if (transactionId) {
        params.authcode = transactionId;
      }

      const response = await axiosInstance.get(url, {
        params: params, // Send params to the API call
      });
      return response?.data;
    } catch (e) {
      return e?.response?.data;
    }
  }
);
export const PostSubscribe = createAsyncThunk(
  "user/subscribe",
  async (body) => {
    try {
      const response = await axiosInstance.post(`user/subscribe`, body, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const Hireus = createAsyncThunk("hireUs/create", async (body) => {
  try {
    const response = await axiosInstance.post(`hireUs/create`, body, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
});
export const GetStaticeMetatag = createAsyncThunk(
  "metaTags/get-metaTag",
  async (body) => {
    try {
      const response = await axiosInstance.get(`metaTags/get-metaTag`, body, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const AuthCodeValidation = createAsyncThunk(
  "authcode-validation",
  async ({ type, authcode }) => {
    try {
      const response = await axiosInstance.get(
        `aiTool/authcode-test?type=${type}&authcode=${authcode}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (e) {
      return e.response.data;
    }
  }
);
export const restAllSlice = createSlice({
  name: "restall",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder

      .addCase(getOffer.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getOffer.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.offerData = action?.payload?.payload?.offerData;
      })
      .addCase(getOffer.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getPayment.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getpaymentdata = action?.payload?.payload?.payments?.[0];
      })
      .addCase(getPayment.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(GetStaticeMetatag.pending, (state) => {
        state.status = "pending";
      })
      .addCase(GetStaticeMetatag.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.getstaticemetatag = action?.payload?.payload?.metaTags;
      })
      .addCase(GetStaticeMetatag.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {} = restAllSlice.actions;

export default restAllSlice.reducer;
