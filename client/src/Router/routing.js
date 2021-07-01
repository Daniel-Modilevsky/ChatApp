import { Switch, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import Auth from "../Screens/screen-Auth";
import HomePage from "../Screens/screen-HomePage";
import Error404Page from "../Screens/screen-404";
import Error401Page from "../Screens/screen-401";
import Error500Page from "../Screens/screen-500";
import Room from "../Modules/Module_Room/Components/Room/room";
import AppDrawer from "../Layout/Drawer";

function Routing() {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#1f2235",
        position: "absolute",
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {" "}
            <Auth />{" "}
          </Route>
          <Route path="/homepage" exact>
            {" "}
            <HomePage />{" "}
          </Route>
          <Route path="/500" exact>
            {" "}
            <Error500Page />{" "}
          </Route>
          <Route path="/room" exact>
            {" "}
            <Room />{" "}
          </Route>
          <Route path="/temp" exact>
            {" "}
            <AppDrawer />{" "}
          </Route>
          <Route path="/401" exact>
            {" "}
            <Error401Page />{" "}
          </Route>
          <Route path="/*" exact>
            {" "}
            <Error404Page />{" "}
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default Routing;
