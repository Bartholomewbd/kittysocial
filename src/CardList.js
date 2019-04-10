import React from "react";
import Card from "./Card";

const CardList = ({ kittys }) => {
  return (
    <div>
      {kittys.map((user, i) => {
        return (
          <Card
            key={i}
            id={kittys[i].id}
            name={kittys[i].name}
            city={kittys[i].address.city}
            email={kittys[i].email}
          />
        );
      })}
    </div>
  );
};

export default CardList;
