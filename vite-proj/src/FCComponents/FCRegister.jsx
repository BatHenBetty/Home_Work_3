import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


import "@fortawesome/fontawesome-free/css/all.css";

export default function FCRegister(props) {
//states for the register form
const [username, setUserName] = useState("");
const [pass, setPass] = useState("");
const [conPass, setConPass] = useState("");
const [city, setCity] = useState("");
const [street, setStreet] = useState("");
const [number, setNumber] = useState("");
const [name, setName] = useState("");
const [lastName, setLastName] = useState("");
const [email, setEmail] = useState("");
const [birth, setBirth] = useState("");
const [file, setFile] = useState("");
//states for the messages of the errors
const [usernameError, setUsernameError] = useState("");
const [passwordError, setPasswordError] = useState("");
const [conPassError, setConPassError] = useState("");
const [nameError, setNameError] = useState("");
const [lastNameError, setLastNameError] = useState("");
const [emailError, setEmailError] = useState("");
const [birthError, setBirthError] = useState("");
const [numberError, setNumberError] = useState("");
const [streetError, setStreetError] = useState("");

const navigate = useNavigate(); //function to navigate between pages(components)

//creates new user as an object
function registerUser() {
  //check each value if is vaild if not it return true(error) and show the error message
  //without all false cant send the new User object
  if (
    validateUsername() &&
    validatePassword()&&
    validateConfirmPassword() &&
    validateName() &&
    validateLastName() &&
    validateEmail() &&
    validateBirth() &&
    validateNumber() &&
    validateStreet()
  ) {
    //creates user object
    let newUser = {
      username,
      pass,
      conPass,
      city,
      street,
      number,
      name,
      lastName,
      email,
      birth,
      file,
    };
    console.log(newUser)

    props.SendToParent(newUser); //send the new user to the parent(App)
    navigate("/"); //navigate to the sign in page
  }
}

//validate username
function validateUsername() {
  //letter in english and 1 special char 1 number
  const regex =
    /^(?=.[a-zA-Z])(?=.\d)(?=.[$@#!%^&])[a-zA-Z\d$@#!%^&*]{1,60}$/;

  if (!regex.test(username)) {
    //set message error to show
    setUsernameError("User must contain letters,chars(@#!),numbers");
    return false;
  }
  setUsernameError("");
  return true;
}

//validate password
function validatePassword() {
   //letter in english and 1 special char 1 number
  const regex =
    /^(?=.[A-Z])(?=.\d)(?=.[$@$!%?&])[A-Za-z\d$@$!%*?&]{7,12}$/;
  if (!regex.test(pass)) {
    setPasswordError(
      "Password must contain 7-12 chars,1 capital letter ,1 number ,1 special char(@#!)"
    );
    return false;
  }
  setPasswordError("");
  return true;
}

//validate confirm password
function validateConfirmPassword() {
  //check if password are the same as the con password 
  if (conPass !== pass) {
    setConPassError("Passwords do not match.");
    return false;
  }
  setConPassError("");
  return true;
}

//validate name
function validateName(name) {
  const regex = /^[A-Za-z]+$/;
  if (!regex.test(name)) {
    setNameError("Name must contain only English letters.");
    return false;
  }
  setNameError("");
  return true;
}

//validate last name
function validateLastName(lastName) {
  const regex = /^[A-Za-z]+$/;
  if (!regex.test(lastName)) {
    setLastNameError("Last Name must contain only English letters.");
    return false;
  }
  setLastNameError("");
  return true;
}

//validate email
function validateEmail() {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    setEmailError("Invalid email format.");
    return false;
  }
  setEmailError("");
  return true;
}

//validate birth
function validateBirth() {
  const currentDate = new Date();//takes the date of today
  const selectedDate = new Date(birth);//put the value inside varible 
  if (
    //check if the date are valid
    selectedDate > currentDate ||
    selectedDate.getFullYear() < 1904 ||
    selectedDate.getFullYear() > 2006
  ) {
    setBirthError("Please enter a valid birth date.");
    return false;
  }
  setBirthError("");
  return true;
}

//set the city from the select tag 
const cities = ["Jerusalem","Tel Aviv", "Rishon Lezion", "Netanya", "Eilat", "Haifa","Yokneam"];
function handleCityChange(event) {
  setCity(event.target.value);
}

//validate Number
function validateNumber() {
  if (number <= 0) {
    setNumberError("Number must be greater than 0");
    return false;
  }
  setNameError("")
  return true;
}

//validate Street
function validateStreet() {

  //hebrew letters
  const regex = /^[\u0590-\u05FF\s]+$/;
  if (!regex.test(street)) {
    setStreetError("Street must contain only Hebrew letters.");
    return false;
  }
  setStreetError("");
  return true;
}

return (
  <div>
    <div className="page-register">
      <div className="continer-form">
        <h1>Register</h1>
        <div className="input-wrapper">
          <div className="leftside">
            <div className="left-wraper">
              Username:{" "}
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
              {usernameError && <p className="error">{usernameError}</p>}
              Password:{" "}
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
              {passwordError && <p className="error">{passwordError}</p>}
              Confirm Password:{" "}
              <input
                type="password"
                value={conPass}
                onChange={(e) => setConPass(e.target.value)}
              />
              {conPassError && <p className="error">{conPassError}</p>}
              <label htmlFor="city">City:</label>
              <select
                id="city"
                name="city"
                value={city}
                onChange={handleCityChange}
              >
                <option value="">Select a city</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              Street:{" "}
              <input
                type="text"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                  validateStreet();
                }}
              />
              {streetError && <p className="error">{streetError}</p>}
              Number:{" "}
              <input
                type="text"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              {numberError && <p className="error">{numberError}</p>}
            </div>
          </div>

          <div className="rightside">
            <div className="right-wraper">
              Name:{" "}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {nameError && <p className="error">{nameError}</p>}
              Last Name:{" "}
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {lastNameError && <p className="error">{lastNameError}</p>}
              Email:{" "}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && <p className="error">{emailError}</p>}
              Date:{" "}
              <input
                type="date"
                value={birth}
                max={new Date().toISOString().split("T")[0]} // set max date to today's date
                onChange={(e) => setBirth(e.target.value)}
              />
              {birthError && <p className="error">{birthError}</p>}
              Profile Image:{" "}
              <input style={{height:"50px",fontSize:"13px"}} type="file" onChange={(e) => setFile(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="button-wrap">
          <button onClick={registerUser} className="button type1">
            <span className="btn-txt">Sign Up</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);
}