import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

//CSS Imports
import "./App.css";
import "./assets/StyleSheets/RegisterStyle.css";
import "./assets/StyleSheets/LoginStyle.css";
import "./assets/StyleSheets/CardStyle.css";
import "./assets/StyleSheets/AdminDisplay.css";
//Coponents Imports
import FCRegister from "./FCComponents/FCRegister";
import FCLogin from "./FCComponents/FCLogin";
import FCProfile from "./FCComponents/FCProfile";
import FCEdit from "./FCComponents/FCEdit";
import FCSystemAdmin from "./FCComponents/FCSystemAdmin";

function App() {
  const [userArray, setUserArray] = useState([]); //Usestate that holds the array of users
  const [user, setUser] = useState({});

  //on load will do this useEffect
  useEffect(() => {
    loadUsers();
  }, []);

  function loadUsers() {
    const storedUsers = localStorage.getItem("users"); //bring the users from LS
    //if exists than parse them and put them in the array of users
    if (storedUsers) {
      const parsedUsers = JSON.parse(storedUsers);
      setUserArray(parsedUsers);
    } else {
      const createdUsers = []; //create a new one
      localStorage.setItem("users", JSON.stringify(createdUsers));
    }
  }

  //function that add user
  const addUserFromRegister = (userFromChild) => {
    setUserArray((prevUserArray) => {
      const newUserArray = [...prevUserArray, userFromChild]; // take the last array of user and add the user that register
      localStorage.setItem("users", JSON.stringify(newUserArray)); //put the new array in the LS
      return newUserArray;
    });
  };

  const EditUserFromEdit = (editUser) => {
    let loggedInUser = JSON.parse(sessionStorage.getItem("loginUser")); // take the loged in user
    setUserArray((prevUserArray) => {
      const index = prevUserArray.findIndex(
        (user) => user.email === loggedInUser.email
      ); //find what index is the logged in user to give the new array the exact index where to update
      if (editUser.email === loggedInUser.email) {
        const newUserArray = [...prevUserArray]; //create new array
        newUserArray[index] = editUser; //in the new array at the index place put the user that came from the child(edit user)
        localStorage.setItem("users", JSON.stringify(newUserArray));
        sessionStorage.setItem("loginUser", JSON.stringify(editUser)); //put on session storage the current user that logged in
        return newUserArray;
      } else {
        console.error("User not found for editing.");
        return prevUserArray;
      }
    });
  };

  function DeleteUser(email) {
    let filterArray = userArray.filter((user) => user.email !== email);
    setUserArray(filterArray);
    localStorage.setItem("users", JSON.stringify(filterArray));
  }

  const navigate = useNavigate();
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand>⭐</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/register")}>Register</Nav.Link>
            <Nav.Link onClick={() => navigate("/")}>Login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<FCLogin userLoginDetails={setUser} />} />
        <Route path="/profile" element={<FCProfile />} />
        <Route path="/systemadmin" element={<FCSystemAdmin />} />
        <Route
          path="/register"
          element={<FCRegister SendToParent={addUserFromRegister} />}
        />
        <Route
          path="/edit"
          element={<FCEdit SendToParent={EditUserFromEdit} />}
        />
      </Routes>
    </>
  );
}

export default App;