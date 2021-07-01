import React from "react";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import AppDrawer from "./Drawer";

export default function TemporaryDrawer() {
  const [toggleState, setToggleState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setToggleState({ ...toggleState, [anchor]: open });
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={"hey"}>
          <Button onClick={toggleDrawer(anchor, true)}>hey2</Button>
          <Drawer
            anchor={anchor}
            open={toggleState[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            <AppDrawer />
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
