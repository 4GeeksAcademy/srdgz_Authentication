export const getResourceDetails = (url) => {
    return fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("There was an error with the request");
        }
        return res.json();
      })
      .then((res) => {
        return {
          uid: res.result._id,
          ...res.result.properties,
        };
      })
      .catch((err) => console.log(err));
  };
  