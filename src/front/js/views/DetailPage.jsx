import React from "react";
import { useParams, Link } from "react-router-dom";

import useAppContext from "../contexts/AppContext.jsx";

import classes from "./HomePage.module.css";

const DetailPage = () => {
  const params = useParams();
  const { store } = useAppContext();
  const { people, planets, starships, isLoading } = store;
  const { uid, resourceType } = params;
  const resourceList =
  resourceType === "people"
    ? people
    : resourceType === "planets"
    ? planets
    : starships;
  const targetResource = resourceList.find((item) => item.uid === uid);

  const resourceImage =
  resourceType === "people"
    ? "https://starwars-visualguide.com/assets/img/characters/13.jpg"
    : resourceType === "planets"
    ? "https://starwars-visualguide.com/assets/img/planets/8.jpg"
    : "https://starwars-visualguide.com/assets/img/starships/10.jpg";

  const excludedProperties = ["name", "url", "uid"];
  const renderDetails = () => {
    const propertyNames = Object.keys(targetResource);

    const filteredPropertyNames = propertyNames.filter(
      (propertyName) => !excludedProperties.includes(propertyName)
    );

    const transformPropertyName = (name) => {
      return name.toUpperCase().replace(/_/g, " ");
    };

    return (
      <div className="w-100 h-100">
        <div className="container">
          <div className="row row-col-md-2 rows-cols-2 my-5 p-3 border border-dark-subtle rounded">
            <div className="col m-5 text-center">
              <img
                src={resourceImage}
                className="img-fluid"
                style={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "10%" }}
                alt={resourceType}
              />
            </div>
            <div className="col text-start m-5">
              <h1 className="text-center text-warning">{targetResource.name}</h1>
              <p className="me-2 text-white">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="container table-responsive">
              <table className="table table-dark">
                <thead>
                  <tr>
                    {filteredPropertyNames.map((propertyName) => (
                      <th
                        key={propertyName}
                        className="text-warning text-center align-middle"
                      >
                        <strong>{transformPropertyName(propertyName)}</strong>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {filteredPropertyNames.map((propertyName) => (
                      <td key={propertyName} className="text-center text-white">
                        {targetResource[propertyName]}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <Link to="/">
            <button type="button" className="btn btn-outline-light m-5">
              Go back!
            </button>
          </Link>
        </div>
      </div>
    );
  };

  return isLoading ? <div className={classes.loader}></div> : renderDetails();
};

export default DetailPage;