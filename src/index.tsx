import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from 'react-helmet-async';

import reportWebVitals from "./reportWebVitals.ts";
import App from "./App.tsx";
import "./index.css";
import * as serviceWorkerRegistration from './serviceWorkerRegistration.ts';

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
serviceWorkerRegistration.register();
