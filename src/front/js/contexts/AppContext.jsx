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
  const [authenticated, setAuthenticated] = useState(false);
  const userId = localStorage.getItem("userId");

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
    localStorage.setItem("token", response.token)
    setAuthenticated(true);
    navigate("/");
  } catch (error) {
    console.error("Login failed: ", error);
  }};

  const logout = () => {
    localStorage.removeItem("token");
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

  const addToFavorites = (uid, name) =>
    setFavorites((prev) => {
      localStorage.setItem(
        "favorites",
        JSON.stringify([...prev, { uid, name }])
      );
      return [...prev, { uid, name }];
    });

  const removeFromFavorites = (uid) =>
    setFavorites((prev) => {
      const newFavs = prev.filter((favorite) => favorite.uid !== uid);
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
  