import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import authSlice from "./ApiSlice/authSlice";
import blogSlice from "./ApiSlice/blogSlice";
import aiToolsSlice from "./ApiSlice/aiToolsSlice";
import bookmarkSlice from "./ApiSlice/bookmarkSlice";
import aiToolSortVideoSlice from "./ApiSlice/aiToolSortVideoSlice";
import subscriptionPlanSlice from "./ApiSlice/subscriptionPlanSlice";
import articleSlice from "./ApiSlice/articleSlice";
import restAllSlice from "./ApiSlice/restAllSlice";
import gptSlice from "./ApiSlice/gptSlice";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth: authSlice,
  blog: blogSlice,
  aiTools: aiToolsSlice,
  bookmark: bookmarkSlice,
  aiToolsshortvideo: aiToolSortVideoSlice,
  subscriptionPlan: subscriptionPlanSlice,
  article: articleSlice,
  restall: restAllSlice,
  gpt: gptSlice,
});

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: [
    "auth",
    "blog",
    "aiTools",
    "bookmark",
    "aiToolsshortvideo",
    "subscriptionPlan",
    "article",
    "restall",
    "gpt",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // devTools: false,
});

export const persistor = persistStore(store);
export default store;
