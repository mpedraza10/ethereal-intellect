// React imports
import { useState, useEffect } from "react";

// Assets imports
import { copy, linkIcon, loader, tick } from "../assets";

const Demo = () => {
	// State
	const [article, setArticle] = useState({
		url: "",
		summary: "",
	});

	// Helper functions

	// Function to handle the submit of the form
	const handleSubmit = async (e) => {
		e.preventDefault();
		alert("Submited!");
	};

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
			</div>

			{/* Display Results */}
		</section>
	);
};

export default Demo;
