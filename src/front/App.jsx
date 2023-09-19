import React from "react";

import Router from "./js/routes/router.jsx";
import { AppContextProvider } from "./js/contexts/AppContext.jsx";

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <AppContextProvider>
      <Toaster position="top-center" />
      <Router />
    </AppContextProvider>
  );
}

export default App;
