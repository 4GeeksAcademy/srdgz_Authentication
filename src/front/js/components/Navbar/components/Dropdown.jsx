import React from "react";

import useAppContext from "../../../contexts/AppContext.jsx";

const Dropdown = () => {
  const {
    store: { favorites, token, people, planets, starships },
    actions: { removeFromFavorites },
  } = useAppContext();

  if (!token) {
    return null;
  }

  const counterFavorites = favorites ? favorites.length : 0;
  
  return (
    <div className="">
      <div className="dropdown">
        <button
          className="btn btn-dark dropdown-toggle me-5 my-3 fw-bold"
          type="button"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          FAVORITES {counterFavorites}
        </button>
        <ul className="dropdown-menu dropdown-menu-end">
          {favorites && favorites.length > 0 ? (
            favorites.map((el) => {
              let uid = 0;
              let name = "";
              let resourceType = "";
              let fav;
              {
                if (el.character_id != null) {
                  uid = el.character_id;
                  fav = Array.from(people).find((item) => Number(item.uid) === uid);
                  name = fav.name;
                  resourceType = "people";
                }
                if (el.planet_id != null) {
                  uid = el.planet_id;
                  fav = Array.from(planets).find((item) => Number(item.uid) === uid);
                  name = fav.name;
                  resourceType = "planets";
                }
                if (el.starship_id != null) {
                  uid = el.starship_id;
                  fav = Array.from(starships).find((item) => Number(item.uid) === uid);
                  name = fav.name;
                  resourceType = "starships";
                }
            }
              return (
                <li key={uid} className="dropdown-item">
                  <div className="d-flex justify-content-between">
                    {name}
                    <button
                      type="button"
                      className="btn-close ps-4"
                      onClick={() => removeFromFavorites(uid, resourceType)}
                    ></button>
                  </div>
                </li>
              );
            })
          ) : (
            <li>Empty</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
