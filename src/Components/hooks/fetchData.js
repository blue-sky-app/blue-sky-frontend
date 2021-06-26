export default function fetchData() {
      return fetch("http://localhost:8080/user")
      .then((response) => response.json())
      .then((data) => console.log(data));
}
