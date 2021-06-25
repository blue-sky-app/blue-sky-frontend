import { useState, useEffect } from "react";
// import * as api from "./api";

export function UserSearch(location) {
    const [error, setError] = useState(null);
    const [user, setUser] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:8080/user")
          .then(res => res.json())
          .then(
            (result) => {
              setIsLoaded(true);
              setUser(result);
            },
            (error) => {
              setIsLoaded(true);
              setError(error);
            }
          )
      }, [])
    
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <ul>
                    {user.map(item => (
                    <li key={user.id}>
                        {item.name} {item.price}
                    </li>
                    ))}
                </ul>
            );
        }
} 
