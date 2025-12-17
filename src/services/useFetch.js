import { useCallback } from "react";

export const useFetch = () => {
  const API = "http://localhost:8000/api/v1/";
  const fetchData = useCallback(async (url, method, body) => {
    try {
      const response = await fetch(API + url, {
        method: method ?? "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: body ? JSON.stringify(body) : null,
      });
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }, []);

  return fetchData;
};

export const useFetchForm = () => {
  const API = "http://localhost:8000/api/v1/";
  const fetchData = useCallback(async (url, body) => {
    try {
      const response = await fetch(API + url, {
        method: "POST",

        body: body,
      });
      return response.json();
    } catch (error) {
      console.error("Fetch error:", error);
      throw error;
    }
  }, []);

  return fetchData;
};
