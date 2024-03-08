import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function FCEdit(props) {
  //states for update form
  const [Editusername, setEditUserName] = useState("");
  const [Editpass, setEditPass] = useState("");
  const [EditconPass, setEditConPass] = useState("");
  const [Editcity, setEditCity] = useState("");
  const [Editstreet, setEditStreet] = useState("");
  const [Editnumber, setEditNumber] = useState("");
  const [Editname, setEditName] = useState("");
  const [EditlastName, setEditLastName] = useState("");
  const [Editbirth, setEditBirth] = useState("");
  const [Editfile, setEditFile] = useState("");

  const [user, setUser] = useState({}); //user state that will be update

  const cities = ["Tel Aviv", "Rishon Lezion", "Netanya", "Eilat", "Haifa"];

  const navigate = useNavigate();

  //when this component is load do this
  useEffect(() => {
    const loggedInUser = JSON.parse(sessionStorage.getItem("loginUser")); //bring the user that is now looged in
    setUser(loggedInUser); //put is the user state
  }, []);

  const EditUser = () => {
    // create a updated user object with the updated values
    let updatedUser = {
      username: Editusername || user.username,
      pass: Editpass || user.pass,
      conPass: EditconPass || user.conPass,
      city: Editcity || user.city,
      street: Editstreet || user.street,
      number: Editnumber || user.number,
      name: Editname || user.name,
      lastName: EditlastName || user.lastName,
      birth: Editbirth || user.birth,
      file: Editfile || user.file,
      email: user.email, //email can not be changed
    };

    // send the updated user data to the parent component(App)
    props.SendToParent(updatedUser);
    navigate("/profile");
  };

  return (
    <div>
      <div>
        <div className="page-register">
          <div className="continer-form">
            <h1>
              <i className="fa-solid fa-pen" style={{ margin: "10px" }}></i>Edit
              Details
            </h1>
            <div className="input-wrapper">
              <div className="leftside">
                <div className="left-wraper">
                  Username:{" "}
                  <input
                    type="text"
                    value={Editusername}
                    onChange={(e) => setEditUserName(e.target.value)}
                  />
                  Password:{" "}
                  <input
                    type="password"
                    value={Editpass}
                    onChange={(e) => setEditPass(e.target.value)}
                  />
                  Confirm Password:{" "}
                  <input
                    type="password"
                    value={EditconPass}
                    onChange={(e) => setEditConPass(e.target.value)}
                  />
                  <label htmlFor="city">City:</label>
                  <select
                    id="city"
                    name="city"
                    value={Editcity}
                    onChange={(e) => setEditCity(e.target.value)}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option value={city}>{city}</option>
                    ))}
                  </select>
                  Street:{" "}
                  <input
                    type="text"
                    value={Editstreet}
                    onChange={(e) => setEditStreet(e.target.value)}
                  />
                  Number:{" "}
                  <input
                    type="text"
                    value={Editnumber}
                    onChange={(e) => setEditNumber(e.target.value)}
                  />
                </div>
              </div>

              <div className="rightside">
                <div className="right-wraper">
                  Name:{" "}
                  <input
                    type="text"
                    value={Editname}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                  Last Name:{" "}
                  <input
                    type="text"
                    value={EditlastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                  />
                  Date:{" "}
                  <input
                    type="date"
                    value={Editbirth}
                    onChange={(e) => setEditBirth(e.target.value)}
                  />
                  Profile Image:{" "}
                  <input
                    style={{ height: "50px", fontSize: "13px" }}
                    type="file"
                    value={Editfile}
                    onChange={(e) => setEditFile(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="button-wrap">
              <button className="button type1" onClick={EditUser}>
                <span className="btn-txt">Save Changes </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}