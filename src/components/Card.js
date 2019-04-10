import React from "react";

const Card = ({ name, email, city, id }) => {
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
      <img src={`https://robohash.org/set_set4/${id}?size=200x200`} alt="cat" />
      <div>
        <h2>{name}</h2>
        <p>City: {city}</p>
        <p>Email: {email}</p>
      </div>
    </div>
  );
};

export default Card;
