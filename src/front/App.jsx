import React from "react";
import Router from "./js/routes/router.jsx";
import { AppContextProvider } from "./js/contexts/AppContext.jsx";

function App() {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
}

export default App;
