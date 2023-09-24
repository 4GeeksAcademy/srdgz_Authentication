import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";

import useResources from "../hooks/useResources";
import authService from "../services/authService";
import authFavorites from "../services/authFavorites";

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

  const isLoading = useMemo(() => {
    return peopleAreLoading || planetsAreLoading || starshipsAreLoading;
  }, [peopleAreLoading, planetsAreLoading, starshipsAreLoading]);

  useEffect(() => {
    if (token && token !== "" && token !== undefined) {
      setAuthenticated(true);
    }
  }, [token]);

  /*
  useEffect(() => {
    const LSFavorites = localStorage.getItem("favorites");

    if (LSFavorites) {
      setFavorites(JSON.parse(LSFavorites));
      return;
    }
  }, []);
*/

  const login = async (email, password, navigate) => {
  try {
    const response = await authService.login(email, password);
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.user_id);
    setAuthenticated(true);
    const favorites = await authFavorites.getFavoritesFromAPI(response.user_id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    navigate("/");
  } catch (error) {
    console.error("Login failed: ", error);
  }};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("favorites");
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

  const addToFavorites = async (resource_id, resource_type) => {
    try {
      const userId = localStorage.getItem("userId");
      await authFavorites.addFavoriteToAPI(resource_id, resource_type, userId);
      const updatedFavorites = await authFavorites.getFavoritesFromAPI(userId);
      let prevFavorites = JSON.parse(localStorage.getItem("favorites"));
      if (!prevFavorites) {
        prevFavorites = [];
      }
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      toast.success("This is the way", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
      toast.error("Failed to add favorite. Try again", {
        duration: 3000,
      });
    }
  };
  
  const removeFromFavorites = async (uid, resourceType) => {
    try {
      const userId = localStorage.getItem("userId");
      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const favoriteToRemoveIndex = favorites.findIndex((favorite) => {
        return favorite.uid === uid && favorite.resourceType === resourceType;
      });
      if (favoriteToRemoveIndex === -1) {
        throw new Error("Favorite not found");
      }
      const favoriteToRemove = favorites[favoriteToRemoveIndex];
      await authFavorites.deleteFavoriteFromAPI(userId, favoriteToRemove.favorite_id);
      const newFavorites = [...favorites];
      newFavorites.splice(favoriteToRemoveIndex, 1);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      toast.success("Favorite removed successfully", {
        duration: 3000,
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      toast.error("Failed to remove favorite. Try again", {
        duration: 3000,
      });
    }
  };
  
  

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
  