import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./firebase";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import moviesReducer from "./store/movies/reducers/moviesReducer";
import peoplesReducer from "./store/peoples/reducers/peoplesReducer";
import searchReducer from "./store/search/reducers/searchReducer";
import authReducer from "./store/auth/reducers/authReducer";

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    peoples: peoplesReducer,
    search: searchReducer,
    auth: authReducer
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
