import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export default function FCProfile(props) {
  const [user, setUser] = useState({}); //user that loged in state
  const [logoutEmail, setLogoutEmail] = useState(""); // user that want to logout state
  const [showLogoutInput, setShowLogoutInput] = useState(false); // input show or hide state

  //on load this component do this
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loginUser")); //take the user that loged in
    setUser(loggedInUser); //put it in state
  }, []);
  const navigate = useNavigate();

  const logOut = () => {
    if (showLogoutInput) {
      if (logoutEmail == user.email) {
        navigate("/");
        sessionStorage.clear();
      }
    }
    setShowLogoutInput(true);
  };

  return (
    <div>
      <div className="container-card">
        <h1>My Profile</h1>
        <div class="card">
          <div className="img-wrapper">
            <div class="profileImage"></div>
          </div>
          <div class="textContainer">
            <p class="name">
              {user.name} {user.lastName}{" "}
            </p>
            <p className="content">
              <i class="fa-solid fa-envelope"></i>
              {user.email}
            </p>
            <p class="content">
              <i class="fa-solid fa-location-dot"></i> {user.city},{user.street}{" "}
              {user.number}
            </p>
            <p class="content">
              <i class="fa-solid fa-cake-candles"></i>
              {user.birth}
            </p>
          </div>
          <div className="button-wrapper">
            <button
              className="blue"
              onClick={() => {
                navigate("/edit");
              }}
            >
              <i class="fa-solid fa-pen"></i>Edit
            </button>
            <button>Game</button>
            <button className="red" onClick={logOut}>
              <i class="fa-solid fa-right-from-bracket"></i>LogOut
            </button>
          </div>
          {showLogoutInput && (
            <input
              type="text"
              value={logoutEmail}
              placeholder={"Enter Email and Click Logout"}
              onChange={(e) => setLogoutEmail(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
}