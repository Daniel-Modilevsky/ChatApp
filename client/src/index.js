import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import Routing from "./Router/routing";
import { BrowserRouter } from "react-router-dom";
import store from "./Reducers/Store";
import { Provider } from "react-redux";

store.subscribe(()=>{
  console.log('store updated');
  console.log(store.getState().me);
})

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routing />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
