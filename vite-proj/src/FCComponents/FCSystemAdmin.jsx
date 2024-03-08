import React, { useEffect, useState } from "react";
import FCProfileAdmin from "./FCProfileAdmin";

export default function FCSystemAdmin(props) {
  const [users, setUsers] = useState([]); // State that holds the users in admin page

  // When component did mount, fetch users from local storage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || []; // Parse the users from local storage
    setUsers(storedUsers); // Set the users state
  }, []);

  // Function to delete a user
  const deleteUser = (email) => {
    const updatedUsers = users.filter((user) => user.email !== email); // Filter out the user to be deleted
    localStorage.setItem("users", JSON.stringify(updatedUsers)); // Update local storage with updated users
    setUsers(updatedUsers); // Update the users state
  };

  return (
    <div>
      <div className="cards-admin-display">
        <div className="cards-wrapper">
          {users.length === 0 ? (
            <p style={{ fontSize: "70px" }}>No Users</p>
          ) : (
            users.map((user, index) => (
              <FCProfileAdmin
                key={index}
                name={user.name}
                lastName={user.lastName}
                email={user.email}
                city={user.city}
                street={user.street}
                number={user.number}
                birth={user.birth}
                Delete={deleteUser} // Pass the delete function to FCProfileAdmin
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}