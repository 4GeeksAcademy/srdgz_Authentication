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
  starship_class,
}) => {
  const {
    store: { favorites },
    actions: { addToFavorites, removeFromFavorites },
  } = useAppContext();
  const isFavorite = favorites.some((items) => items.uid === uid);
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
          <StarshipsDetails model={model} starship_class={starship_class} />
        )}
        <div className="d-flex justify-between">
          <Link to={`/${uid}`} className="btn btn-outline-light">
            Learn more!
          </Link>
          <button
            type="button"
            className="btn btn-outline-danger ms-auto"
            onClick={
              isFavorite
                ? () => removeFromFavorites(uid)
                : () => addToFavorites(uid, name)
            }
          >
            {isFavorite ? (
              <i className="fa-solid fa-heart"></i>
            ) : (
              <i className="fa-regular fa-heart"></i>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
