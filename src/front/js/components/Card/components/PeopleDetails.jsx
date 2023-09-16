import React from "react";

const PeopleDetails = ({ gender, birth_year }) => {
  return (
    <>
      <p>
        <strong>Gender: </strong>
        {gender}
      </p>
      <p>
        <strong>Birth Year: </strong>
        {birth_year}
      </p>
    </>
  );
};

export default PeopleDetails;