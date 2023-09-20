import { useState, useEffect } from "react";
import { getAllDetails } from "../services/getAllDetails";

const useResources = (targetResource) => {
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const localStorageResources = localStorage.getItem(targetResource);
    
    if (localStorageResources !== null && localStorageResources !== undefined) {
      try {
        const parsedResources = JSON.parse(localStorageResources);
        setResources(parsedResources);
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        localStorage.removeItem(targetResource);
        setIsLoading(true); 
      }
    } else {
      getAllDetails(targetResource)
        .then((res) => {
          setResources(res);
          localStorage.setItem(targetResource, JSON.stringify(res));
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setIsLoading(false); 
        });
    }
  }, [targetResource]);

  return [resources, isLoading];
};

export default useResources;

