import React from "react";

import useAppContext from "../../../contexts/AppContext.jsx";

const Dropdown = () => {
  const {
    store: { favorites, token },
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
        <ul className="dropdown-menu p-3">
          {favorites && favorites.length > 0 ? (
            favorites.map((el) => {
              return (
                <li key={el.uid}>
                  <div className="d-flex justify-content-between">
                    {el?.name}
                    <button
                      type="button"
                      className="btn-close ps-4"
                      onClick={() => removeFromFavorites(el.uid, el.resourceType)}
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
