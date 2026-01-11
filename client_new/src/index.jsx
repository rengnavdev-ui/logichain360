import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";
import "./styles/lang-switcher.css";
import "leaflet/dist/leaflet.css";
import "./utils/lang-switcher"; // Initialize LanguageSwitcherUI

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
