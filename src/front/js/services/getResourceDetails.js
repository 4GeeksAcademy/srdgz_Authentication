export const getResourceDetails = (url) => {
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw Error("There was an error with the request");
        }
        return response.json();
      })
      .then((response) => {
        return {
           uid: response.result_id,
          ...response.result.properties,
        };
      })
      .catch((error) => console.log(error));
  };
  