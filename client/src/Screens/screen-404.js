import React from "react";
import error404 from "../static/404.gif";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const Error404Page = () => {
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
        <h2
          style={{
            color: "red",
            textAlign: "center",
            position: "absolute",
            width: "95%",
            fontSize: 40,
          }}
        >
          404{" "}
        </h2>
        <img
          src={error404}
          alt="404"
          style={{ width: "100%", height: "80%" }}
        />
        <h2 style={{ color: "red", padding: 0, textAlign: "center" }}>
          This Route is not exist
        </h2>
        <ButtonGroup
          disableElevation
          variant="contained"
          color="primary"
          style={{ marginLeft: "42%" }}
        >
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

export default Error404Page;
