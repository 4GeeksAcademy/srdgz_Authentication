import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import useResources from "../hooks/useResources";
import authService from "../services/authService";

import toast from "react-hot-toast";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [people, peopleAreLoading] = useResources("people");
  const [planets, planetsAreLoading] = useResources("planets");
  const [starships, starshipsAreLoading] = useResources("starships");
  const [favorites, setFavorites] = useState([]);
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const [authenticated, setAuthenticated] = useState(false);


  useEffect(() => {
    if (token && token !== "" && token !== undefined) {
      setAuthenticated(true);
    }
  }, [token]);

  useEffect(() => {
    const LSFavorites = localStorage.getItem("favorites");

    if (LSFavorites) {
      setFavorites(JSON.parse(LSFavorites));
      return;
    }
  }, []);

  const isLoading = useMemo(() => {
    return peopleAreLoading || planetsAreLoading || starshipsAreLoading;
  }, [peopleAreLoading, planetsAreLoading, starshipsAreLoading]);

  const login = async (email, password, navigate) => {
  try {
    const response = await authService.login(email, password);
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.user_id);
    setAuthenticated(true);
    navigate("/");
  } catch (error) {
    console.error("Login failed: ", error);
  }};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setAuthenticated(false);
  };

  const signup = async (email, password, navigate) => {
    if (!email || !password) {
      toast.error("Please enter both email and password", {
        duration: 4000,
      });
      return;
    }
    try {
      const response = await authService.signup(email, password);
      if (response) {
        toast.success("Successfully registered user.\nThe force is with you.\nNow, you can log in", {
          duration: 5000,
        });
        navigate("/login");
        localStorage.setItem(`userFavorites_${userId}`, JSON.stringify([]));
      } else {
        toast.error("Help me, Obi-Wan Kenobi. You are my only hope", {
          duration: 5000,
        });
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error("Help me, Obi-Wan Kenobi. You are my only hope", {
        duration: 5000,
      });
    }
  };

  const addToFavorites = (uid, resourceType, name) =>
  setFavorites((prev) => {
    const newFavorite = { uid, name, resourceType };
    localStorage.setItem(
      "favorites",
      JSON.stringify([...prev, newFavorite])
    );
    return [...prev, newFavorite];
  });

  const removeFromFavorites = (uid, resourceType) =>
    setFavorites((prev) => {
      const newFavs = prev.filter(
        (favorite) => favorite.uid !== uid || favorite.resourceType !== resourceType
      );
      localStorage.setItem("favorites", JSON.stringify(newFavs));
      return newFavs;
    });

  const store = {
    people,
    planets,
    starships,
    isLoading,
    favorites,
    token,
    userId,
  };
  const actions = {
    addToFavorites,
    removeFromFavorites,
    login,
    logout,
    signup,
  };

  return (
    <AppContext.Provider value={{ store, actions }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export default useAppContext;
  