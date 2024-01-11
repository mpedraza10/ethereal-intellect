// Query react redux toolkit imports
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Get rapid api key
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

// Export our service for the article api
export const articleApi = createApi({
	reducerPath: "articleApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://article-extractor-and-summarizer.p.rapidapi.com/",
		prepareHeaders: (headers) => {
			headers.set("X-RapidAPI-Key", rapidApiKey);
			headers.set(
				"X-RapidAPI-Host",
				"article-extractor-and-summarizer.p.rapidapi.com"
			);
		},
	}),
	endpoints: (builder) => ({
		getSummary: builder.query({
			query: (params) =>
				`/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
		}),
	}),
});

export const { useLazyGetSummaryQuery } = articleApi;
