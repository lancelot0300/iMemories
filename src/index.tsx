import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./state/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
          <App />
      </Provider>
    </Router>
  </React.StrictMode>
);

// root.render(
//   <Router>
//     <Provider store={store}>
//         <App />
//     </Provider>
//   </Router>
// );
