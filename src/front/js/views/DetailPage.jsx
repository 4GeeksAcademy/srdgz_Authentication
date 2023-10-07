import React from "react";
import { useParams, Link } from "react-router-dom";

import useAppContext from "../contexts/AppContext.jsx";

import classes from "./HomePage.module.css";

const DetailPage = () => {
  const params = useParams();
  const { store } = useAppContext();
  const { people, planets, starships, isLoading } = store;
  const resourceType = params.resourceType;
  const uid = params.uid;

  if (isLoading) {
    return <div className={classes.loader}></div>;
  }

  let targetResource;
  let resourceImage = "";
  switch (resourceType) {
    case "people":
      targetResource = people.find((person) => person.uid === uid);
      resourceImage = `https://starwars-visualguide.com/assets/img/characters/${uid}.jpg`;
      break;
    case "planets":
      targetResource = planets.find((planet) => planet.uid === uid);
      resourceImage = `https://starwars-visualguide.com/assets/img/planets/${uid}.jpg`;
      break;
    case "starships":
      targetResource = starships.find((starship) => starship.uid === uid);
      resourceImage = `https://starwars-visualguide.com/assets/img/starships/${uid}.jpg`;
      break;
    default:
      resourceImage = "https://i.blogs.es/2cc78a/ordenstarwars/1366_2000.jpg";
      break;
  }

  const propertyNames = Object.keys(targetResource || {});
  const excludedProperties = ["name", "url", "uid"];

  const transformPropertyName = (name) => {
    return name.toUpperCase().replace(/_/g, " ");
  };
  const filteredPropertyNames = propertyNames.filter(
    (propertyName) => !excludedProperties.includes(propertyName)
  );

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 mb-3 mb-md-0">
          <img
            src={resourceImage}
            className="img-fluid"
            style={{ width: "400px", height: "400px", objectFit: "cover", borderRadius: "10%" }}
            alt={resourceType}
            onError={(e) => {
              e.target.src = "https://i.blogs.es/2cc78a/ordenstarwars/1366_2000.jpg";
            }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="text-center text-white mb-3">{targetResource.name}</h1>
          <p className="text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-dark my-5">
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

export default DetailPage;
