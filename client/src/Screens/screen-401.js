import React from "react";
import error401 from "../static/401.png";
import Button from "@material-ui/core/Button";

const Error401Page = () => {
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
          src={error401}
          alt="404"
          style={{ width: "100%", height: "80%" }}
        />
        <h2 style={{ color: "red", padding: 0, textAlign: "center" }}>
          Sign In First
        </h2>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          onClick={() => {
            window.location.replace("/");
          }}
          style={{ marginLeft: "43%" }}
        >
          Sign In to the system
        </Button>
      </div>
    </div>
  );
};

export default Error401Page;
