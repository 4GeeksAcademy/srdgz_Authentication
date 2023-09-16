export const createUser = ({ username, email, password }) => {
    const data = JSON.stringify({
        username: username,
        email: email,
        password: password,
    })
    return fetch(`https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/user`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: data,
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error(
                `Error al agregar el nuevo contacto: ${response.statusText}`
              );
        }
        return response.json();
      })
      .then((response) => {
        return response;
      })
      .catch((error) => console.log(error));
  };