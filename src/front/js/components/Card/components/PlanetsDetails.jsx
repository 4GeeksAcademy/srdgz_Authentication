import React from "react";

const PlanetsDetails = ({ population, gravity }) => {
  return (
    <>
      <p>
        <strong>Population: </strong>
        {population}
      </p>
      <p><strong>Gravity: </strong>
        {gravity}</p>
    </>
  );
};

export default PlanetsDetails;
