import { getResourceList } from "./getResourceList";
import { getResourceDetails } from "./getResourceDetails";

export const getAllDetails = (resource) => {
  return getResourceList(resource)
    .then((resourceList) => {
      return Promise.all(
        resourceList.map((resource) => {
          return getResourceDetails(resource.url);
        })
      );
    })
    .catch((err) => console.log(err));
};