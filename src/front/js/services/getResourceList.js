export const getResourceList = (resourceType) => {
  const API_url = 'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/';
    return fetch(`${API_url}${resourceType}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("There was an error with the request");
        }
        return response.json();
      })
      .then((response) => response.results)
      .catch((error) => console.log(error));
  };