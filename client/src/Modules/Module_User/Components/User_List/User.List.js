import React from "react";

import "./User.List.css";

const UserList = ({ users }) => (
  <div className="textContainer">
    {users ? (
      <div className="user-container">
        <h3 style={{ fontFamily: "Georgia" }}>Online Users</h3>
        <div>
          {users.map((user) => (
            <div
              key={user.userName}
              className="activeItem"
              style={{ marginBottom: 10 }}
            >
              <img
                src={user.userImage}
                alt="userPic"
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 30,
                  marginRight: 10,
                  borderColor: "white",
                  borderWidth: 2,
                  borderStyle: "solid",
                }}
              />
              <span style={{ fontSize: 20 }}>{user.userName}</span>
            </div>
          ))}
        </div>
      </div>
    ) : null}
  </div>
);

export default UserList;
