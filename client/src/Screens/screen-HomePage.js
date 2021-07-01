import React from "react";
import Header from "../Layout/header";
import Room from "../Modules/Module_Room/Components/Room/room";

const HomePage = () => {  
  return (
    <div>
      <Header/>
      <Room roomName={'Lobby'}/>
    </div>
  );
};

export default HomePage;

