import { useState, useEffect } from "react";
import * as api from "./api";

export function UserSearch(id) {
    const [user, setUser] = useState([]);
    const [searchParams] = useState({id});

    useEffect(() => {
      setUser([]);
      const fetchData = async () => {
        try {
          const rawData = await api.get("/{id}", searchParams);
          const resp = await rawData.json();
          setUser(resp.businesses);
        } catch (e) {
        console.log(e);
        }
      }; 
      fetchData();
    }, [searchParams]);
  return [user];
}      
