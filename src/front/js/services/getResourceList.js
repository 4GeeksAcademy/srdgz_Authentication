export const getResourceList = (resource) => {
    return fetch(`https://www.swapi.tech/api/${resource}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("There was an error with the request");
        }
        return res.json();
      })
      .then((res) => res.results)
      .catch((err) => console.log(err));
  };