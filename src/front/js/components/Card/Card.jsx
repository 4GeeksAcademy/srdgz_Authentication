import React from "react";
import { Link } from "react-router-dom";

import useAppContext from "../../contexts/AppContext.jsx";

import PeopleDetails from "./components/PeopleDetails.jsx";
import PlanetsDetails from "./components/PlanetsDetails.jsx";
import StarshipsDetails from "./components/StarshipsDetails.jsx";

const Card = ({
  uid,
  name,
  resourceType,
  gender,
  birth_year,
  gravity,
  population,
  model,
  passengers,
}) => {
  const {
    store: { favorites, token },
    actions: { addToFavorites, removeFromFavorites },
  } = useAppContext();
  let isFavorite = false;
  if (resourceType === "people") {
    isFavorite = Array.isArray(favorites) && favorites.some(
      (item) => item.character_id === Number(uid)
    );
  }
  if (resourceType === "planets") {
    isFavorite = Array.isArray(favorites) && favorites.some(
      (item) => item.planet_id === Number(uid)
    );
  }
  if (resourceType === "starships") {
    isFavorite = Array.isArray(favorites) && favorites.some(
      (item) => item.starship_id === Number(uid)
    );
  }
  
  return (
    <div
      className="card text-bg-dark border-light"
      style={{ minWidth: "18rem" }}
    >
      {resourceType === "people" && (
        <img
          src="https://starwars-visualguide.com/assets/img/categories/character.jpg"
          className="card-img-top object-fit-cover"
          style={{ minWidth: "17rem", height: 200 }}
          alt="..."
        />
      )}
      {resourceType === "planets" && (
        <img
          src="https://starwars-visualguide.com/assets/img/categories/planets.jpg"
          className="card-img-top object-fit-cover"
          style={{ minWidth: "17rem", height: 200 }}
          alt="..."
        />
      )}
      {resourceType === "starships" && (
        <img
          src="https://starwars-visualguide.com/assets/img/categories/starships.jpg"
          className="card-img-top object-fit-cover"
          style={{ minWidth: "17rem", height: 200 }}
          alt="..."
        />
      )}
      <div className="card-body">
        <h5 className="card-title fw-bold">{name}</h5>
        {resourceType === "people" && (
          <PeopleDetails gender={gender} birth_year={birth_year} />
        )}
        {resourceType === "planets" && (
          <PlanetsDetails population={population} gravity={gravity} />
        )}
        {resourceType === "starships" && (
          <StarshipsDetails model={model} passengers={passengers} />
        )}
        <div className="d-flex justify-between">
          <Link to={`/${resourceType}/${uid}`} className="btn btn-outline-light">
            Learn more!
          </Link>
          {token && (
          <button
            type="button"
            className="btn btn-outline-warning ms-auto"
            onClick={
              isFavorite
                ? () => removeFromFavorites(uid, resourceType)
                : () => addToFavorites(uid, resourceType)
            }
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
