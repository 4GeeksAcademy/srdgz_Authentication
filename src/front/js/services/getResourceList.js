export const getResourceList = (resource) => {
    return fetch(`https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/${resource}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("There was an error with the request");
        }
        return response.json();
      })
      .then((response) => response.results)
      .catch((error) => console.log(error));
  };