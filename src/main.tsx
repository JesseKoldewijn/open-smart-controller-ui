import { StrictMode } from "react";
import { render } from "preact";
import { App } from "./app";

render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById("app")!,
);
