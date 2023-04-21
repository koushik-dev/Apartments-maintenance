import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import Providers from "./Providers";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register(
    import.meta.env.MODE === "production" ? "/sw.js" : "/dev-sw.js?dev-sw",
    { type: import.meta.env.MODE === "production" ? "classic" : "module" }
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
);
