const URL = "https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev";

const signup = (email, password) => {
    return fetch("https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/signup/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          if (data.accessToken) {
            localStorage.setItem("user", JSON.stringify(data));
          }
          return data;
        });
      } else {
        throw new Error('Network response was not ok');
      }
    });
  };

  const login = (email, password) => {
    return fetch("https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/login/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "email": email,
        "password": password,
      }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          if (data.accessToken) {
            localStorage.setItem("user", JSON.stringify(data));
          }
          return data;
        });
      } else {
        throw new Error('Network response was not ok');
      }
    });
  };

  const logout = () => {
    localStorage.removeItem("user");
  };
  
  const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
  };

  const authService = {
    signup,
    login,
    logout,
    getCurrentUser,
  };

  export default authService;
  
  
  
  
  
  