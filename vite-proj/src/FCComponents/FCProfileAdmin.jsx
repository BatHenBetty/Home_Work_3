import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FCProfileAdmin(props) {
  const navigate = useNavigate();

  //on click delete button it sends to parent the delete email of the current user
  const deleteUser = () => {
    props.Delete(props.email);
  };
  return (
    <div>
      <div>
        <div class="card">
          <div className="img-wrapper">
            <div class="profileImage"></div>
          </div>
          <div class="textContainer">
            <p class="name">
              {props.name} {props.lastName}{" "}
            </p>
            <p className="content">
              <i class="fa-solid fa-envelope"></i>
              {props.email}
            </p>
            <p class="content">
              <i class="fa-solid fa-location-dot"></i> {props.city},
              {props.street} {props.number}
            </p>
            <p class="content">
              <i class="fa-solid fa-cake-candles"></i>
              {props.birth}
            </p>
          </div>
          <div className="button-wrapper">
            <button
              className="blue"
              onClick={() => {
                navigate("/edit");
              }}
            >
              <i class="fa-solid fa-pen"></i>
            </button>
            <button onClick={deleteUser} className="red">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}