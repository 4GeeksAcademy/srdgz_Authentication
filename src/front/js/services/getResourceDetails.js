export const getResourceDetails = (resourceType, uid) => {
  const API_url = 'https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/';
    return fetch(`${API_url}${resourceType}/${uid}`)
      .then((response) => {
        if (!response.ok) {
          throw Error("There was an error with the request");
        }
        return response.json();
      })
      .then((data) => {
        const result = data.result;
        const properties = result.properties;
        const uid = result.uid;
        return { properties, uid };
      })
      .catch((error) => console.log(error));
  };
  