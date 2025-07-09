import React from "react";
import ReactDOM from "react-dom/client";
import '@fortawesome/fontawesome-free/css/all.min.css';

import reportWebVitals from "./reportWebVitals.ts";
import App from "./App.tsx";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration.ts';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
serviceWorkerRegistration.register();
