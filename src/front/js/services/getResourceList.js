export const getResourceList = (resource) => {
    return fetch(`https://automatic-garbanzo-ww4j66rrp7pcggw5-3001.app.github.dev/api/${resource}`)
      .then((res) => {
        if (!res.ok) {
          throw Error("There was an error with the request");
        }
        return res.json();
      })
      .then((res) => res.results)
      .catch((err) => console.log(err));
  };