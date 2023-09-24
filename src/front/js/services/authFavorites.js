const BASE_URL = "https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api";

const addFavoriteToAPI = (resource_id, resource_type, user_id) => {
  return fetch(`${BASE_URL}/user/${user_id}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "resource_type": resource_type,
        "resource_id": resource_id,
        "user_id": user_id,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to add favorite");
      }})
      .catch((error) => {
        console.log(error);
      })
    };

    const getFavoritesFromAPI = (user_id) => {
      return fetch(`${BASE_URL}/user/${user_id}/favorites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log(error);
        return [];
      });
    };

    const deleteFavoriteFromAPI = (user_id, favoriteId) => {
      return fetch(`${BASE_URL}/user/${user_id}/favorites/${favoriteId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return "Favorite deleted successfully";
        } else if (response.status === 404) {
          throw new Error("Favorite not found");
        } else {
          throw new Error("Failed to delete favorite");
        }
      })
      .catch((error) => {
        console.error("Error deleting favorite:", error);
        throw error; 
      });
    }; 
      

const authFavorites = {
  addFavoriteToAPI,
  getFavoritesFromAPI,
  deleteFavoriteFromAPI,
}

export default authFavorites;