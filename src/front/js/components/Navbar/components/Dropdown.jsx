import React from "react";

import useAppContext from "../../../contexts/AppContext.jsx";

const Dropdown = () => {
  function counterFavorites() {
    favorites.length;
    if (favorites.length >= 1) return favorites.length;
    else return 0;
  }

  const {
    store: { favorites },
    actions: { removeFromFavorites },
  } = useAppContext();
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
          FAVORITES {counterFavorites()}
        </button>
        <ul className="dropdown-menu p-3">
          {favorites?.length ? (
            favorites.map((el) => {
              return (
                <li key={el.uid}>
                  <div className="d-flex justify-content-between">
                    {el?.name}

                    <button
                      type="button"
                      className="btn-close ps-4"
                      onClick={() => removeFromFavorites(el.uid)}
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
