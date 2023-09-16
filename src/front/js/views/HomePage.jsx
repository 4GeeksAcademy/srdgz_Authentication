import React from "react";
import Section from "../components/Section";
import useAppContext from "../contexts/AppContext.jsx";

import classes from "./HomePage.module.css";

const HomePage = () => {
  const { store } = useAppContext();
  const { isLoading } = store;
  if (isLoading) {
    return <div className={classes.loader}></div>;
  }
  return (
    <main className="container">
      <Section resourceType="people" target="people" title="Characters" />
      <Section resourceType="planets" target="planets" title="Planets" />
      <Section resourceType="starships" target="starships" title="Starships" />
    </main>
  );
};

export default HomePage;
