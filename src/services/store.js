// Redux toolkit imports
import { configureStore } from "@reduxjs/toolkit";

// Services imports
import { articleApi } from "./article";

// Configuring the store which is the global state of our site
export const store = configureStore({
	reducer: { [articleApi.reducerPath]: articleApi.reducer },
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(articleApi.middleware),
});
