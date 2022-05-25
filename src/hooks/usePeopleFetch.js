import { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { CountriesToString } from "./CountriesToString";

export const usePeopleFetch = (loadMore) => {
  const [users, setUsers] = useState([]); // The final list of people
  const [isLoading, setIsLoading] = useState(false); // Is the list loaded?
  const countries = useSelector((state) => state.filters.countries); //Checks which countries have been marked
  const myCountries = CountriesToString(countries); // Makes the countries marked String

  useEffect(() => {
    setUsers([]);
  }, [countries]);


  useEffect(() => {
    loadMore !== 1 && fetchUsers();
  }, [loadMore]);

  async function fetchUsers() {
    setIsLoading(true);
    const response = await axios.get(
      `https://randomuser.me/api/?&nat=${myCountries}&results=10&`
    );
    setIsLoading(false);
    setUsers([...users, ...response.data.results]);
  }

  return { users, isLoading, fetchUsers };
};
