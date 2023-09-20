import React from "react";

const StarshipsDetails = ({ model, passengers }) => {
  return (
    <>
      <p>
        <strong>Model: </strong>
        {model}
      </p>
      <p>
        <strong>Passengers: </strong>
        {passengers}
      </p>
    </>
  );
};

export default StarshipsDetails;