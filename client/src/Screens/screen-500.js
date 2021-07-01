import React from "react";
import error500 from "../static/500.gif";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Error500Page = () => {
  const [userID] = React.useState("");
  const [userLogerdInFlag, setMassageFlag] = React.useState(false);
  React.useEffect(() => {
    userID !== "" ? setMassageFlag(false) : setMassageFlag(true);
  }, []);

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        backgroundColor: "#1f2235",
        position: "absolute",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          position: "absolute",
          height: "80%",
          width: "80%",
          marginLeft: "10%",
          marginTop: "5%",
          borderWidth: 2,
          borderColor: "gray",
          borderStyle: "solid",
        }}
      >
        <img
          src={error500}
          alt="500"
          style={{ width: "100%", height: "80%" }}
        />
        <h2 style={{ color: "red", padding: 0, textAlign: "center" }}>
          We are sorry but we fix a system problem
        </h2>
        <ButtonGroup disableElevation variant="contained" color="primary"  style={{ marginLeft: "42%" }}>
          {userLogerdInFlag && (
            <Button
              onClick={() => {
                window.location.replace("/");
              }}
            >
              Sign In to the system
            </Button>
          )}
          {!userLogerdInFlag && (
            <Button
              onClick={() => {
                window.location.replace("/homepage");
              }}
            >
              Back To Homepage
            </Button>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Error500Page;
