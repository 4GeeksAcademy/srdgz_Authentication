import React from "react";

const StarshipsDetails = ({ model, starship_class }) => {
  return (
    <>
      <p>
        <strong>Model: </strong>
        {model}
      </p>
      <p>
        <strong>Class: </strong>
        {starship_class}
      </p>
    </>
  );
};

export default StarshipsDetails;