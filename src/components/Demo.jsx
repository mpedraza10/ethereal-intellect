// React imports
import { useState, useEffect } from "react";

// Redux hook import
import { useLazyGetSummaryQuery } from "../services/article";

// Assets imports
import { copy, linkIcon, loader, tick } from "../assets";

const Demo = () => {
	// State
	const [article, setArticle] = useState({
		url: "",
		summary: "",
	});

	// State for articles history
	const [allArticles, setAllArticles] = useState([]);

	// State for the copy
	const [copied, setCopied] = useState("");

	// Hook to fetch the summary of a given url
	const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery();

	// Helper functions

	// Function to handle the submit of the form
	const handleSubmit = async (e) => {
		e.preventDefault();

		const { data } = await getSummary({ articleUrl: article.url });

		if (data?.summary) {
			// Create the new article object
			const newArticle = { ...article, summary: data.summary };

			// Add the new article to history
			const updatedAllArticles = [newArticle, ...allArticles];

			// Set the new article and updated articles to history
			setArticle(newArticle);
			setAllArticles(updatedAllArticles);

			// Update the articles history to local storage
			localStorage.setItem("articles", JSON.stringify(updatedAllArticles));
		}
	};

	// Function to handle the copy to clipboard event
	const handleCopy = (copyUrl) => {
		setCopied(copyUrl);
		navigator.clipboard.writeText(copyUrl);
		setTimeout(() => setCopied(false), 3000);
	};

	// Effects

	// Effect to handle local storage for history of articles
	useEffect(() => {
		const articlesFromLocalStorage = JSON.parse(
			localStorage.getItem("articles")
		);

		if (articlesFromLocalStorage) setAllArticles(articlesFromLocalStorage);
	}, []);

	return (
		<section className="mt-16 w-full max-w-xl">
			{/* Search */}
			<div className="flex flex-col w-full gap-2">
				<form
					className="relative flex justify-center items-center"
					onSubmit={handleSubmit}
				>
					<img
						src={linkIcon}
						alt="link_icon"
						className="absolute left-0 my-2 ml-3 w-5"
					/>
					<input
						className="url_input peer"
						type="url"
						placeholder="Enter a url"
						value={article.url}
						onChange={(e) => setArticle({ ...article, url: e.target.value })}
						required
					/>
					<button
						type="submit"
						className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700"
					>
						↵
					</button>
				</form>

				{/* Browse URL History */}
				<div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
					{allArticles.map((article, index) => (
						<div
							key={`link-${index}`}
							onClick={() => setArticle(article)}
							className="link_card"
						>
							<div className="copy_btn" onClick={() => handleCopy(article.url)}>
								<img
									src={copied === article.url ? tick : copy}
									alt="copy_icon"
									className="w-[40%] h-[40%] object-contain"
								/>
							</div>
							<p className="flex-1 font-satoshi text-blue-700 font-medium text-sm truncate">
								{article.url}
							</p>
						</div>
					))}
				</div>
			</div>

			{/* Display Results */}
			<div className="my-10 max-w-full flex justify-center items-center">
				{isFetching ? (
					<img src={loader} alt="loader" className="w-20 h-20 object-contain" />
				) : error ? (
					<p className="font-inter font-bold text-black text-center">
						Well, that wasn&#39;t suppose to hapen... <br />
						<span className="font-satoshi font-normal text-gray-700">
							{error?.data?.error}
						</span>
					</p>
				) : (
					article.summary && (
						<div className="flex flex-col gap-3">
							<h2 className="font-satoshi text-gray-600 text-xl">
								Article <span className="blue_gradient">Summary</span>
							</h2>
							<div className="summary_box">
								<p className="font-inter font-medium text-sm text-gray-700">
									{article.summary}
								</p>
							</div>
						</div>
					)
				)}
			</div>
		</section>
	);
};

export default Demo;
