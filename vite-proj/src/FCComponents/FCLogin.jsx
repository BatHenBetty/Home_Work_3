import React, { useState } from "react";
import { useNavigate } from "react-router-dom";





import "@fortawesome/fontawesome-free/css/all.css";

export default function FCLogin(props) {
  const [username, setUserName] = useState(""); //user name state
  const [pass, setPass] = useState(""); // user password state
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState(false); //error message if details are wrong

  const navigate = useNavigate();

  const handleSignin = () => {
    navigate("/register"); //if details are correct
  };

  const loginUser = () => {
    const saveUsers = localStorage.getItem("users"); //takes the users from LS
    const parsedUsers = JSON.parse(saveUsers); //parse them
    let userFound = false; //set the user found

    //foreach user in the array check username and password
    parsedUsers.forEach((user) => {
      if (user.username === username && user.pass === pass) {
        sessionStorage.setItem("loginUser", JSON.stringify(user)); //put on session storage the current user that logged in
        setLoggedInUser(user); //change the state of user that is logged in
        userFound = true;
        navigate("/profile"); //navigate to the profile component
      }
    });
    //check if the user is an admin
    if (username === "admin" && pass === "ad12343211ad") {
      navigate("/systemadmin");
      sessionStorage.setItem(
        "loginUser",
        JSON.stringify({ Name: "admin", Admin: true })
      );
    }
    if (!userFound) {
      setError(true);
    }
  };

  return (
    <div>
     
      <div className="page-login">
        <div className="login-form">
          <h1>Login</h1>
          {error && ( // if error set to true then show a div with p that show the error
            <div className="error-container">
              <p className="error-message">
                <i className="fas fa-sad-tear"></i> Something went wrong. Please
                check your username and password.
              </p>
            </div>
          )}{" "}
          <div className="inputs">
            <div className="center">
              <span>
                <i className="fa-solid fa-user"></i>
                Username:{" "}
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              <span>
                <i className="fa-solid fa-key"></i>
                Password:{" "}
              </span>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>
          <div className="button-wrap">
            <button onClick={loginUser} className="button-login type2">
              <span className="btn-txt-login">Login</span>
            </button>
            <p className="signin">
              Don't have an account?{" "}
              <button className="buttonSignin" onClick={handleSignin}>
                Sign Up
              </button>{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}