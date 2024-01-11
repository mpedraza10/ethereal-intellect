// React imports
import React from "react";

// React dom imports
import ReactDOM from "react-dom/client";

// React redux imports
import { Provider } from "react-redux";

// Services imports
import { store } from "./services/store.js";

// Components
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
);
