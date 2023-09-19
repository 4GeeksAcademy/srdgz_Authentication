import React, {
    createContext,
    useContext,
    useMemo,
    useState,
    useEffect,
  } from "react";

  
  import useResources from "../hooks/useResources";
  import authService from "../services/authService";
  
  const AppContext = createContext();
  
  export const AppContextProvider = ({ children }) => {
    const [people, peopleAreLoading] = useResources("people");
    const [planets, planetsAreLoading] = useResources("planets");
    const [starships, starshipsAreLoading] = useResources("starships");
    const [favorites, setFavorites] = useState([]);
    const token = localStorage.getItem("token");
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
      localStorage.setItem("token", response.token)
      setAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Error en el inicio de sesión:", error);
    }};
  
    const logout = () => {
      localStorage.removeItem("token");
      setAuthenticated(false);
    };

    const signup = async (email, password, navigate) => {
      if (!email || !password) {
        alert("Please enter both email and password");
        return;
      }
      try {
        const response = await authService.signup(email, password);
        if (response) {
          alert("User created successfully. Now you can log in");
          navigate("/login");
        } else {
          alert("Error registering user");
        }
      } catch (error) {
        console.error("Error registering user:", error);
        alert("Error registering user");
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
  